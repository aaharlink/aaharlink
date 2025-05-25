const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Your restaurant data - I'll add all 800+ restaurants here
const restaurants = [
  {
    id: 1,
    name: "Gujarat Gardens",
    cuisine: "Gujarati",
    city: "London", 
    country: "United Kingdom",
    address: "123 Brick Lane, London E1 6SB",
    rating: 4.5,
    description: "Authentic Gujarati thali and street food in London's curry capital",
    specialties: ["Dhokla", "Khandvi", "Gujarati Thali"],
    phone: "+44 20 7247 9999",
    hours: "Mon-Sun: 12:00-22:00"
  },
  {
    id: 2,
    name: "Punjab Palace",
    cuisine: "Punjabi",
    city: "New York",
    country: "United States", 
    address: "456 Jackson Heights Blvd, Queens NY 11372",
    rating: 4.3,
    description: "Traditional Punjabi flavors with tandoor specialties",
    specialties: ["Butter Chicken", "Naan", "Lassi"],
    phone: "+1 718-555-0123",
    hours: "Mon-Sun: 11:00-23:00"
  },
  {
    id: 3,
    name: "South Spice Dosa House",
    cuisine: "South Indian",
    city: "Toronto",
    country: "Canada",
    address: "789 Gerrard India Bazaar, Toronto M4M 1Y2",
    rating: 4.7,
    description: "Authentic South Indian dosas, idli and filter coffee",
    specialties: ["Masala Dosa", "Sambar", "Filter Coffee"],
    phone: "+1 416-555-0456",
    hours: "Tue-Sun: 10:00-21:00"
  },
  {
    id: 4,
    name: "Ahmedabad Express",
    cuisine: "Gujarati",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Al Karama Street, Dubai",
    rating: 4.4,
    description: "Home-style Gujarati cooking with authentic spices",
    specialties: ["Undhiyu", "Thepla", "Gujarati Kadhi"],
    phone: "+971 4-555-0789",
    hours: "Daily: 12:00-23:00"
  },
  {
    id: 5,
    name: "Chennai Corner",
    cuisine: "South Indian",
    city: "Singapore",
    country: "Singapore",
    address: "Little India, Serangoon Road",
    rating: 4.6,
    description: "Traditional Tamil cuisine with modern presentation",
    specialties: ["Chettinad Chicken", "Appam", "Rasam"],
    phone: "+65 6555-0321",
    hours: "Daily: 11:00-22:00"
  }
];

const stats = {
  totalRestaurants: "800+",
  totalCountries: "50+",
  totalReviews: "2000+"
};

// Serve main page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AaharLink - Global Indian Restaurant Directory</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #ff7700, #ff5722); color: white; padding: 2rem 0; text-align: center; }
        .header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header p { font-size: 1.2rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .stats { display: flex; justify-content: center; gap: 3rem; margin: 2rem 0; }
        .stat { text-align: center; }
        .stat-number { font-size: 2rem; font-weight: bold; color: #ff7700; }
        .stat-label { color: #666; }
        .restaurants { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin: 2rem 0; }
        .restaurant-card { 
            background: white; 
            border-radius: 12px; 
            padding: 1.5rem; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
            border: 1px solid #eee;
            transition: transform 0.2s;
        }
        .restaurant-card:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(0,0,0,0.15); }
        .restaurant-name { font-size: 1.3rem; font-weight: bold; color: #333; margin-bottom: 0.5rem; }
        .cuisine-badge { 
            background: #ff7700; 
            color: white; 
            padding: 0.25rem 0.75rem; 
            border-radius: 20px; 
            font-size: 0.8rem; 
            display: inline-block; 
            margin-bottom: 1rem;
        }
        .location { font-weight: bold; color: #555; margin-bottom: 0.5rem; }
        .rating { color: #ff7700; font-weight: bold; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 1rem; }
        .specialties { 
            background: #f8f9fa; 
            padding: 0.75rem; 
            border-radius: 8px; 
            margin-bottom: 1rem;
        }
        .specialties strong { color: #333; }
        .contact { font-size: 0.9rem; color: #666; }
        .footer { background: #333; color: white; text-align: center; padding: 2rem 0; margin-top: 3rem; }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>🍛 AaharLink</h1>
            <p>Discover Authentic Indian Restaurants Worldwide</p>
        </div>
    </div>
    
    <div class="container">
        <div class="stats">
            <div class="stat">
                <div class="stat-number">${stats.totalRestaurants}</div>
                <div class="stat-label">Restaurants</div>
            </div>
            <div class="stat">
                <div class="stat-number">${stats.totalCountries}</div>
                <div class="stat-label">Countries</div>
            </div>
            <div class="stat">
                <div class="stat-number">${stats.totalReviews}</div>
                <div class="stat-label">Reviews</div>
            </div>
        </div>
        
        <div class="restaurants">
            ${restaurants.map(restaurant => `
                <div class="restaurant-card">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <span class="cuisine-badge">${restaurant.cuisine}</span>
                    <div class="location">📍 ${restaurant.city}, ${restaurant.country}</div>
                    <div class="rating">⭐ ${restaurant.rating}/5.0</div>
                    <div class="description">${restaurant.description}</div>
                    <div class="specialties">
                        <strong>Specialties:</strong> ${restaurant.specialties.join(', ')}
                    </div>
                    <div class="contact">
                        📞 ${restaurant.phone}<br>
                        🕒 ${restaurant.hours}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    
    <div class="footer">
        <div class="container">
            <p>&copy; 2024 AaharLink - Connecting food lovers with authentic Indian cuisine worldwide</p>
            <p>Contact: support@aaharlink.com</p>
        </div>
    </div>
</body>
</html>
  `);
});

// API endpoints
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🍛 AaharLink server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
