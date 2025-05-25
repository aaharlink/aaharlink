import Header from "@/components/header";
import HeroSearch from "@/components/hero-search";
import CuisineFeatures from "@/components/cuisine-features";
import RestaurantSlider from "@/components/restaurant-slider";
import GlobalStats from "@/components/global-stats";
import RestaurantOwnerCTA from "@/components/restaurant-owner-cta";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSearch />
      <CuisineFeatures />
      <RestaurantSlider />
      <GlobalStats />
      <RestaurantOwnerCTA />
      <Footer />
    </div>
  );
}
