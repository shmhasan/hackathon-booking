import { Request, Response, NextFunction } from "express";
import { AuthService } from "../auth/service";

export const AuthMiddleware = {
    isAuthenticated: (request: Request, response: Response, next: NextFunction)=> {
        try {
            AuthService.validateAuthToken(request.headers.authorization);
            next();
        } catch (error) {
            response.status(403).json({message: "You are not an authenticated user"})
        }
        
    }
}