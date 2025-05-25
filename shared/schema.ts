import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  decimal,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Restaurants table
export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  cuisineTypes: varchar("cuisine_types").array().notNull(), // ['gujarati', 'punjabi', 'south-indian']
  
  // Address fields for international support
  streetAddress: varchar("street_address", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  postalCode: varchar("postal_code", { length: 20 }),
  
  // Location coordinates
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  
  // Contact information
  phoneNumber: varchar("phone_number", { length: 50 }),
  website: varchar("website", { length: 500 }),
  email: varchar("email", { length: 255 }),
  
  // Operating information
  openingHours: jsonb("opening_hours"), // Store as JSON object
  priceRange: varchar("price_range", { length: 10 }), // '$', '$$', '$$$', '$$$$'
  
  // Features and specialties
  specialties: text("specialties").array(),
  dietaryOptions: varchar("dietary_options").array(), // ['vegetarian', 'vegan', 'halal', 'jain']
  
  // Ratings and reviews
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }),
  totalReviews: integer("total_reviews").default(0),
  
  // Images
  imageUrls: varchar("image_urls").array(),
  
  // Ownership and verification
  ownerId: varchar("owner_id").references(() => users.id),
  isVerified: boolean("is_verified").default(false),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id").references(() => restaurants.id).notNull(),
  userId: varchar("user_id").references(() => users.id),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  restaurants: many(restaurants),
  reviews: many(reviews),
}));

export const restaurantsRelations = relations(restaurants, ({ one, many }) => ({
  owner: one(users, {
    fields: [restaurants.ownerId],
    references: [users.id],
  }),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  restaurant: one(restaurants, {
    fields: [reviews.restaurantId],
    references: [restaurants.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

// Zod schemas for validation
export const insertRestaurantSchema = createInsertSchema(restaurants, {
  name: z.string().min(1, "Restaurant name is required"),
  cuisineTypes: z.array(z.enum(["gujarati", "punjabi", "south-indian"])).min(1, "At least one cuisine type is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  priceRange: z.enum(["$", "$$", "$$$", "$$$$"]).optional(),
  specialties: z.array(z.string()).optional(),
  dietaryOptions: z.array(z.string()).optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  averageRating: true,
  totalReviews: true,
  isVerified: true,
});

export const insertReviewSchema = createInsertSchema(reviews, {
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
});

export const searchRestaurantsSchema = z.object({
  keyword: z.string().optional(),
  cuisineType: z.enum(["gujarati", "punjabi", "south-indian"]).optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  priceRange: z.enum(["$", "$$", "$$$", "$$$$"]).optional(),
  minRating: z.number().min(1).max(5).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Restaurant = typeof restaurants.$inferSelect;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type SearchRestaurantsParams = z.infer<typeof searchRestaurantsSchema>;
