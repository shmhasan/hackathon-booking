import { AuthUser } from "../entities/AuthUser";
import { Logger } from "../../config/Logger";
import { AuthDTO, TokenDTO } from "../entities/types";
import {GenerateToken, ValidateToken} from "./TokenService";

export const AuthService = {
    /**
     *
     * @param username 
     * @param password 
     */
    async createAuth(username: String, password: String): Promise<AuthUser> {
        
        return new Promise(async (resolve, reject)=> {
            try {
                const count = await AuthUser.count({where: {username: username}});
                Logger.info("MHLOG:: existing user count"+ JSON.stringify(count));
                if(count === 0) {
                    const authUser = new AuthUser();
                    authUser.setUsername(username);
                    authUser.setPassword(password);
                    await authUser.save();
                    resolve(authUser);
                }else {
                    reject(new Error("User already exists"));
                }
                   
    
            } catch (error) {
                reject(new Error(error.message));
            }
        });
        
    },
    async generateAuthToken(payload:AuthDTO): Promise<TokenDTO> {
        
        return new Promise(async (resolve, reject)=> {
            try {
                const user = await AuthUser.findOne({where: {username: payload.username}});
                if(user) {
                    const isValidPassword = user.isPasswordValid(payload.password);
                    if(isValidPassword) {
                        const token:TokenDTO = await GenerateToken({
                            username: user.username,
                            id: user.getId()
                        });
                        resolve(token);
                    }
                }
            } catch (error) {
                
            }
        });
    },
    async validateAuthToken(token: String): Promise<any> {
        return new Promise((resolve, reject)=> {
            try {
                const valid = ValidateToken({token: token});
                resolve(valid);
            } catch (error) {
                reject(error.message);
            }
        });
    }
}