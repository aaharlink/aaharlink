import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { HandPlatter, Globe, Star, Users } from "lucide-react";

export default function GlobalStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats/global"],
    queryFn: async () => {
      const response = await fetch("/api/stats/global");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json() as Promise<{
        totalRestaurants: number;
        totalCountries: number;
        totalReviews: number;
      }>;
    },
  });

  const displayStats = {
    totalRestaurants: stats?.totalRestaurants || 0,
    totalCountries: stats?.totalCountries || 0,
    totalReviews: stats?.totalReviews || 0,
    happyCustomers: Math.floor((stats?.totalReviews || 0) * 2.3), // Estimated based on reviews
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal font-poppins mb-6">
            Connecting <span className="text-saffron">Communities</span> Globally
          </h2>
          <p className="text-xl text-warm-gray max-w-3xl mx-auto">
            Building bridges through authentic cuisine experiences across continents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-saffron font-poppins mb-3">
              {isLoading ? "..." : `${formatNumber(displayStats.totalRestaurants)}+`}
            </div>
            <p className="text-warm-gray font-medium">Restaurants Listed</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-indian-red font-poppins mb-3">
              {isLoading ? "..." : displayStats.totalCountries}
            </div>
            <p className="text-warm-gray font-medium">Countries Covered</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-fresh-green font-poppins mb-3">
              {isLoading ? "..." : `${formatNumber(displayStats.totalReviews)}+`}
            </div>
            <p className="text-warm-gray font-medium">Reviews & Ratings</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-royal-purple font-poppins mb-3">
              {isLoading ? "..." : `${formatNumber(displayStats.happyCustomers)}+`}
            </div>
            <p className="text-warm-gray font-medium">Happy Customers</p>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Delicious Indian restaurant food platter with traditional dishes" 
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div>
              <blockquote className="text-2xl md:text-3xl text-charcoal font-playfair italic mb-6">
                "AaharLink helped me find the most authentic South Indian restaurant in Berlin. 
                It felt like home away from home!"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-charcoal">Priya Sharma</p>
                  <p className="text-warm-gray">Software Engineer, Berlin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
