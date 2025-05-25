import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import RestaurantCard from "@/components/restaurant-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  PlusCircle, 
  HandPlatter, 
  Star, 
  MapPin, 
  Users,
  TrendingUp,
  Settings,
  Eye
} from "lucide-react";
import type { Restaurant } from "@shared/schema";

export default function OwnerDashboard() {
  const { user } = useAuth();

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ["/api/restaurants/owner/my"],
    queryFn: async () => {
      const response = await fetch("/api/restaurants/owner/my", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch restaurants");
      return response.json() as Promise<Restaurant[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-saffron"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalReviews = restaurants.reduce((sum, restaurant) => sum + (restaurant.totalReviews || 0), 0);
  const averageRating = restaurants.length > 0 
    ? restaurants.reduce((sum, restaurant) => sum + (parseFloat(restaurant.averageRating || "0")), 0) / restaurants.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-poppins mb-4">
              Restaurant Owner Dashboard
            </h1>
            <p className="text-warm-gray">
              Welcome back, {user?.firstName || user?.email}! Manage your restaurant listings and track performance.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <HandPlatter className="w-8 h-8 text-saffron" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-warm-gray">Total Restaurants</p>
                    <p className="text-2xl font-bold text-charcoal">{restaurants.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-fresh-green" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-warm-gray">Average Rating</p>
                    <p className="text-2xl font-bold text-charcoal">
                      {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-royal-purple" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-warm-gray">Total Reviews</p>
                    <p className="text-2xl font-bold text-charcoal">{totalReviews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-indian-red" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-warm-gray">Growth</p>
                    <p className="text-2xl font-bold text-charcoal">+12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/add-restaurant">
                  <Button className="bg-saffron hover:bg-orange-600">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Restaurant
                  </Button>
                </Link>
                
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                
                <Button variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Your Restaurant Listings</CardTitle>
            </CardHeader>
            <CardContent>
              {restaurants.length === 0 ? (
                <div className="text-center py-12">
                  <HandPlatter className="w-16 h-16 text-warm-gray mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-charcoal mb-2">No Restaurants Listed</h3>
                  <p className="text-warm-gray mb-6">
                    Start by adding your first restaurant to reach customers worldwide.
                  </p>
                  <Link href="/add-restaurant">
                    <Button className="bg-saffron hover:bg-orange-600">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Your First Restaurant
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-charcoal">{restaurant.name}</h3>
                            {restaurant.isVerified ? (
                              <Badge className="bg-green-100 text-green-800">Verified</Badge>
                            ) : (
                              <Badge variant="outline">Pending Verification</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center text-warm-gray mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {restaurant.city}, {restaurant.state}, {restaurant.country}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{restaurant.averageRating ? parseFloat(restaurant.averageRating).toFixed(1) : "No ratings"}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-warm-gray mr-1" />
                              <span>{restaurant.totalReviews || 0} reviews</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link href={`/restaurant/${restaurant.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      {restaurant.cuisineTypes && restaurant.cuisineTypes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {restaurant.cuisineTypes.map((cuisine) => (
                            <Badge key={cuisine} variant="secondary">
                              {cuisine.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {restaurant.description && (
                        <p className="text-warm-gray text-sm line-clamp-2">{restaurant.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
