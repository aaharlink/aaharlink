import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertRestaurantSchema, 
  insertReviewSchema, 
  searchRestaurantsSchema,
  type SearchRestaurantsParams 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Restaurant routes
  app.get('/api/restaurants/search', async (req, res) => {
    try {
      const params = searchRestaurantsSchema.parse({
        ...req.query,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        minRating: req.query.minRating ? parseFloat(req.query.minRating as string) : undefined,
      });
      
      const result = await storage.searchRestaurants(params);
      res.json(result);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid search parameters",
          details: fromZodError(error).toString()
        });
      }
      console.error("Error searching restaurants:", error);
      res.status(500).json({ message: "Failed to search restaurants" });
    }
  });

  app.get('/api/restaurants/featured', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
      console.log('Fetching featured restaurants with limit:', limit);
      const restaurants = await storage.getFeaturedRestaurants(limit);
      console.log('Found restaurants:', restaurants.length);
      res.json(restaurants);
    } catch (error) {
      console.error("Error fetching featured restaurants:", error);
      res.status(500).json({ message: "Failed to fetch featured restaurants" });
    }
  });

  app.get('/api/restaurants/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const restaurant = await storage.getRestaurant(id);
      
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      
      res.json(restaurant);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      res.status(500).json({ message: "Failed to fetch restaurant" });
    }
  });

  app.post('/api/restaurants', isAuthenticated, async (req: any, res) => {
    try {
      const restaurantData = insertRestaurantSchema.parse(req.body);
      const userId = req.user.claims.sub;
      
      const restaurant = await storage.createRestaurant({
        ...restaurantData,
        ownerId: userId,
      });
      
      res.status(201).json(restaurant);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid restaurant data",
          details: fromZodError(error).toString()
        });
      }
      console.error("Error creating restaurant:", error);
      res.status(500).json({ message: "Failed to create restaurant" });
    }
  });

  app.get('/api/restaurants/owner/my', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const restaurants = await storage.getRestaurantsByOwner(userId);
      res.json(restaurants);
    } catch (error) {
      console.error("Error fetching owner restaurants:", error);
      res.status(500).json({ message: "Failed to fetch restaurants" });
    }
  });

  app.put('/api/restaurants/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if user owns the restaurant
      const existingRestaurant = await storage.getRestaurant(id);
      if (!existingRestaurant || existingRestaurant.ownerId !== userId) {
        return res.status(403).json({ message: "Unauthorized to update this restaurant" });
      }
      
      const restaurantData = insertRestaurantSchema.partial().parse(req.body);
      const updatedRestaurant = await storage.updateRestaurant(id, restaurantData);
      
      if (!updatedRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      
      res.json(updatedRestaurant);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid restaurant data",
          details: fromZodError(error).toString()
        });
      }
      console.error("Error updating restaurant:", error);
      res.status(500).json({ message: "Failed to update restaurant" });
    }
  });

  app.delete('/api/restaurants/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if user owns the restaurant
      const existingRestaurant = await storage.getRestaurant(id);
      if (!existingRestaurant || existingRestaurant.ownerId !== userId) {
        return res.status(403).json({ message: "Unauthorized to delete this restaurant" });
      }
      
      const deleted = await storage.deleteRestaurant(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      
      res.json({ message: "Restaurant deleted successfully" });
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      res.status(500).json({ message: "Failed to delete restaurant" });
    }
  });

  // Review routes
  app.get('/api/restaurants/:id/reviews', async (req, res) => {
    try {
      const restaurantId = parseInt(req.params.id);
      const reviews = await storage.getRestaurantReviews(restaurantId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post('/api/restaurants/:id/reviews', isAuthenticated, async (req: any, res) => {
    try {
      const restaurantId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        restaurantId,
        userId,
      });
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid review data",
          details: fromZodError(error).toString()
        });
      }
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Stats routes
  app.get('/api/stats/global', async (req, res) => {
    try {
      const stats = await storage.getGlobalStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching global stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
