import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import type { Restaurant } from "@shared/schema";

export default function RestaurantSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ["/api/restaurants/featured"],
    queryFn: async () => {
      const response = await fetch("/api/restaurants/featured?limit=12");
      if (!response.ok) throw new Error("Failed to fetch restaurants");
      return response.json() as Promise<Restaurant[]>;
    },
  });

  // Auto-advance slider
  useEffect(() => {
    if (restaurants.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + 3 >= restaurants.length ? 0 : prev + 3
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [restaurants.length]);

  const getPlaceholderImage = (cuisineTypes: string[]) => {
    const primaryCuisine = cuisineTypes?.[0] || "indian";
    const imageMap = {
      gujarati: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      punjabi: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      "south-indian": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
    };
    return imageMap[primaryCuisine as keyof typeof imageMap] || 
           "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop";
  };

  const getCuisineColor = (cuisine: string) => {
    const colors = {
      gujarati: "bg-amber-100 text-amber-800",
      punjabi: "bg-red-100 text-red-800", 
      "south-indian": "bg-green-100 text-green-800",
    };
    return colors[cuisine as keyof typeof colors] || "bg-orange-100 text-orange-800";
  };

  const formatAddress = (restaurant: Restaurant) => {
    return `${restaurant.city}, ${restaurant.country}`;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-orange-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Featured Restaurants Worldwide
            </h2>
            <div className="animate-pulse">Loading amazing restaurants...</div>
          </div>
        </div>
      </section>
    );
  }

  const visibleRestaurants = restaurants.slice(currentIndex, currentIndex + 3);
  
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-purple-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-6">
            Featured Restaurants Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover authentic Indian cuisine from our handpicked restaurants across the globe
          </p>
        </div>

        {restaurants.length > 0 && (
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}
            >
              {restaurants.map((restaurant, index) => (
                <div key={restaurant.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                      <img 
                        src={getPlaceholderImage(restaurant.cuisineTypes)} 
                        alt={restaurant.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCuisineColor(restaurant.cuisineTypes[0])}>
                          {restaurant.cuisineTypes[0].charAt(0).toUpperCase() + restaurant.cuisineTypes[0].slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {restaurant.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{formatAddress(restaurant)}</span>
                        </div>
                        
                        {restaurant.priceRange && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {restaurant.priceRange}
                          </Badge>
                        )}
                      </div>

                      {restaurant.averageRating && (
                        <div className="flex items-center mb-4">
                          <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-green-600 mr-1 fill-current" />
                            <span className="font-semibold text-green-600 text-sm">
                              {parseFloat(restaurant.averageRating).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      )}

                      <Link href={`/restaurant/${restaurant.id}`}>
                        <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                          View Details
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(restaurants.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 3)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 3) === index 
                      ? 'bg-orange-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link href="/search">
                <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg border-2 border-orange-200 hover:border-orange-300">
                  Explore All Restaurants
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}