import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Globe, TrendingUp, Settings, PlusCircle, Info } from "lucide-react";

export default function RestaurantOwnerCTA() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const handleAddRestaurant = () => {
    setLocation("/add-restaurant");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Restaurant Owners Worldwide
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Showcase your authentic cuisine to a global audience. Join thousands of restaurant owners 
            already growing their business with AaharLink.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="opacity-90">
                Connect with customers from around the world looking for authentic Indian cuisine in their area.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Boost Visibility</h3>
              <p className="opacity-90">
                Increase your restaurant's online presence and attract more customers through our platform.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">
                <Settings className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="opacity-90">
                Simple dashboard to manage your restaurant information, photos, and customer interactions.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleAddRestaurant}
              className="bg-white text-purple-600 px-12 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              Add Your Restaurant - Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
