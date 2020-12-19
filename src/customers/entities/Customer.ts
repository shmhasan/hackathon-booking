import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "customers"
})
export class Customer extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({length: 15, type: "varchar"})
    first_name: String;
    
    @Column({length: 15, type: "varchar"})
    last_name: String;
    
    @Column({length: 50, nullable: false, type: "varchar"})
    email: String;
    
    @Column({nullable: false, length: 15, unique: true, type: "varchar"})
    phone: String;

    @Column({type: "date", default: () => "CURRENT_TIMESTAMP"})
    registered_at: Date;
}