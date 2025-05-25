export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-orange-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">CuisineConnect</h1>
          <p className="text-orange-100">Discover Authentic Indian Cuisine Worldwide</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find Authentic Indian Restaurants Globally
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with authentic Gujarati, Punjabi, and South Indian cuisine in over 50 countries
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="border border-gray-300 rounded-lg px-4 py-3">
                <option>All Cuisines</option>
                <option>Gujarati</option>
                <option>Punjabi</option>
                <option>South Indian</option>
              </select>
              <input 
                type="text" 
                placeholder="City or Country"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
              <button className="bg-orange-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-orange-700">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800" alt="Dishoom" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Dishoom</h4>
                <p className="text-gray-600 mb-3">London, UK • Gujarati</p>
                <p className="text-sm text-gray-500 mb-4">Bombay-style café serving exceptional Indian cuisine in elegant Victorian-era inspired setting</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-semibold">4.5 ⭐</span>
                  <span className="text-gray-500">Moderate</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800" alt="Punjabi By Nature" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Punjabi By Nature</h4>
                <p className="text-gray-600 mb-3">New Delhi, India • Punjabi</p>
                <p className="text-sm text-gray-500 mb-4">Authentic Punjabi cuisine with traditional North Indian flavors and live music</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-semibold">4.3 ⭐</span>
                  <span className="text-gray-500">Moderate</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1630409346517-a2681bc3b8e0?w=800" alt="Saravana Bhavan" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Saravana Bhavan</h4>
                <p className="text-gray-600 mb-3">New York, USA • South Indian</p>
                <p className="text-sm text-gray-500 mb-4">World-famous South Indian vegetarian restaurant chain serving authentic Tamil cuisine</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-semibold">4.2 ⭐</span>
                  <span className="text-gray-500">Budget</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700">
              View All Restaurants
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600">12</div>
              <div className="text-gray-600">Restaurants Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">6</div>
              <div className="text-gray-600">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">1,250+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-4">Restaurant Owner?</h3>
          <p className="text-xl mb-8">List your restaurant and reach customers worldwide</p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Add Your Restaurant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-4">CuisineConnect</h3>
              <p className="text-gray-300">Connecting food lovers with authentic Indian restaurants worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Find Restaurants</li>
                <li>Gujarati Cuisine</li>
                <li>Punjabi Cuisine</li>
                <li>South Indian Cuisine</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Owners</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Add Restaurant</li>
                <li>Owner Dashboard</li>
                <li>Success Stories</li>
                <li>Marketing Tips</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>hello@cuisineconnect.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Support Center</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CuisineConnect. Connecting authentic Indian cuisine worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}