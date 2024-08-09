import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from '../app/pages/userRoutes'; // Adjust the import path as necessary
import ProtectedRoutes from '../app/pages/protectedRoutes'; // Adjust the import path as necessary
import connectToMongoDB from './db'; // Adjust the import path as necessary

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectToMongoDB();

const corsOptions = {
  origin: [
    'http://localhost:3000', // Allow local development
    'https://online-marketplace-eight.vercel.app', // Allow your Vercel app
  ],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Define your API routes
app.use('/api/users', UserRoutes);
app.use('/api', ProtectedRoutes);

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Express on Vercel');
});

// Export the app for Vercel
export default app;
