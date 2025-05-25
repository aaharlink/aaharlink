import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Cuisines() {
  const cuisines = [
    {
      name: "Gujarati Cuisine",
      description: "Vegetarian delights from Gujarat featuring dhokla, thepla, khandvi, and traditional thalis",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
      searchLink: "/search?cuisineType=gujarati"
    },
    {
      name: "Punjabi Cuisine", 
      description: "Rich North Indian flavors with butter chicken, dal makhani, sarson da saag, and tandoor specialties",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600",
      searchLink: "/search?cuisineType=punjabi"
    },
    {
      name: "South Indian Cuisine",
      description: "Authentic Tamil, Kerala, Karnataka dishes featuring dosas, idli, sambar, and coconut curries",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600", 
      searchLink: "/search?cuisineType=south-indian"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Indian Cuisines
            </h1>
            <p className="text-xl opacity-90">
              Discover authentic Gujarati, Punjabi, and South Indian flavors from restaurants worldwide
            </p>
          </div>
        </section>

        {/* Cuisines Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cuisines.map((cuisine) => (
                <Card key={cuisine.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={cuisine.image} 
                      alt={cuisine.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{cuisine.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {cuisine.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={cuisine.searchLink}>
                      <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                        Find Restaurants
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}