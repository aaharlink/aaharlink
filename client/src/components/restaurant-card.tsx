import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  ArrowRight,
  Users,
  Clock
} from "lucide-react";
import type { Restaurant } from "@shared/schema";

interface RestaurantCardProps {
  restaurant: Restaurant;
  showActions?: boolean;
}

export default function RestaurantCard({ restaurant, showActions = false }: RestaurantCardProps) {
  // Generate a placeholder image based on cuisine type
  const getPlaceholderImage = (cuisineTypes: string[]) => {
    const primaryCuisine = cuisineTypes?.[0] || "indian";
    
    // Use different Unsplash images based on cuisine type
    const imageMap = {
      gujarati: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      punjabi: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      "south-indian": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    };
    
    return imageMap[primaryCuisine as keyof typeof imageMap] || 
           "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
  };

  const cuisineColors = {
    gujarati: "bg-orange-100 text-saffron",
    punjabi: "bg-red-100 text-indian-red",
    "south-indian": "bg-green-100 text-fresh-green",
  };

  const formatRating = (rating: string | null) => {
    if (!rating) return null;
    return parseFloat(rating).toFixed(1);
  };

  const formatAddress = () => {
    const parts = [restaurant.city, restaurant.state, restaurant.country].filter(Boolean);
    return parts.join(", ");
  };

  const primaryImage = restaurant.imageUrls?.[0] || getPlaceholderImage(restaurant.cuisineTypes || []);

  return (
    <Card className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
      <Link href={`/restaurant/${restaurant.id}`}>
        <div className="relative">
          <img 
            src={primaryImage}
            alt={`${restaurant.name} - Restaurant interior`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getPlaceholderImage(restaurant.cuisineTypes || []);
            }}
          />
          
          {/* Rating Badge */}
          {restaurant.averageRating && (
            <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              <span className="text-sm font-semibold text-charcoal">
                {formatRating(restaurant.averageRating)}
              </span>
            </div>
          )}

          {/* Verification Badge */}
          {restaurant.isVerified && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-500 text-white">
                Verified
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-6">
        <Link href={`/restaurant/${restaurant.id}`}>
          <div className="mb-4">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-charcoal group-hover:text-saffron transition-colors line-clamp-1">
                {restaurant.name}
              </h3>
            </div>

            {/* Cuisine Types */}
            {restaurant.cuisineTypes && restaurant.cuisineTypes.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {restaurant.cuisineTypes.slice(0, 2).map((cuisine) => (
                  <Badge 
                    key={cuisine}
                    className={`text-xs ${cuisineColors[cuisine as keyof typeof cuisineColors] || "bg-gray-100 text-gray-800"}`}
                  >
                    {cuisine.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                ))}
                {restaurant.cuisineTypes.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{restaurant.cuisineTypes.length - 2} more
                  </Badge>
                )}
              </div>
            )}

            {/* Address */}
            <div className="flex items-start text-warm-gray text-sm mb-3">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{formatAddress()}</span>
            </div>

            {/* Reviews */}
            <div className="flex items-center text-warm-gray text-sm mb-4">
              <Users className="w-4 h-4 mr-2" />
              <span>
                {restaurant.totalReviews ? `${restaurant.totalReviews} reviews` : "No reviews yet"}
              </span>
            </div>
          </div>
        </Link>

        {/* Specialties */}
        {restaurant.specialties && restaurant.specialties.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-warm-gray">
              <span className="font-medium">Specialties:</span>{" "}
              {restaurant.specialties.slice(0, 2).join(", ")}
              {restaurant.specialties.length > 2 && "..."}
            </p>
          </div>
        )}

        {/* Dietary Options */}
        {restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {restaurant.dietaryOptions.slice(0, 3).map((option) => (
                <Badge key={option} variant="secondary" className="text-xs">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {restaurant.phoneNumber && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`tel:${restaurant.phoneNumber}`);
                }}
              >
                <Phone className="w-4 h-4" />
              </Button>
            )}
            
            {restaurant.website && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(restaurant.website, "_blank");
                }}
              >
                <Globe className="w-4 h-4" />
              </Button>
            )}
          </div>

          <Link href={`/restaurant/${restaurant.id}`}>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-saffron hover:text-orange-600 hover:bg-orange-50"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Owner Actions */}
        {showActions && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <Link href={`/restaurant/${restaurant.id}/edit`}>
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
            </Link>
            <Link href={`/restaurant/${restaurant.id}/analytics`}>
              <Button variant="outline" size="sm" className="flex-1">
                Analytics
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
