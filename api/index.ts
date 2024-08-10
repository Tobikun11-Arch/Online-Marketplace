import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from '../app/pages/userRoutes'; // Adjust the import path as necessary
import ProtectedRoutes from '../app/pages/protectedRoutes'; // Adjust the import path as necessary
import connectToMongoDB from './db'; // Adjust the import path as necessary


dotenv.config(); // Load environment variables


const server = express();
const port = process.env.PORT || 9001;

connectToMongoDB();

// Middleware to parse JSON
server.use(express.json());
server.use(cors());


      server.use('/api/users', UserRoutes);
      server.use('/api', ProtectedRoutes);
      
      server.get("/", (req, res) => {
        res.json("Hello");
    })

      // Use Next.js request handler
      server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
      });

      server.listen(port, async () => {
        console.log(`Server is listening on port ${port}`);
      });
 