import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user'; 
import { IUser } from '../models/user'

interface RequestWithUser extends Request {
    user?: IUser;
    }

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        
        const decoded: any = jwt.verify(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET!); 
        const userId = decoded.userId; // Store userId for later use
        const sellerUser = await User('seller').findById(userId) as IUser;
        const buyerUser = await User('buyer').findById(userId) as IUser;

        if (!sellerUser && !buyerUser) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = sellerUser || buyerUser; 
        next(); 
    } 

    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }

};