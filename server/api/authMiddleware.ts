import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from './user'; // Adjust the import based on your file structure
import { IUser } from './userInterface'

interface RequestWithUser extends Request {
    user?: any;
  }
  

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!); 
        const user = await User.findById(decoded.userId) as IUser;
       
        if (!user) {
            
            return res.status(401).json({ error: 'Unauthorized' });

        }

        req.user = user; 
        next(); 
    } 
    
    catch (error) {

        console.error('Error in auth middleware:', error);
        res.status(401).json({ error: 'Invalid token' });

    }

};