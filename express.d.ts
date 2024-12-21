import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                Email: string;
                Name: string;
            };
        }
    }
}