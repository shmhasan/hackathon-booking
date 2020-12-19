import { Request, Response, NextFunction } from "express";
import { AuthService } from "../auth/service";
import { Logger } from "../config/Logger";

export const AuthMiddleware = {
    isAuthenticated: async (request: Request, response: Response, next: NextFunction)=> {
        try {
            const tokenString = request.headers.authorization;
            if(tokenString) {
                const token = tokenString.split(" ")[1];
                Logger.info("MHLOG:: Validation token "+ JSON.stringify(token));
                if(token) {
                    try {
                        await AuthService.validateAuthToken(token);
                        next();
                    } catch (error) {
                        response.status(403).json({message: "Auth token is not valid"});
                    }
                   
                }else {
                    response.status(403).json({message: "Missing Token.Please Authorize"});
                }
            }else {
                response.status(403).json({message: "Missing Token.Please Authorize"})
            }

            
        } catch (error) {
            response.status(403).json({message: "You are not an authenticated user"});
        }
        
    }
}