import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RestaurantCard from "./restaurant-card";
import { ArrowRight, Utensils } from "lucide-react";
import type { Restaurant } from "@shared/schema";

export default function FeaturedRestaurants() {
  const [, setLocation] = useLocation();

  const { data: restaurants = [], isLoading, error } = useQuery({
    queryKey: ["/api/restaurants/featured"],
    queryFn: async () => {
      const response = await fetch("/api/restaurants/featured?limit=6");
      if (!response.ok) throw new Error("Failed to fetch featured restaurants");
      return response.json() as Promise<Restaurant[]>;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal font-poppins mb-6">
              Featured <span className="text-saffron">Restaurants</span> Worldwide
            </h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Discover highly-rated authentic restaurants recommended by our global community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 rounded-2xl h-64 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Utensils className="w-16 h-16 text-warm-gray mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">Unable to Load Restaurants</h3>
              <p className="text-warm-gray">Please try again later.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal font-poppins mb-6">
            Featured <span className="text-saffron">Restaurants</span> Worldwide
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto">
            Discover highly-rated authentic restaurants recommended by our global community
          </p>
        </div>

        {restaurants.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Utensils className="w-16 h-16 text-warm-gray mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">No Featured Restaurants Yet</h3>
              <p className="text-warm-gray mb-6">
                Be the first to add a restaurant and help build our global community!
              </p>
              <Button 
                onClick={() => setLocation("/add-restaurant")}
                className="bg-saffron hover:bg-orange-600"
              >
                Add Restaurant
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={() => setLocation("/search")}
                className="bg-charcoal text-white hover:bg-gray-800 transition-colors"
                size="lg"
              >
                View All Restaurants 
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
