import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  Clock, 
  Star, 
  DollarSign,
  Users,
  ExternalLink
} from "lucide-react";
import type { Restaurant } from "@shared/schema";

export default function RestaurantDetail() {
  const params = useParams();
  const restaurantId = parseInt(params.id || "0");

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [restaurantId]);

  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ["/api/restaurants", restaurantId],
    queryFn: async () => {
      const response = await fetch(`/api/restaurants/${restaurantId}`);
      if (!response.ok) throw new Error("Failed to fetch restaurant");
      return response.json() as Promise<Restaurant>;
    },
    enabled: !!restaurantId,
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

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold text-charcoal mb-4">Restaurant Not Found</h2>
                <p className="text-warm-gray">The restaurant you're looking for doesn't exist or has been removed.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const cuisineColors = {
    gujarati: "bg-orange-100 text-saffron",
    punjabi: "bg-red-100 text-indian-red",
    "south-indian": "bg-green-100 text-fresh-green",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  {/* Restaurant Header */}
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-poppins mb-2">
                          {restaurant.name}
                        </h1>
                        <div className="flex items-center gap-2 mb-2">
                          {restaurant.cuisineTypes?.map((cuisine) => (
                            <Badge 
                              key={cuisine} 
                              className={cuisineColors[cuisine as keyof typeof cuisineColors] || "bg-gray-100 text-gray-800"}
                            >
                              {cuisine.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {restaurant.averageRating && (
                        <div className="flex items-center bg-green-100 px-3 py-2 rounded-full">
                          <Star className="w-5 h-5 text-green-600 mr-1 fill-current" />
                          <span className="font-semibold text-green-600">
                            {parseFloat(restaurant.averageRating).toFixed(1)}
                          </span>
                          {restaurant.totalReviews && (
                            <span className="text-sm text-green-600 ml-1">
                              ({restaurant.totalReviews} reviews)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-warm-gray mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>
                        {restaurant.streetAddress}, {restaurant.city}, {restaurant.state}, {restaurant.country}
                        {restaurant.postalCode && ` ${restaurant.postalCode}`}
                      </span>
                    </div>

                    {restaurant.priceRange && (
                      <div className="flex items-center text-warm-gray mb-4">
                        <DollarSign className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{restaurant.priceRange}</span>
                        <span className="ml-2">
                          {restaurant.priceRange === "$" && "Budget-friendly"}
                          {restaurant.priceRange === "$$" && "Moderate pricing"}
                          {restaurant.priceRange === "$$$" && "Expensive"}
                          {restaurant.priceRange === "$$$$" && "Very expensive"}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator className="my-6" />

                  {/* Description */}
                  {restaurant.description && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-charcoal mb-3">About This Restaurant</h3>
                      <p className="text-warm-gray leading-relaxed">{restaurant.description}</p>
                    </div>
                  )}

                  {/* Specialties */}
                  {restaurant.specialties && restaurant.specialties.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-charcoal mb-3">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-saffron border-saffron">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dietary Options */}
                  {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-charcoal mb-3">Dietary Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.dietaryOptions.map((option, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-100 text-fresh-green">
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Map */}
              {restaurant.latitude && restaurant.longitude && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Location</h3>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-warm-gray mx-auto mb-2" />
                        <p className="text-warm-gray">
                          Map integration would show restaurant location here
                        </p>
                        <p className="text-sm text-warm-gray mt-1">
                          Lat: {restaurant.latitude}, Lng: {restaurant.longitude}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-charcoal mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    {restaurant.phoneNumber && (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-warm-gray mr-3" />
                        <a 
                          href={`tel:${restaurant.phoneNumber}`}
                          className="text-saffron hover:text-orange-600 transition-colors"
                        >
                          {restaurant.phoneNumber}
                        </a>
                      </div>
                    )}

                    {restaurant.website && (
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-warm-gray mr-3" />
                        <a 
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-saffron hover:text-orange-600 transition-colors flex items-center"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    )}

                    {restaurant.email && (
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-warm-gray mr-3" />
                        <a 
                          href={`mailto:${restaurant.email}`}
                          className="text-saffron hover:text-orange-600 transition-colors"
                        >
                          {restaurant.email}
                        </a>
                      </div>
                    )}

                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-warm-gray mr-3 mt-0.5" />
                      <div>
                        <p className="text-charcoal font-medium mb-1">Address</p>
                        <p className="text-warm-gray text-sm leading-relaxed">
                          {restaurant.streetAddress}<br />
                          {restaurant.city}, {restaurant.state}<br />
                          {restaurant.country}
                          {restaurant.postalCode && <><br />{restaurant.postalCode}</>}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Opening Hours */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-charcoal mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Opening Hours
                    </h4>
                    <div className="text-sm text-warm-gray">
                      {restaurant.openingHours ? (
                        <div>Hours information available</div>
                      ) : (
                        <div>Contact restaurant for hours</div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-saffron hover:bg-orange-600" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Restaurant
                    </Button>
                    
                    <Button variant="outline" className="w-full" size="lg">
                      <Star className="w-4 h-4 mr-2" />
                      Write a Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
