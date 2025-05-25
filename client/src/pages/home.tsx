import Header from "@/components/header";
import HeroSearch from "@/components/hero-search";
import CuisineFeatures from "@/components/cuisine-features";
import FeaturedRestaurants from "@/components/featured-restaurants";
import GlobalStats from "@/components/global-stats";
import RestaurantOwnerCTA from "@/components/restaurant-owner-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSearch />
      <CuisineFeatures />
      <FeaturedRestaurants />
      <GlobalStats />
      <RestaurantOwnerCTA />
      <Footer />
    </div>
  );
}
