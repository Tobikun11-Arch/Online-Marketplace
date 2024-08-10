import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from '../app/pages/userRoutes'; // Adjust the import path as necessary
import ProtectedRoutes from '../app/pages/protectedRoutes'; // Adjust the import path as necessary
import connectToMongoDB from './db'; // Adjust the import path as necessary
import next from 'next';

dotenv.config(); // Load environment variables

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
const port = process.env.API_PORT || 3000;

connectToMongoDB();

// Middleware to parse JSON
server.use(express.json());

const corsOptions = {
  origin: 'https://online-marketplace-eight.vercel.app', // Replace with your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  credentials: true, // Allow credentials if needed
};

server.use(cors(corsOptions));


    app.prepare().then(() => { // use to prepare and start nextjs application before handling routes or request
      server.use('/api/users', UserRoutes);
      server.use('/api', ProtectedRoutes);


      // Use Next.js request handler
      server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
      });

      server.listen(port, async () => {
        console.log(`Server is listening on port ${port}`);
      });
    });