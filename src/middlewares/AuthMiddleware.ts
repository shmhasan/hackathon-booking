import { Request, Response, NextFunction } from "express";

export const AuthMiddleware = {
    isAuthenticated: (request: Request, response: Response, next: NextFunction)=> {
        next();
    }
}