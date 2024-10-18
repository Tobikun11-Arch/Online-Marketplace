import { Request, Response, NextFunction } from 'express';
import { VerifyAccessToken } from '../middleware/AuthenticatedJWT';

interface RequestWithUser extends Request {
    user?: any;
} 


export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies['accessToken']; 
    const verToken = true;

    if (!token) {
        return res.status(401).json({ error: 'Access token is missing', verToken: false });
    }

    try {
        const verifiedToken = VerifyAccessToken(token); // Verify the token
        req.user = verifiedToken; 
        return res.json({message: "welcome user", verToken})
        next();
    } 

    catch (error) {
        return res.status(403).json({ error: 'Invalid access token' });
    }
};