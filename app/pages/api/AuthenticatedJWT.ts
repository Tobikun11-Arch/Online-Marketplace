import { JWT_SECRET } from "./config";
import jwt from 'jsonwebtoken'



export const GenerateToken = (userId: string) => {

    return jwt.sign({userId}, JWT_SECRET, {expiresIn: '1h'});

}


export const VerifyToken = (token: string) => {

    return jwt.verify(token, JWT_SECRET);

}