# AaharLink - Global Indian Restaurant Directory

A worldwide directory connecting food enthusiasts with authentic Gujarati, Punjabi, and South Indian restaurants.

## Features

- 🌍 Global restaurant discovery
- 🍛 Authentic Indian cuisine focus (Gujarati, Punjabi, South Indian)
- 📍 Location-based search
- ⭐ Restaurant ratings and reviews
- 👨‍💼 Restaurant owner dashboard
- 📱 Responsive design

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Session-based auth

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
DATABASE_URL=your_postgresql_url
SESSION_SECRET=your_session_secret
PORT=5000
```

3. Run database migrations:
```bash
npm run db:push
```

4. Start development server:
```bash
npm run dev
```

## Deployment

This app is configured for Railway deployment with PostgreSQL database.

### Environment Variables Required:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `PORT` - Server port (Railway sets automatically)

## Contact

For support: support@aaharlink.com