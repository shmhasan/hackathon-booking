import { TokenDTO } from "../entities/types";
import jwt from "jsonwebtoken";

const SUPER_SECRET_SALT = "LDOWMZask7&32398209S!";

export const GenerateToken = async (data: any):Promise<TokenDTO> => {
    return new Promise<TokenDTO>((resolve, reject)=> {
        try {
            const token = jwt.sign(data, SUPER_SECRET_SALT, {
                algorithm: "HS256",
                expiresIn: Math.floor(Date.now()/1000) + (60*60)
            });
            const response: TokenDTO = {
                token: token
            };

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export const ValidateToken = async (token: TokenDTO):Promise<any> => {

    return new Promise((resolve, reject)=> {
        try {
            const verified = jwt.verify(token.token.toString(), SUPER_SECRET_SALT);
            resolve(verified);
        } catch (error) {
            reject(error);
        }
    });
}