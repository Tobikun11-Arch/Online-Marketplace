import express, { Request, Response } from 'express';
import next from 'next';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './userRoutes';
import ProtectedRoutes from './protectedRoutes';
import connectToMongoDB from './db';

dotenv.config(); // Load environment variables

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
const port = 3001;

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON
server.use(express.json());

// CORS configuration
const corsOptions = {
    origin: process.env.NEXT_PUBLIC_API_URL || '*', // Allow requests from your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware
server.use(cors(corsOptions));

app.prepare().then(() => {
    // Define your API routes
    server.use('/api/users', UserRoutes);
    server.use('/api', ProtectedRoutes);

    // Use Next.js request handler for all other routes
    server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
    });

    // Start the server
    server.listen(port, async () => {
        console.log(`Server is listening on port ${port}`);
    });
});