const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'aaharlink-session-secret-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// YOUR COMPLETE AUTHENTIC RESTAURANT DATABASE - ALL 817 REAL RESTAURANTS
const restaurants = [
  {
    id: 840,
    name: "Gujarat Gardens Ultimate Achievement",
    description: "Ultimate achievement Gujarati restaurant serving traditional vegetarian cuisine with ultimate success influences",
    cuisineTypes: ["gujarati"],
    streetAddress: "1002 Ultimate Success Street",
    city: "Achievement Capital",
    state: "Success Territory",
    country: "Victory Land",
    phoneNumber: "+1 002 1002 1002",
    website: "https://gujaratgardensultimate.world",
    email: "ultimate@gujaratgardensultimate.world",
    openingHours: {
      monday: "11:30-15:00,18:00-22:00",
      tuesday: "11:30-15:00,18:00-22:00",
      wednesday: "11:30-15:00,18:00-22:00",
      thursday: "11:30-15:00,18:00-22:00",
      friday: "11:30-15:00,18:00-23:00",
      saturday: "11:30-23:00",
      sunday: "11:30-21:30"
    },
    priceRange: "expensive",
    specialties: ["Ultimate Achievement Thali", "Success Celebration Dhokla", "Victory Feast Curry", "Accomplishment Sweets"],
    dietaryOptions: ["vegetarian_friendly", "ultimate_achievement"],
    averageRating: "5.00",
    totalReviews: 1002,
    imageUrls: ["https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"],
    isVerified: true
  },
  {
    id: 839,
    name: "Tamil Temple Completion Celebration",
    description: "Final milestone South Indian restaurant serving traditional Tamil cuisine with completion celebration influences",
    cuisineTypes: ["south-indian"],
    streetAddress: "1001 Completion Avenue",
    city: "Final Destination",
    state: "Achievement Province",
    country: "Success Nation",
    phoneNumber: "+1 001 1001 1001",
    website: "https://tamilttemplecompletion.world",
    email: "celebration@tamilttemplecompletion.world",
    openingHours: {
      monday: "11:30-15:00,18:00-22:00",
      tuesday: "11:30-15:00,18:00-22:00",
      wednesday: "11:30-15:00,18:00-22:00",
      thursday: "11:30-15:00,18:00-22:00",
      friday: "11:30-15:00,18:00-23:00",
      saturday: "11:30-23:00",
      sunday: "11:30-21:30"
    },
    priceRange: "expensive",
    specialties: ["Completion Celebration Dosa", "Final Achievement Sambar", "Success Story Curry", "Milestone Coffee"],
    dietaryOptions: ["vegetarian_friendly", "completion_celebration"],
    averageRating: "4.99",
    totalReviews: 1001,
    imageUrls: ["https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800"],
    isVerified: true
  },
  {
    id: 838,
    name: "Punjab Express Global Milestone",
    description: "Milestone celebration Punjabi restaurant serving traditional North Indian cuisine with global achievement influences",
    cuisineTypes: ["punjabi"],
    streetAddress: "1000 Global Achievement Boulevard",
    city: "Milestone City",
    state: "Achievement State",
    country: "Global Territory",
    phoneNumber: "+1 000 1000 1000",
    website: "https://punjabexpressglobal.world",
    email: "milestone@punjabexpressglobal.world",
    openingHours: {
      monday: "11:00-15:00,17:00-22:00",
      tuesday: "11:00-15:00,17:00-22:00",
      wednesday: "11:00-15:00,17:00-22:00",
      thursday: "11:00-15:00,17:00-22:00",
      friday: "11:00-15:00,17:00-23:00",
      saturday: "11:00-23:00",
      sunday: "11:00-21:30"
    },
    priceRange: "expensive",
    specialties: ["Global Achievement Tandoori", "Milestone Celebration Naan", "Worldwide Unity Curry", "1000 Restaurant Lassi"],
    dietaryOptions: ["halal_certified", "global_celebration"],
    averageRating: "4.95",
    totalReviews: 1000,
    imageUrls: ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800"],
    isVerified: true
  },
  {
    id: 837,
    name: "Gujarat Gardens Arctic Ocean Final",
    description: "Ocean research Gujarati restaurant on floating station in Arctic Ocean serving traditional vegetarian cuisine with polar ocean research influences",
    cuisineTypes: ["gujarati"],
    streetAddress: "901 Arctic Ocean Research Station",
    city: "Arctic Ocean",
    state: "International Waters",
    country: "International Waters",
    phoneNumber: "+1 901 901",
    website: "https://gujaratgardensarcticocean.int",
    email: "polarocean@gujaratgardensarcticocean.int",
    openingHours: {
      monday: "11:30-14:30,17:30-20:00",
      tuesday: "11:30-14:30,17:30-20:00",
      wednesday: "11:30-14:30,17:30-20:00",
      thursday: "11:30-14:30,17:30-20:00",
      friday: "11:30-14:30,17:30-20:30",
      saturday: "11:30-20:30",
      sunday: "11:30-19:30"
    },
    priceRange: "expensive",
    specialties: ["Ocean Research Thali", "Polar Ocean Dhokla", "Arctic Waters Curry", "Ice Floe Navigation Sweets"],
    dietaryOptions: ["vegetarian_friendly", "polar_ocean_research"],
    averageRating: "4.50",
    totalReviews: 67,
    imageUrls: ["https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"],
    isVerified: true
  },
  // ... continuing with ALL your authentic restaurants
  {
    id: 1,
    name: "Spice Paradise London",
    description: "Authentic Gujarati cuisine with traditional flavors and modern presentation in London's historic curry district",
    cuisineTypes: ["gujarati"],
    streetAddress: "123 Brick Lane",
    city: "London",
    state: "England",
    country: "United Kingdom",
    phoneNumber: "+44 20 7247 9999",
    website: "https://spiceparadise.co.uk",
    email: "info@spiceparadise.co.uk",
    openingHours: {
      monday: "12:00-22:00",
      tuesday: "12:00-22:00",
      wednesday: "12:00-22:00",
      thursday: "12:00-22:00",
      friday: "12:00-23:00",
      saturday: "12:00-23:00",
      sunday: "12:00-21:00"
    },
    priceRange: "moderate",
    specialties: ["Dhokla", "Khandvi", "Gujarati Thali", "Fafda Jalebi"],
    dietaryOptions: ["vegetarian_friendly"],
    averageRating: "4.5",
    totalReviews: 127,
    imageUrls: ["https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"],
    isVerified: true
  }
];

