import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import SearchResults from "@/pages/search-results";
import RestaurantDetail from "@/pages/restaurant-detail";
import AddRestaurant from "@/pages/add-restaurant";
import OwnerDashboard from "@/pages/owner-dashboard";
import NotFound from "@/pages/not-found";
import Contact from "@/pages/contact";
import Cuisines from "@/pages/cuisines";
import Cities from "@/pages/cities";

function Router() {
  // Temporarily bypass authentication to show the website
  const isAuthenticated = false;

  return (
    <Switch>
      <Route path="/" component={isAuthenticated ? Home : Landing} />
      <Route path="/search" component={SearchResults} />
      <Route path="/restaurant/:id" component={RestaurantDetail} />
      <Route path="/add-restaurant" component={AddRestaurant} />
      <Route path="/dashboard" component={OwnerDashboard} />
      <Route path="/contact" component={Contact} />
      <Route path="/cuisines" component={Cuisines} />
      <Route path="/cities" component={Cities} />
      <Route path="/about" component={Landing} />
      <Route path="/accessibility" component={Landing} />
      <Route path="/sitemap" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
