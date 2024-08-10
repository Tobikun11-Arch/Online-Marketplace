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
const port = process.env.PORT || 9001;

connectToMongoDB();

// Middleware to parse JSON
server.use(express.json());
server.use(cors());


    app.prepare().then(() => { // use to prepare and start nextjs application before handling routes or request
      server.use('/api/users', UserRoutes);
      server.use('/api', ProtectedRoutes);
      
      server.get('/', (req, res) => {
        res.send('Hello Index.ts!')
      })

      // Use Next.js request handler
      server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
      });

      server.listen(port, async () => {
        console.log(`Server is listening on port ${port}`);
      });
    });