import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";

export default function HeroSearch() {
  const [, setLocation] = useLocation();
  const [searchFilters, setSearchFilters] = useState({
    keyword: "",
    cuisineType: "",
    country: "",
    state: "",
    city: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    setLocation(`/search?${params.toString()}`);
  };

  const updateFilter = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset dependent fields when country changes
      ...(key === "country" && { state: "", city: "" }),
      ...(key === "state" && { city: "" }),
    }));
  };

  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-poppins mb-6">
            Discover Authentic<br />
            <span className="font-playfair italic">Indian Cuisine</span><br />
            Worldwide
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Find authentic Gujarati, Punjabi, and South Indian restaurants anywhere in the world. 
            Connect with flavors that feel like home.
          </p>
        </div>

        {/* Global Search Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="search-form-shadow">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Cuisine Type Filter */}
                <div className="md:col-span-1">
                  <Label className="block text-sm font-medium text-charcoal mb-2">
                    Cuisine Type
                  </Label>
                  <Select 
                    value={searchFilters.cuisineType} 
                    onValueChange={(value) => updateFilter("cuisineType", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Cuisines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cuisines</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="punjabi">Punjabi</SelectItem>
                      <SelectItem value="south-indian">South Indian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Country Selection */}
                <div className="md:col-span-1">
                  <Label className="block text-sm font-medium text-charcoal mb-2">
                    Country
                  </Label>
                  <Select 
                    value={searchFilters.country} 
                    onValueChange={(value) => updateFilter("country", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State/Region Selection */}
                <div className="md:col-span-1">
                  <Label className="block text-sm font-medium text-charcoal mb-2">
                    State/Region
                  </Label>
                  <Input
                    value={searchFilters.state}
                    onChange={(e) => updateFilter("state", e.target.value)}
                    placeholder="Enter state/region"
                    className="w-full"
                  />
                </div>

                {/* City Selection */}
                <div className="md:col-span-1">
                  <Label className="block text-sm font-medium text-charcoal mb-2">
                    City
                  </Label>
                  <Input
                    value={searchFilters.city}
                    onChange={(e) => updateFilter("city", e.target.value)}
                    placeholder="Enter city"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Restaurant Name/Keyword Search */}
              <div className="mt-6">
                <Label className="block text-sm font-medium text-charcoal mb-2">
                  Restaurant Name or Keywords
                </Label>
                <div className="relative">
                  <Input
                    value={searchFilters.keyword}
                    onChange={(e) => updateFilter("keyword", e.target.value)}
                    placeholder="Search restaurants, dishes, or specialties..."
                    className="w-full pl-12 py-4 text-lg"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-gray w-5 h-5" />
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleSearch}
                  className="bg-saffron hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors w-full md:w-auto"
                >
                  <Search className="w-5 h-5 mr-3" />
                  Search Restaurants Globally
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
