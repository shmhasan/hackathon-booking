import { Request, Response, Router } from "express";
import { AuthService } from "../service";

export const AuthRouter = Router();
import {body, validationResult } from "express-validator";
import { Logger } from "../../config/Logger";

/**
 * Internal user creation
 */
AuthRouter.post("/", async (request: Request, response: Response) => {
    Logger.info("Auth payload"+ JSON.stringify(request.body));
    try {
        const user = await AuthService.createAuth(request.body.username,request.body.password);
        response.json(user);
    } catch (error) {
        response.status(400).json({message: error.message});
    }
});

/**
 * Create authentication token
 */
AuthRouter.post("/authenticate", [
    body("username").notEmpty().isLength({min: 4, max: 10}),
    body("password").notEmpty()
    .isStrongPassword({minLength: 6})
] ,async (request: Request, response: Response) => {
    const errors = validationResult(request);
    Logger.info("Auth payload"+ JSON.stringify(request.body));
    if(errors.isEmpty()) {
        const body = request.body;
        try {
            const token = await AuthService.generateAuthToken(body);
            response.status(200).json(token);
        } catch (error) {
            response.status(400).json({message: error.message});
        }
    } else {
        response.status(400).json(errors);
    }
    
});

AuthRouter.get("/validate",async (request: Request, response: Response) => {
    const errors = validationResult(request);
    Logger.info("Auth payload"+ request.headers.authorization);
    try {
        const result = await AuthService.validateAuthToken(request.headers.authorization);
        response.json(result);
    } catch (error) {
        response.status(403).json({message:error.message})
    }

});