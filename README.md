# Kairo Mental Health & Wellness Platform

A full-stack mental health support application featuring AI-powered therapy chat, mood tracking, psychological assessments, and therapist matching.

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Library**: Radix UI + Tailwind CSS
- **State Management**: TanStack Query + React Context
- **Routing**: Wouter (client-side routing)
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **AI Integration**: Google Gemini API
- **Security**: Helmet, CORS

## Features

- 🔐 **User Authentication**: Secure signup/login with JWT
- 🤖 **AI Therapy Chat**: Powered by Google Gemini AI
- 📊 **Mood Tracking**: Track and visualize emotional patterns
- 🧠 **Psychological Assessments**: PANAS and EIS-HPD tests
- 👥 **Therapist Matching**: Smart questionnaire-based matching
- 📅 **Session Booking**: Schedule and manage therapy sessions
- 🔒 **Protected Routes**: Secure access to authenticated features
- 📱 **Responsive Design**: Mobile-friendly interface

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGO_URI=your-mongodb-connection-string
   
   # JWT Secret (generate a secure random string)
   JWT_SECRET=your-secure-jwt-secret
   
   # Gemini API Key
   GEMINI_API_KEY=your-gemini-api-key
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

3. **Generate a secure JWT secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

### Running the Application

#### Development Mode

**Option 1: Run full stack with one command (recommended)**:
```bash
npm start
```
This builds the frontend and starts the server on http://localhost:5000

**Option 2: Run frontend and backend separately**:
```bash
# Terminal 1 - Frontend dev server with hot reload
npm run dev

# Terminal 2 - Backend server
npm run dev:backend
```

#### Production Build

```bash
# Build and run for production
npm run fullstack:start
```

Or build separately:
```bash
# Build frontend
npm run build

# Build backend
npm run build:server

# Run production server
npm run server
```

### MongoDB Setup

#### Option 1: MongoDB Atlas (Cloud - Recommended for Replit)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP address to the IP whitelist (or allow access from anywhere for development)
4. Create a database user
5. Get your connection string and add it to `.env` as `MONGO_URI`

#### Option 2: Local MongoDB

```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
mongod

# Add to .env
MONGO_URI=mongodb://localhost:27017/kairo-db
```

### Gemini API Key Setup

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to `.env` as `GEMINI_API_KEY`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Build frontend and start full stack server |
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run dev:backend` | Start backend server only |
| `npm run build` | Build frontend for production |
| `npm run build:server` | Build backend TypeScript |
| `npm run fullstack:build` | Build both frontend and backend |
| `npm run fullstack:start` | Build and start production server |
| `npm run preview` | Preview production build |
| `npm run check` | TypeScript type checking |

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # React contexts (Auth, Plan)
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # API utilities
│   │   └── pages/         # Route pages
│   └── index.html
├── src/                    # Express backend
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models
│   └── routes/            # API routes
├── shared/                # Shared TypeScript types
└── dist/                  # Build output
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### AI Chat (Protected)
- `POST /api/chat/session` - Create new chat session
- `POST /api/chat/:sessionId/message` - Send message to AI

### Health Check
- `GET /api/health` - Server health status

## Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes with middleware
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Environment variable protection
- ✅ Session validation

## Deployment

### Replit Deployment

The project is configured for Replit Autoscale deployment:

1. Click the "Deploy" button in Replit
2. Configure environment secrets in Replit Secrets:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
3. Deploy!

### Local Production

```bash
npm run fullstack:start
```

The server will serve the built frontend and API on port 5000.

## Troubleshooting

### Frontend not loading
- Run `npm run build` manually
- Check that `dist/public` directory exists
- Verify server logs show "Server: http://localhost:5000"

### Authentication not working
- Verify `JWT_SECRET` is set in `.env`
- Check MongoDB connection
- Clear browser localStorage and try again

### AI chat not responding
- Verify `GEMINI_API_KEY` is valid
- Check server logs for error messages
- Ensure MongoDB is connected

### Database connection errors
- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

## License

MIT

## Support

For issues and questions, please open an issue on GitHub or contact support.