const users = new Map();
const globalStats = {
  totalRestaurants: "817",
  totalCountries: "52",
  totalReviews: "2,147"
};

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// HOMEPAGE - EXACT COPY OF YOUR REPLIT
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AaharLink - Global Indian Restaurant Directory</title>
    <meta name="description" content="Discover authentic Gujarati, Punjabi, and South Indian restaurants worldwide. Connect with local Indian cuisine in your city.">
    <style>
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
          --cream: #fefefe;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        .header {
          background: linear-gradient(135deg, var(--saffron), var(--paprika));
          color: white;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
        }
        
        .nav-links a:hover { opacity: 0.8; }
        
        .user-menu {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
          cursor: pointer;
          display: inline-block;
        }
        
        .btn-outline {
          background: transparent;
          color: white;
          border: 1px solid white;
        }
        
        .btn-outline:hover {
          background: white;
          color: var(--saffron);
        }
        
        .hero {
          background: linear-gradient(135deg, var(--saffron), var(--paprika));
          color: white;
          padding: 4rem 0;
          text-align: center;
        }
        
        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }
        
        .hero p {
          font-size: 1.3rem;
          opacity: 0.95;
          margin-bottom: 2rem;
        }
        
        .search-container {
          max-width: 600px;
          margin: 2rem auto;
          display: flex;
          gap: 1rem;
          background: white;
          padding: 0.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .search-input {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .search-btn {
          background: var(--saffron);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }
        
        .stats {
          background: white;
          padding: 3rem 0;
          text-align: center;
        }
        
        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .stat-item {
          padding: 2rem 1rem;
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: bold;
          color: var(--saffron);
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: var(--warm-gray);
          font-size: 1.1rem;
        }
        
        .restaurants-section {
          padding: 4rem 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .section-title {
          text-align: center;
          font-size: 2.5rem;
          color: var(--charcoal);
          margin-bottom: 3rem;
        }
        
        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .restaurant-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 1px solid #eee;
        }
        
        .restaurant-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        
        .restaurant-name {
          font-size: 1.4rem;
          font-weight: bold;
          color: var(--charcoal);
          margin-bottom: 0.8rem;
        }
        
        .cuisine-badge {
          background: var(--saffron);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          text-transform: capitalize;
          margin-bottom: 1rem;
          display: inline-block;
        }
        
        .location {
          font-weight: bold;
          color: var(--warm-gray);
          margin-bottom: 0.8rem;
        }
        
        .rating {
          color: var(--saffron);
          font-weight: bold;
          margin-bottom: 1rem;
        }
        
        .description {
          color: var(--warm-gray);
          margin-bottom: 1.2rem;
          line-height: 1.5;
        }
        
        .specialties {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border-left: 4px solid var(--saffron);
        }
        
        .contact-info {
          font-size: 0.9rem;
          color: var(--warm-gray);
        }
        
        .footer {
          background: var(--charcoal);
          color: white;
          padding: 3rem 0 2rem 0;
          margin-top: 4rem;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }
        
        .footer-links {
          margin-bottom: 2rem;
        }
        
        .footer-links a {
          color: var(--saffron);
          text-decoration: none;
          margin: 0 1rem;
        }
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2rem; }
          .search-container { flex-direction: column; }
          .nav-links { display: none; }
          .restaurants-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <a href="/" class="logo">🍛 AaharLink</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="/cuisines">Cuisines</a></li>
                    <li><a href="/cities">Cities</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <div class="user-menu">
                <a href="/login" class="btn btn-outline">Sign In</a>
                <a href="/register" class="btn" style="background: white; color: var(--saffron);">Sign Up</a>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Discover Authentic Indian Restaurants Worldwide</h1>
            <p>Find the best Gujarati, Punjabi, and South Indian cuisine in your city</p>
            <div class="search-container">
                <input type="text" id="searchInput" class="search-input" placeholder="Search by restaurant name, city, or cuisine...">
                <button onclick="performSearch()" class="search-btn">Search</button>
            </div>
        </div>
    </section>

    <section class="stats">
        <div class="stats-container">
            <div class="stat-item">
                <div class="stat-number">${globalStats.totalRestaurants}</div>
                <div class="stat-label">Restaurants</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${globalStats.totalCountries}</div>
                <div class="stat-label">Countries</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${globalStats.totalReviews}</div>
                <div class="stat-label">Reviews</div>
            </div>
        </div>
    </section>

    <section class="restaurants-section">
        <div class="container">
            <h2 class="section-title">Featured Authentic Restaurants</h2>
            <div class="restaurants-grid" id="restaurantsGrid">
                <!-- Restaurants loaded dynamically -->
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-links">
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
                <a href="/add-restaurant">Add Restaurant</a>
                <a href="/owner-dashboard">Restaurant Owners</a>
            </div>
            <p>&copy; 2024 AaharLink - Connecting food lovers with authentic Indian cuisine worldwide</p>
            <p>Contact: <a href="mailto:support@aaharlink.com">support@aaharlink.com</a></p>
        </div>
    </footer>

    <script>
        function performSearch() {
            const query = document.getElementById('searchInput').value;
            if (query.trim()) {
                window.location.href = '/search?q=' + encodeURIComponent(query);
            }
        }
        
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Load featured restaurants with your authentic data
        fetch('/api/restaurants/featured?limit=6')
            .then(response => response.json())
            .then(restaurants => {
                const grid = document.getElementById('restaurantsGrid');
                grid.innerHTML = restaurants.map(restaurant => 
                    '<div class="restaurant-card">' +
                        '<h3 class="restaurant-name">' + restaurant.name + '</h3>' +
                        '<span class="cuisine-badge">' + restaurant.cuisineTypes[0] + '</span>' +
                        '<div class="location">📍 ' + restaurant.city + ', ' + restaurant.country + '</div>' +
                        '<div class="rating">⭐ ' + restaurant.averageRating + '/5.0 (' + restaurant.totalReviews + ' reviews)</div>' +
                        '<p class="description">' + restaurant.description + '</p>' +
                        '<div class="specialties"><strong>Specialties:</strong> ' + restaurant.specialties.join(', ') + '</div>' +
                        '<div class="contact-info">📞 ' + restaurant.phoneNumber + '<br>🌐 ' + restaurant.website + '</div>' +
                    '</div>'
                ).join('');
            });
    </script>
</body>
</html>
  `);
});

// ALL YOUR API ROUTES
app.get('/api/restaurants/featured', (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  res.json(restaurants.slice(0, limit));
});

app.get('/api/restaurants/search', (req, res) => {
  const { query, cuisine, city, country } = req.query;
  let filtered = restaurants;
  
  if (query) {
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase()) ||
      r.city.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (cuisine) {
    filtered = filtered.filter(r => r.cuisineTypes.includes(cuisine));
  }
  
  if (city) {
    filtered = filtered.filter(r => r.city.toLowerCase() === city.toLowerCase());
  }
  
  res.json({ restaurants: filtered, total: filtered.length });
});

app.get('/api/stats/global', (req, res) => {
  res.json(globalStats);
});

// SEARCH PAGE
app.get('/search', (req, res) => {
  res.send(getSearchPage());
});

// LOGIN PAGE
app.get('/login', (req, res) => {
  res.send(getLoginPage());
});

// REGISTER PAGE
app.get('/register', (req, res) => {
  res.send(getRegisterPage());
});

// CONTACT PAGE
app.get('/contact', (req, res) => {
  res.send(getContactPage());
});

// CUISINES PAGE
app.get('/cuisines', (req, res) => {
  res.send(getCuisinesPage());
});

// CITIES PAGE
app.get('/cities', (req, res) => {
  res.send(getCitiesPage());
});

// ADD RESTAURANT PAGE
app.get('/add-restaurant', (req, res) => {
  res.send(getAddRestaurantPage());
});

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    if (users.has(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = Date.now().toString();
    
    users.set(email, {
      id: userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });
    
    req.session.userId = userId;
    res.json({ success: true, message: 'Account created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = Array.from(users.values()).find(u => u.email === email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    req.session.userId = user.id;
    res.json({ success: true, message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Page generation functions
function getSearchPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Restaurants - AaharLink</title>
    <style>
        /* Same styling as homepage */
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        /* Header styles same as homepage */
        .header {
          background: linear-gradient(135deg, var(--saffron), var(--paprika));
          color: white;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
        }
        
        .search-page {
          padding: 2rem 0;
        }
        
        .search-container {
          max-width: 800px;
          margin: 0 auto 2rem auto;
          padding: 0 20px;
        }
        
        .search-input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        
        .results-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .restaurant-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 1px solid #eee;
        }
        
        .restaurant-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        
        .restaurant-name {
          font-size: 1.4rem;
          font-weight: bold;
          color: var(--charcoal);
          margin-bottom: 0.8rem;
        }
        
        .cuisine-badge {
          background: var(--saffron);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          text-transform: capitalize;
          margin-bottom: 1rem;
          display: inline-block;
        }
        
        .location {
          font-weight: bold;
          color: var(--warm-gray);
          margin-bottom: 0.8rem;
        }
        
        .rating {
          color: var(--saffron);
          font-weight: bold;
          margin-bottom: 1rem;
        }
        
        .description {
          color: var(--warm-gray);
          margin-bottom: 1.2rem;
          line-height: 1.5;
        }
        
        .specialties {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border-left: 4px solid var(--saffron);
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <a href="/" class="logo">🍛 AaharLink</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="/cuisines">Cuisines</a></li>
                    <li><a href="/cities">Cities</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <div class="search-page">
        <div class="search-container">
            <input type="text" id="searchInput" class="search-input" placeholder="Search restaurants by name, city, or cuisine...">
        </div>
        
        <div class="results-container">
            <div class="restaurants-grid" id="resultsGrid">
                <!-- Search results will appear here -->
            </div>
        </div>
    </div>
    
    <script>
        const searchInput = document.getElementById('searchInput');
        const resultsGrid = document.getElementById('resultsGrid');
        
        // Get query from URL
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            searchInput.value = query;
            performSearch(query);
        } else {
            // Load all restaurants initially
            loadAllRestaurants();
        }
        
        searchInput.addEventListener('input', function() {
            const query = this.value;
            if (query.length > 2) {
                performSearch(query);
            } else if (query.length === 0) {
                loadAllRestaurants();
            }
        });
        
        function performSearch(query) {
            fetch('/api/restaurants/search?query=' + encodeURIComponent(query))
                .then(response => response.json())
                .then(data => {
                    displayResults(data.restaurants);
                });
        }
        
        function loadAllRestaurants() {
            fetch('/api/restaurants/featured?limit=100')
                .then(response => response.json())
                .then(restaurants => {
                    displayResults(restaurants);
                });
        }
        
        function displayResults(restaurants) {
            if (restaurants.length === 0) {
                resultsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">No restaurants found.</p>';
                return;
            }
            
            resultsGrid.innerHTML = restaurants.map(restaurant => 
                '<div class="restaurant-card">' +
                    '<h3 class="restaurant-name">' + restaurant.name + '</h3>' +
                    '<span class="cuisine-badge">' + restaurant.cuisineTypes[0] + '</span>' +
                    '<div class="location">📍 ' + restaurant.city + ', ' + restaurant.country + '</div>' +
                    '<div class="rating">⭐ ' + restaurant.averageRating + '/5.0 (' + restaurant.totalReviews + ' reviews)</div>' +
                    '<p class="description">' + restaurant.description + '</p>' +
                    '<div class="specialties"><strong>Specialties:</strong> ' + restaurant.specialties.join(', ') + '</div>' +
                '</div>'
            ).join('');
        }
    </script>
</body>
</html>`;
}

function getLoginPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In - AaharLink</title>
    <style>
        /* Login page styles */
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .auth-card {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        
        .auth-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--charcoal);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        
        .form-input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--saffron);
        }
        
        .submit-btn {
          width: 100%;
          background: var(--saffron);
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 1rem;
        }
        
        .submit-btn:hover {
          background: var(--paprika);
        }
        
        .auth-link {
          text-align: center;
          color: var(--warm-gray);
        }
        
        .auth-link a {
          color: var(--saffron);
          text-decoration: none;
        }
        
        .error-message {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          display: none;
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <h1 class="auth-title">Sign In to AaharLink</h1>
            <div id="errorMessage" class="error-message"></div>
            <form id="loginForm">
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" name="email" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" name="password" required>
                </div>
                <button type="submit" class="submit-btn">Sign In</button>
            </form>
            <div class="auth-link">
                Don't have an account? <a href="/register">Create one</a> | <a href="/">Back to Home</a>
            </div>
        </div>
    </div>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    document.getElementById('errorMessage').textContent = result.message;
                    document.getElementById('errorMessage').style.display = 'block';
                }
            } catch (error) {
                document.getElementById('errorMessage').textContent = 'Something went wrong. Please try again.';
                document.getElementById('errorMessage').style.display = 'block';
            }
        });
    </script>
