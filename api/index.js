import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from '../app/pages/userRoutes'; // Adjust the import path as necessary
import ProtectedRoutes from '../app/pages/protectedRoutes'; // Adjust the import path as necessary
import connectToMongoDB from './db'; // Adjust the import path as necessary

dotenv.config(); // Load environment variables

const server = express();

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON
server.use(express.json());
server.use(cors());

// Define routes
server.use('/api/users', UserRoutes);
server.use('/api', ProtectedRoutes);

server.get("/", (req, res) => {
    res.json("Hello");
});

// Export the server as a handler for Vercel
export default server;