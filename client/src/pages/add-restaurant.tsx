import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertRestaurantSchema, type InsertRestaurant } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { COUNTRIES } from "@/lib/countries";
import { HandPlatter, MapPin, Phone, Globe } from "lucide-react";

const cuisineOptions = [
  { value: "gujarati", label: "Gujarati" },
  { value: "punjabi", label: "Punjabi" },
  { value: "south-indian", label: "South Indian" },
];

const priceRangeOptions = [
  { value: "$", label: "$ - Budget-friendly" },
  { value: "$$", label: "$$ - Moderate" },
  { value: "$$$", label: "$$$ - Expensive" },
  { value: "$$$$", label: "$$$$ - Very Expensive" },
];

const dietaryOptions = [
  "vegetarian",
  "vegan",
  "halal",
  "jain",
  "gluten-free",
];

export default function AddRestaurant() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-saffron mx-auto"></div>
          <p className="mt-4 text-warm-gray">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-charcoal mb-4">Login Required</h2>
              <p className="text-warm-gray mb-6">
                You need to be logged in to add a restaurant. Please sign in to continue.
              </p>
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="bg-saffron hover:bg-orange-600 w-full"
              >
                Sign In to Add Restaurant
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([""]);

  const form = useForm<InsertRestaurant>({
    resolver: zodResolver(insertRestaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      cuisineTypes: [],
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      phoneNumber: "",
      website: "",
      email: "",
      priceRange: undefined,
      specialties: [],
      dietaryOptions: [],
    },
  });

  const createRestaurantMutation = useMutation({
    mutationFn: async (data: InsertRestaurant) => {
      return await apiRequest("POST", "/api/restaurants", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your restaurant has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/restaurants"] });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add restaurant. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertRestaurant) => {
    const filteredSpecialties = specialties.filter(s => s.trim() !== "");
    
    createRestaurantMutation.mutate({
      ...data,
      cuisineTypes: selectedCuisines,
      specialties: filteredSpecialties,
      dietaryOptions: selectedDietaryOptions,
    });
  };

  const addSpecialty = () => {
    setSpecialties([...specialties, ""]);
  };

  const updateSpecialty = (index: number, value: string) => {
    const updated = [...specialties];
    updated[index] = value;
    setSpecialties(updated);
  };

  const removeSpecialty = (index: number) => {
    setSpecialties(specialties.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-charcoal font-poppins flex items-center">
                <HandPlatter className="w-8 h-8 mr-3 text-saffron" />
                Add Your Restaurant
              </CardTitle>
              <p className="text-warm-gray">
                Share your authentic cuisine with food lovers around the world. Fill out the form below to list your restaurant.
              </p>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Restaurant Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter restaurant name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label>Cuisine Types *</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {cuisineOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.value}
                                checked={selectedCuisines.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedCuisines([...selectedCuisines, option.value]);
                                  } else {
                                    setSelectedCuisines(selectedCuisines.filter(c => c !== option.value));
                                  }
                                }}
                              />
                              <Label htmlFor={option.value} className="text-sm">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {selectedCuisines.length === 0 && (
                          <p className="text-sm text-red-500 mt-1">Please select at least one cuisine type</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your restaurant, its atmosphere, and what makes it special..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Location Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-saffron" />
                      Location Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="streetAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter street address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Region *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state or region" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {COUNTRIES.map((country) => (
                                  <SelectItem key={country.code} value={country.name}>
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter postal code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-saffron" />
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number with country code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://your-restaurant-website.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Additional Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="priceRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select price range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {priceRangeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label>Dietary Options</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {dietaryOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox
                                id={option}
                                checked={selectedDietaryOptions.includes(option)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedDietaryOptions([...selectedDietaryOptions, option]);
                                  } else {
                                    setSelectedDietaryOptions(selectedDietaryOptions.filter(d => d !== option));
                                  }
                                }}
                              />
                              <Label htmlFor={option} className="text-sm capitalize">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mt-6">
                      <Label>Specialties & Signature Dishes</Label>
                      <div className="space-y-2 mt-2">
                        {specialties.map((specialty, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={specialty}
                              onChange={(e) => updateSpecialty(index, e.target.value)}
                              placeholder="Enter a specialty dish or feature"
                            />
                            {specialties.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeSpecialty(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addSpecialty}
                        >
                          Add Another Specialty
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-saffron hover:bg-orange-600"
                      disabled={createRestaurantMutation.isPending || selectedCuisines.length === 0}
                    >
                      {createRestaurantMutation.isPending ? "Adding Restaurant..." : "Add Restaurant"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
