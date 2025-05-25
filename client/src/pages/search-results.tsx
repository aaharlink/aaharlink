import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import RestaurantCard from "@/components/restaurant-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Search, Filter, Star } from "lucide-react";
import type { Restaurant } from "@shared/schema";

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      keyword: params.get("keyword") || "",
      cuisineType: params.get("cuisineType") || "",
      country: params.get("country") || "",
      state: params.get("state") || "",
      city: params.get("city") || "",
      priceRange: params.get("priceRange") || "",
      minRating: params.get("minRating") || "",
      page: parseInt(params.get("page") || "1"),
    };
  });

  // Debounced search params for API calls
  const [debouncedKeyword, setDebouncedKeyword] = useState(searchParams.keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchParams.keyword);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchParams.keyword]);

  const apiSearchParams = useMemo(() => ({
    ...searchParams,
    keyword: debouncedKeyword
  }), [searchParams, debouncedKeyword]);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ["/api/restaurants/search", apiSearchParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(apiSearchParams).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
      
      const response = await fetch(`/api/restaurants/search?${params}`);
      if (!response.ok) throw new Error("Failed to search restaurants");
      return response.json() as Promise<{ restaurants: Restaurant[], total: number }>;
    },
  });

  const updateSearch = (updates: Partial<typeof searchParams>) => {
    const newParams = { ...searchParams, ...updates, page: 1 };
    setSearchParams(newParams);
    
    const urlParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && key !== "page") urlParams.append(key, value.toString());
    });
    
    window.history.replaceState({}, "", `/search?${urlParams}`);
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold text-charcoal mb-4">Search Error</h2>
                <p className="text-warm-gray">Failed to search restaurants. Please try again.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { restaurants = [], total = 0 } = searchResults || {};
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal font-poppins mb-4">
              Restaurant Search Results
            </h1>
            <p className="text-warm-gray">
              Found {total} restaurants {searchParams.keyword && `for "${searchParams.keyword}"`}
            </p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="keyword">Search Keywords</Label>
                  <Input
                    id="keyword"
                    value={searchParams.keyword}
                    onChange={(e) => updateSearch({ keyword: e.target.value })}
                    placeholder="Restaurant name, cuisine, dishes..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Cuisine Type</Label>
                  <Select value={searchParams.cuisineType} onValueChange={(value) => updateSearch({ cuisineType: value })}>
                    <SelectTrigger className="mt-1">
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

                <div>
                  <Label>Price Range</Label>
                  <Select value={searchParams.priceRange} onValueChange={(value) => updateSearch({ priceRange: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Price</SelectItem>
                      <SelectItem value="$">$ - Budget</SelectItem>
                      <SelectItem value="$$">$$ - Moderate</SelectItem>
                      <SelectItem value="$$$">$$$ - Expensive</SelectItem>
                      <SelectItem value="$$$$">$$$$ - Very Expensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Min Rating</Label>
                  <Select value={searchParams.minRating} onValueChange={(value) => updateSearch({ minRating: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={() => updateSearch({})} variant="outline" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {restaurants.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Search className="w-16 h-16 text-warm-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-charcoal mb-2">No Restaurants Found</h3>
                <p className="text-warm-gray mb-4">
                  Try adjusting your search criteria or explore different locations.
                </p>
                <Button onClick={() => setLocation("/")} className="bg-saffron hover:bg-orange-600">
                  Browse All Restaurants
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(searchParams.page - 1)}
                    disabled={searchParams.page <= 1}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={page === searchParams.page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={page === searchParams.page ? "bg-saffron hover:bg-orange-600" : ""}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(searchParams.page + 1)}
                    disabled={searchParams.page >= totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
