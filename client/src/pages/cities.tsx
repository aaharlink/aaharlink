import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Cities() {
  const popularCities = [
    {
      name: "London",
      country: "United Kingdom",
      restaurantCount: "15+",
      description: "Brick Lane and Southall offer authentic Indian dining experiences",
      searchLink: "/search?city=London"
    },
    {
      name: "New York",
      country: "United States", 
      restaurantCount: "12+",
      description: "Jackson Heights and East Village feature diverse Indian restaurants",
      searchLink: "/search?city=New York"
    },
    {
      name: "Toronto",
      country: "Canada",
      restaurantCount: "8+", 
      description: "Gerrard Street and Devon Avenue host vibrant Indian communities",
      searchLink: "/search?city=Toronto"
    },
    {
      name: "Melbourne",
      country: "Australia",
      restaurantCount: "6+",
      description: "Chapel Street and Smith Street offer contemporary Indian cuisine",
      searchLink: "/search?city=Melbourne"
    },
    {
      name: "Dubai",
      country: "United Arab Emirates",
      restaurantCount: "10+",
      description: "Karama and Bur Dubai feature traditional Indian restaurants",
      searchLink: "/search?city=Dubai"
    },
    {
      name: "Singapore",
      country: "Singapore",
      restaurantCount: "7+",
      description: "Little India and Chinatown offer authentic South Indian cuisine",
      searchLink: "/search?city=Singapore"
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
              Popular Cities
            </h1>
            <p className="text-xl opacity-90">
              Discover Indian restaurants in major cities around the world
            </p>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularCities.map((city) => (
                <Card key={city.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{city.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {city.country} • {city.restaurantCount} restaurants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{city.description}</p>
                    <Link href={city.searchLink}>
                      <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                        Explore Restaurants
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