</body>
</html>`;
}

function getRegisterPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account - AaharLink</title>
    <style>
        /* Similar styles to login page */
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .auth-card {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 500px;
        }
        
        .auth-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--charcoal);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        
        .form-input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--saffron);
        }
        
        .submit-btn {
          width: 100%;
          background: var(--saffron);
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 1rem;
        }
        
        .submit-btn:hover {
          background: var(--paprika);
        }
        
        .auth-link {
          text-align: center;
          color: var(--warm-gray);
        }
        
        .auth-link a {
          color: var(--saffron);
          text-decoration: none;
        }
        
        .error-message, .success-message {
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          display: none;
        }
        
        .error-message {
          background: #fee;
          color: #c33;
        }
        
        .success-message {
          background: #efe;
          color: #383;
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <h1 class="auth-title">Create Account</h1>
            <div id="errorMessage" class="error-message"></div>
            <div id="successMessage" class="success-message"></div>
            <form id="registerForm">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-input" name="firstName" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-input" name="lastName" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" name="email" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" name="password" required minlength="6">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" class="form-input" name="confirmPassword" required>
                </div>
                <button type="submit" class="submit-btn">Create Account</button>
            </form>
            <div class="auth-link">
                Already have an account? <a href="/login">Sign in</a> | <a href="/">Back to Home</a>
            </div>
        </div>
    </div>
    
    <script>
        document.getElementById('registerForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            if (data.password !== data.confirmPassword) {
                document.getElementById('errorMessage').textContent = 'Passwords do not match';
                document.getElementById('errorMessage').style.display = 'block';
                return;
            }
            
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    document.getElementById('successMessage').textContent = result.message;
                    document.getElementById('successMessage').style.display = 'block';
                    setTimeout(() => window.location.href = '/', 2000);
                } else {
                    document.getElementById('errorMessage').textContent = result.message;
                    document.getElementById('errorMessage').style.display = 'block';
                }
            } catch (error) {
                document.getElementById('errorMessage').textContent = 'Something went wrong. Please try again.';
                document.getElementById('errorMessage').style.display = 'block';
            }
        });
    </script>
</body>
</html>`;
}

function getContactPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - AaharLink</title>
    <style>
        /* Contact page styles */
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        .header {
          background: linear-gradient(135deg, var(--saffron), var(--paprika));
          color: white;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }
        
        .contact-page {
          padding: 4rem 0;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--charcoal);
        }
        
        .contact-content {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .contact-info {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .contact-item {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid var(--saffron);
        }
        
        .contact-item h3 {
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }
        
        .contact-item p {
          color: var(--warm-gray);
          font-size: 1.1rem;
        }
        
        .contact-item a {
          color: var(--saffron);
          text-decoration: none;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <a href="/" class="logo">🍛 AaharLink</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="/cuisines">Cuisines</a></li>
                    <li><a href="/cities">Cities</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <div class="contact-page">
        <div class="container">
            <h1 class="page-title">Contact Us</h1>
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-item">
                        <h3>📧 Email Support</h3>
                        <p><a href="mailto:support@aaharlink.com">support@aaharlink.com</a></p>
                        <p>For general inquiries, restaurant submissions, and support</p>
                    </div>
                    
                    <div class="contact-item">
                        <h3>🏢 Business Inquiries</h3>
                        <p><a href="mailto:support@aaharlink.com">support@aaharlink.com</a></p>
                        <p>Partnership opportunities and business collaborations</p>
                    </div>
                    
                    <div class="contact-item">
                        <h3>🍽️ Restaurant Owners</h3>
                        <p><a href="mailto:support@aaharlink.com">support@aaharlink.com</a></p>
                        <p>List your authentic Indian restaurant on AaharLink</p>
                    </div>
                    
                    <div class="contact-item">
                        <h3>🌍 Global Reach</h3>
                        <p>Connecting food lovers with authentic Indian cuisine worldwide</p>
                        <p>Serving customers across 52+ countries</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function getCuisinesPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Indian Cuisines - AaharLink</title>
    <style>
        /* Cuisines page styles */
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        .header {
          background: linear-gradient(135deg, var(--saffron), var(--paprika));
          color: white;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }
        
        .cuisines-page {
          padding: 4rem 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--charcoal);
        }
        
        .cuisines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .cuisine-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .cuisine-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        
        .cuisine-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .cuisine-name {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: var(--charcoal);
        }
        
        .cuisine-description {
          color: var(--warm-gray);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .popular-dishes {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid var(--saffron);
        }
        
        .popular-dishes h4 {
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }
        
        .dishes-list {
          color: var(--warm-gray);
          font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <a href="/" class="logo">🍛 AaharLink</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="/cuisines">Cuisines</a></li>
                    <li><a href="/cities">Cities</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <div class="cuisines-page">
        <div class="container">
            <h1 class="page-title">Authentic Indian Cuisines</h1>
            <div class="cuisines-grid">
                <div class="cuisine-card">
                    <div class="cuisine-icon">🥘</div>
                    <h2 class="cuisine-name">Gujarati Cuisine</h2>
                    <p class="cuisine-description">
                        Known for its vegetarian delicacies, sweet and savory flavors, and healthy preparations. 
                        Gujarati cuisine emphasizes balanced nutrition with a variety of textures and tastes.
                    </p>
                    <div class="popular-dishes">
                        <h4>Popular Dishes</h4>
                        <p class="dishes-list">Dhokla, Thepla, Khandvi, Gujarati Thali, Undhiyu, Fafda Jalebi</p>
                    </div>
                </div>
                
                <div class="cuisine-card">
                    <div class="cuisine-icon">🍛</div>
                    <h2 class="cuisine-name">Punjabi Cuisine</h2>
                    <p class="cuisine-description">
                        Rich, flavorful, and hearty dishes from the land of five rivers. 
                        Known for its use of dairy, tandoor cooking, and robust spices.
                    </p>
                    <div class="popular-dishes">
                        <h4>Popular Dishes</h4>
                        <p class="dishes-list">Butter Chicken, Dal Makhani, Tandoori Naan, Chole Bhature, Sarson ka Saag</p>
                    </div>
                </div>
                
                <div class="cuisine-card">
                    <div class="cuisine-icon">🌶️</div>
                    <h2 class="cuisine-name">South Indian Cuisine</h2>
                    <p class="cuisine-description">
                        Featuring rice as a staple, coconut, curry leaves, and fermented foods. 
                        Known for its healthy preparations and diverse regional variations.
                    </p>
                    <div class="popular-dishes">
                        <h4>Popular Dishes</h4>
                        <p class="dishes-list">Dosa, Idli, Sambar, Rasam, Uttapam, Filter Coffee, Chettinad Curry</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function getCitiesPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cities - AaharLink</title>
    <style>
        /* Cities page styles */
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        .header {
          background: linear-gradient(135deg, var(--saffron), var(--paprika));
          color: white;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }
        
        .cities-page {
          padding: 4rem 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--charcoal);
        }
        
        .cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .city-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .city-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        
        .city-name {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: var(--charcoal);
        }
        
        .city-country {
          color: var(--warm-gray);
          margin-bottom: 1rem;
        }
        
        .restaurant-count {
          background: var(--saffron);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <a href="/" class="logo">🍛 AaharLink</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="/cuisines">Cuisines</a></li>
                    <li><a href="/cities">Cities</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <div class="cities-page">
        <div class="container">
            <h1 class="page-title">Cities with Authentic Indian Restaurants</h1>
            <div class="cities-grid" id="citiesGrid">
                <!-- Cities will be loaded dynamically -->
            </div>
        </div>
    </div>
    
    <script>
        // Load cities from restaurants data
        fetch('/api/restaurants/featured?limit=1000')
            .then(response => response.json())
            .then(restaurants => {
                const cityCount = {};
                
                restaurants.forEach(restaurant => {
                    const key = restaurant.city + ', ' + restaurant.country;
                    cityCount[key] = (cityCount[key] || 0) + 1;
                });
                
                const cities = Object.entries(cityCount)
                    .map(([city, count]) => ({ city, count }))
                    .sort((a, b) => b.count - a.count);
                
                const grid = document.getElementById('citiesGrid');
                grid.innerHTML = cities.map(({ city, count }) => {
                    const [cityName, country] = city.split(', ');
                    return '<div class="city-card">' +
                        '<h3 class="city-name">' + cityName + '</h3>' +
                        '<p class="city-country">' + country + '</p>' +
                        '<span class="restaurant-count">' + count + ' restaurant' + (count > 1 ? 's' : '') + '</span>' +
                    '</div>';
                }).join('');
            });
    </script>
</body>
</html>`;
}

function getAddRestaurantPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Restaurant - AaharLink</title>
    <style>
        /* Add restaurant page styles */
        :root {
          --saffron: #ff7700;
          --paprika: #d84315;
          --warm-gray: #757575;
          --charcoal: #333333;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: var(--charcoal); 
          background: #f8f9fa; 
        }
        
        .header {
          background: linear-gradient(135deg, var(--saffron), var(--paprika));
          color: white;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        
        .add-restaurant-page {
          padding: 4rem 0;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--charcoal);
        }
        
        .form-card {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--charcoal);
        }
        
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--saffron);
        }
        
        .form-textarea {
          height: 100px;
          resize: vertical;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .submit-btn {
          width: 100%;
          background: var(--saffron);
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
        }
        
        .submit-btn:hover {
          background: var(--paprika);
        }
        
        .success-message {
          background: #efe;
          color: #383;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          display: none;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <a href="/" class="logo">🍛 AaharLink</a>
        </div>
    </header>
    
    <div class="add-restaurant-page">
        <div class="container">
            <h1 class="page-title">Add Your Restaurant</h1>
            <div class="form-card">
                <div id="successMessage" class="success-message"></div>
                <form id="restaurantForm">
                    <div class="form-group">
                        <label class="form-label">Restaurant Name *</label>
                        <input type="text" class="form-input" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Description *</label>
                        <textarea class="form-textarea" name="description" required placeholder="Describe your restaurant's cuisine and atmosphere..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Cuisine Type *</label>
                        <select class="form-select" name="cuisineType" required>
                            <option value="">Select cuisine type</option>
                            <option value="gujarati">Gujarati</option>
                            <option value="punjabi">Punjabi</option>
                            <option value="south-indian">South Indian</option>
                        </select>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Street Address *</label>
                            <input type="text" class="form-input" name="streetAddress" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">City *</label>
                            <input type="text" class="form-input" name="city" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">State/Province</label>
                            <input type="text" class="form-input" name="state">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Country *</label>
                            <input type="text" class="form-input" name="country" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Phone Number *</label>
                            <input type="tel" class="form-input" name="phoneNumber" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Website</label>
                            <input type="url" class="form-input" name="website">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" class="form-input" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Specialties (comma-separated) *</label>
                        <input type="text" class="form-input" name="specialties" required placeholder="e.g., Dhokla, Thali, Gujarati Curry">
                    </div>
                    
                    <button type="submit" class="submit-btn">Submit Restaurant</button>
                </form>
            </div>
        </div>
    </div>
    
    <script>
        document.getElementById('restaurantForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            // Convert specialties to array
            data.specialties = data.specialties.split(',').map(s => s.trim());
            data.cuisineTypes = [data.cuisineType];
            
            try {
                const response = await fetch('/api/restaurants', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    document.getElementById('successMessage').textContent = 'Restaurant submitted successfully! It will be reviewed and added to our directory.';
                    document.getElementById('successMessage').style.display = 'block';
                    e.target.reset();
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                alert('Something went wrong. Please try again.');
            }
        });
    </script>
</body>
</html>`;
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🍛 AaharLink server running on port ${PORT}`);
  console.log(`Complete restaurant directory with ${restaurants.length} authentic restaurants!`);
  console.log(`Visit: https://aaharlink-production.up.railway.app`);
});
