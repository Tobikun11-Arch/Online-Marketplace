import { Request, Response, NextFunction } from 'express';
import { GenerateTokens, VerifyAccessToken, VerifyRefreshToken } from '../middleware/AuthenticatedJWT';
import User from '../models/user';

interface RequestWithUser extends Request {
    user?: any;
} 


export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies['accessToken']; 
    if (!token) {
        return res.status(401).json({ error: 'Access token is missing', verToken: false });
    }

    try {
        const verifiedToken = VerifyAccessToken(token); // Verify the token
        req.user = verifiedToken; 
        next();
    } 

    catch (error) {
        return res.status(403).json({ error: 'Invalid access token' })  ;
    }
};


export const RefreshToken = async (req: Request, res: Response) => {
        const { refreshToken: cookiesRefreshToken } = req.cookies;
    
        if (!cookiesRefreshToken) {
        return res.status(403).json({ error: 'Refresh token is missing' });
        }
    
        try {
        let user = await User('buyer').findOne({ refreshToken: cookiesRefreshToken }); // Check BuyerAccounts first
        if (!user) {
            user = await User('seller').findOne({ refreshToken: cookiesRefreshToken }); // If not found, check SellerAccounts
        }
    
        if (!user) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
    
        const verified = VerifyRefreshToken(cookiesRefreshToken); // Verify refresh token
        if (!verified) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
    
        // Generate new access token and refresh token
        const { accessToken, refreshToken: newRefreshToken  } = GenerateTokens(user._id.toString());
    
        // Update the refresh token in DB and send new tokens
        user.refreshToken = newRefreshToken
        await user.save();
    
        res.cookie('refreshToken', newRefreshToken , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days 
            sameSite: 'strict',
        });
    
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
            sameSite: 'strict',
        });
    
        return res.json({ message: 'Tokens refreshed', cookiesRefreshToken: newRefreshToken });
        } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(403).json({ error: 'Could not refresh token' });
        }
};