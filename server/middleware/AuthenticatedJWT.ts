import { JWT_SECRET, REFRESH_JWT_SECRET } from "../config/config";
import jwt from 'jsonwebtoken'

export const GenerateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, {expiresIn: '10s'});
}

export const GenerateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, REFRESH_JWT_SECRET, {expiresIn: '7d'});
}

export const VerifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {   
        throw new Error("Invalid access token")
    }
}

export const VerifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid access token")
    }
}

export const GenerateTokens = (userId: string) => {
    const accessToken = GenerateAccessToken(userId);
    const refreshToken = GenerateRefreshToken(userId);
    return { accessToken, refreshToken };
}