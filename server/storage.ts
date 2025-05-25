import {
  users,
  restaurants,
  reviews,
  type User,
  type UpsertUser,
  type Restaurant,
  type InsertRestaurant,
  type Review,
  type InsertReview,
  type SearchRestaurantsParams,
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, and, ilike, or, gte, sql, desc, isNotNull } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Restaurant operations
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  getRestaurantsByOwner(ownerId: string): Promise<Restaurant[]>;
  updateRestaurant(id: number, restaurant: Partial<InsertRestaurant>): Promise<Restaurant | undefined>;
  deleteRestaurant(id: number): Promise<boolean>;
  searchRestaurants(params: SearchRestaurantsParams): Promise<{ restaurants: Restaurant[], total: number }>;
  getFeaturedRestaurants(limit?: number): Promise<Restaurant[]>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getRestaurantReviews(restaurantId: number): Promise<Review[]>;
  
  // Stats operations
  getGlobalStats(): Promise<{
    totalRestaurants: number;
    totalCountries: number;
    totalReviews: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Restaurant operations
  async createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant> {
    const [newRestaurant] = await db
      .insert(restaurants)
      .values({
        ...restaurant,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return newRestaurant;
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    const [restaurant] = await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.id, id));
    return restaurant;
  }

  async getRestaurantsByOwner(ownerId: string): Promise<Restaurant[]> {
    return await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.ownerId, ownerId))
      .orderBy(desc(restaurants.createdAt));
  }

  async updateRestaurant(id: number, restaurant: Partial<InsertRestaurant>): Promise<Restaurant | undefined> {
    const [updatedRestaurant] = await db
      .update(restaurants)
      .set({
        ...restaurant,
        updatedAt: new Date(),
      })
      .where(eq(restaurants.id, id))
      .returning();
    return updatedRestaurant;
  }

  async deleteRestaurant(id: number): Promise<boolean> {
    const result = await db
      .delete(restaurants)
      .where(eq(restaurants.id, id));
    return result.rowCount > 0;
  }

  async searchRestaurants(params: SearchRestaurantsParams): Promise<{ restaurants: Restaurant[], total: number }> {
    const conditions = [];
    
    if (params.keyword) {
      conditions.push(
        or(
          ilike(restaurants.name, `%${params.keyword}%`),
          ilike(restaurants.description, `%${params.keyword}%`),
          sql`array_to_string(${restaurants.specialties}, ' ') ILIKE ${`%${params.keyword}%`}`
        )
      );
    }
    
    if (params.cuisineType) {
      conditions.push(sql`${params.cuisineType} = ANY(${restaurants.cuisineTypes})`);
    }
    
    if (params.country) {
      conditions.push(ilike(restaurants.country, `%${params.country}%`));
    }
    
    if (params.state) {
      conditions.push(ilike(restaurants.state, `%${params.state}%`));
    }
    
    if (params.city) {
      conditions.push(ilike(restaurants.city, `%${params.city}%`));
    }
    
    if (params.priceRange) {
      conditions.push(eq(restaurants.priceRange, params.priceRange));
    }
    
    if (params.minRating) {
      conditions.push(gte(restaurants.averageRating, params.minRating.toString()));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(restaurants)
      .where(whereClause);

    // Get paginated results
    const restaurantResults = await db
      .select()
      .from(restaurants)
      .where(whereClause)
      .orderBy(desc(restaurants.averageRating), desc(restaurants.createdAt))
      .limit(params.limit)
      .offset((params.page - 1) * params.limit);

    return {
      restaurants: restaurantResults,
      total: count,
    };
  }

  async getFeaturedRestaurants(limit = 6): Promise<Restaurant[]> {
    try {
      const result = await db.select().from(restaurants).orderBy(desc(restaurants.id)).limit(limit);
      console.log('Found restaurants:', result.length);
      return result;
    } catch (error) {
      console.error('Featured restaurants error:', error);
      return [];
    }
  }

  // Review operations
  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values({
        ...review,
        createdAt: new Date(),
      })
      .returning();

    // Update restaurant average rating
    await this.updateRestaurantRating(review.restaurantId);
    
    return newReview;
  }

  async getRestaurantReviews(restaurantId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.restaurantId, restaurantId))
      .orderBy(desc(reviews.createdAt));
  }

  private async updateRestaurantRating(restaurantId: number): Promise<void> {
    const [stats] = await db
      .select({
        avgRating: sql<number>`ROUND(AVG(${reviews.rating}), 2)`,
        totalReviews: sql<number>`COUNT(*)`,
      })
      .from(reviews)
      .where(eq(reviews.restaurantId, restaurantId));

    await db
      .update(restaurants)
      .set({
        averageRating: stats.avgRating?.toString(),
        totalReviews: stats.totalReviews,
        updatedAt: new Date(),
      })
      .where(eq(restaurants.id, restaurantId));
  }

  // Stats operations
  async getGlobalStats(): Promise<{
    totalRestaurants: number;
    totalCountries: number;
    totalReviews: number;
  }> {
    const [restaurantStats] = await db
      .select({
        totalRestaurants: sql<number>`COUNT(*)`,
        totalCountries: sql<number>`COUNT(DISTINCT ${restaurants.country})`,
      })
      .from(restaurants);

    const [reviewStats] = await db
      .select({
        totalReviews: sql<number>`COUNT(*)`,
      })
      .from(reviews);

    return {
      totalRestaurants: restaurantStats.totalRestaurants,
      totalCountries: restaurantStats.totalCountries,
      totalReviews: reviewStats.totalReviews,
    };
  }
}

export const storage = new DatabaseStorage();
