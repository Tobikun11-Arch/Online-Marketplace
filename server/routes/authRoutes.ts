import express from 'express';
import { VerifyRefreshToken, GenerateAccessToken } from '../middleware/AuthenticatedJWT' 
import User from '../models/user' 
import { Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken'; 

const router = express.Router();

router.post('/refresh-token', async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.sendStatus(401); 

    try {
        const decoded = VerifyRefreshToken(refreshToken) as JwtPayload;
        let user = await User('buyer').findById(decoded.userId);

        if (!user) {
            user = await User('seller').findById(decoded.userId);
        }

        if (!user || user.refreshToken !== refreshToken) {
            return res.sendStatus(403); 
        }

        const accessToken = GenerateAccessToken(user._id.toString());

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
        });

        res.json({ accessToken });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }
});

export default router;
