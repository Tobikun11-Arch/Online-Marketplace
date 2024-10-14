import dotenv from 'dotenv';
import ProtectedRoutes from '../routes/protectedRoutes';
import connectToMongoDB from '../config/db'; 
import express, {Request, Response} from 'express'
import verificationRoutes from '../routes/verificationRoutes'; 
import UserRoutes from '../routes/userRoutes'; 

dotenv.config(); 
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000', 'https://online-marketplace-beta.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors());
app.use(express.json());

connectToMongoDB()
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(error => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit if the connection fails
    });

app.use('/api/users', UserRoutes);
app.use('/api', ProtectedRoutes);
app.use('/', verificationRoutes); 

app.get("/", (req: Request, res: Response) => res.send("Express on Vercelss"));
app.get("/home", (req: Request, res: Response) => res.send("Gumana tanga"));


module.exports = app;