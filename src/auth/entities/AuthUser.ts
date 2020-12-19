import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PasswordUtils } from "../utils";

@Entity({
    name: "auth_users"
})
export class AuthUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    private id: Number;

    @Column({name: "username", length: 15, nullable: false, unique: true, update: false})
    public username: String;

    @Column({name: "password", length: 255, nullable: false})
    private password: String;

    public setUsername(username: String) {
        this.username = username;
    }

    public setPassword(password) {
        this.password = password;
    }

    public getId() {
        return this.id;
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    private encryptPassword() {
        (async ()=>{
            this.password = await PasswordUtils.encryptPassword(this.password);
        })();
    }

    public isPasswordValid(plain_text: String):Promise<Boolean> {
        
        return new Promise((resolve, reject)=> {
            PasswordUtils.compareHash(plain_text, this.password.toString());
        });
    }

}