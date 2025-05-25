import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const cuisines = [
  {
    name: "Gujarati Cuisine",
    description: "Vegetarian delights featuring sweet and savory combinations, dhokla, thepla, and traditional thalis that celebrate the rich culinary heritage of Gujarat.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Traditional Gujarati thali with variety of dishes",
    color: "text-saffron",
    bgColor: "bg-orange-100",
    dishes: ["Dhokla", "Thepla", "Undhiyu"],
    cuisineType: "gujarati",
  },
  {
    name: "Punjabi Cuisine",
    description: "Hearty and robust flavors with rich curries, fresh naan, and tandoor specialties that reflect the vibrant culture of Punjab.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Punjabi butter chicken and naan bread",
    color: "text-indian-red",
    bgColor: "bg-red-100",
    dishes: ["Butter Chicken", "Naan", "Tandoori"],
    cuisineType: "punjabi",
  },
  {
    name: "South Indian Cuisine",
    description: "Aromatic spices, coconut-based curries, and fermented delicacies like dosa and idli that showcase the coastal flavors of South India.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "South Indian dosa with coconut chutney and sambar",
    color: "text-fresh-green",
    bgColor: "bg-green-100",
    dishes: ["Dosa", "Idli", "Sambar"],
    cuisineType: "south-indian",
  },
];

export default function CuisineFeatures() {
  const [, setLocation] = useLocation();

  const searchCuisine = (cuisineType: string) => {
    setLocation(`/search?cuisineType=${cuisineType}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal font-poppins mb-6">
            Explore Diverse <span className="text-saffron">Indian Cuisines</span>
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto">
            Each region brings unique flavors, traditions, and culinary stories to your table
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cuisines.map((cuisine) => (
            <Card 
              key={cuisine.cuisineType}
              className="cuisine-card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer"
              onClick={() => searchCuisine(cuisine.cuisineType)}
            >
              <img 
                src={cuisine.image}
                alt={cuisine.alt}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-charcoal font-playfair mb-3">
                  {cuisine.name}
                </h3>
                <p className="text-warm-gray mb-6 leading-relaxed">
                  {cuisine.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cuisine.dishes.map((dish) => (
                    <Badge 
                      key={dish}
                      className={`${cuisine.bgColor} ${cuisine.color} px-3 py-1 rounded-full text-sm`}
                    >
                      {dish}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="ghost"
                  className={`${cuisine.color} font-semibold hover:bg-transparent hover:${cuisine.color.replace('text-', 'text-').replace('-', '-600')} transition-colors p-0`}
                  onClick={(e) => {
                    e.stopPropagation();
                    searchCuisine(cuisine.cuisineType);
                  }}
                >
                  Explore {cuisine.name.split(' ')[0]} Restaurants
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
