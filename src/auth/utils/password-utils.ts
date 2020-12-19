import bcrypt from "bcrypt";

const SALT_ROUND = 10;

export default {
    encryptPassword(plain_text: String): Promise<String> {
        return new Promise<String>((resolve, reject)=> {
            try {
                const encrypted = bcrypt.hashSync(plain_text, SALT_ROUND);

                resolve(encrypted);
            } catch (error) {
                reject(error.message);
            }
        });
    },
    compareHash(plain_text:String, password_hash:string) {
        
        return new Promise((resolve, reject) => {
            try {
                bcrypt.compareSync(plain_text, password_hash);
                resolve(true);
            } catch (error) {
                reject(error.message);
            }
        });
    }
}