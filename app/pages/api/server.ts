// backend/server.ts
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

connectToMongoDB();

// Middleware to parse JSON
server.use(express.json());
server.use(cors()); // allows web applications running at one origin (domain) to request resources from a different origin (domain) securely

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

