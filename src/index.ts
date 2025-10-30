import dotenv from "dotenv";
dotenv.config();

import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Import the route files ---
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
// ---------------------------------------------

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = process.env.PORT || 5000;

// --- Middleware Setup ---
// Configure CORS for development and production
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : true,
    credentials: true
}));

// Configure helmet to allow serving the SPA
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes (must come before static files) ---
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// --- Health check route ---
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// --- Serve Frontend Build Files ---
const distPath = path.join(__dirname, '..', 'dist', 'public');
app.use(express.static(distPath));

// --- Catch-all route to serve index.html for client-side routing ---
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// --- Database Connection ---
const mongoUri = process.env.MONGO_URI;

// Function to start the server
const startServer = () => {
    app.listen(port, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🚀 Kairo Mental Health Platform Server                  ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║  Server: http://localhost:${port}                            ║
║  Environment: ${process.env.NODE_ENV || 'development'}                                  ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║  API Endpoints:                                           ║
║    • POST /api/auth/register - User registration          ║
║    • POST /api/auth/login - User login                    ║
║    • POST /api/chat/session - Create chat session         ║
║    • POST /api/chat/:sessionId/message - Send message     ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
╚═══════════════════════════════════════════════════════════╝
        `);
    });
};

// Connect to MongoDB if URI is provided, otherwise start without DB
if (mongoUri) {
    mongoose.connect(mongoUri)
        .then(() => {
            console.log('✅ MongoDB connected successfully.');
            startServer();
        })
        .catch((err) => {
            console.error('❌ MongoDB connection error:', err.message);
            console.log('⚠️  Starting server without database...');
            startServer();
        });
} else {
    console.log('⚠️  MONGO_URI not defined. Starting server without database...');
    console.log('   Note: Authentication and chat features require MongoDB.');
    startServer();
}
