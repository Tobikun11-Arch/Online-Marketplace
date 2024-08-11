import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from '../userRoutes'; // Adjust the import path as necessary
import ProtectedRoutes from '../protectedRoutes'; // Adjust the import path as necessary
import connectToMongoDB from '../db'; // Adjust the import path as necessary

dotenv.config(); // Load environment variables
const port = process.env.PORT || 9001;

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
    res.json("Hello from the API!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = server;