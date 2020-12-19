import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "rooms"
})
export class Room extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({name: "room_number", unique: true, nullable: false, length: 10})
    room_number: String;

    @Column({default: 0.0, nullable: false})
    price: Number;

    @Column({name: "locked_status", default: "N", nullable: true})
    locked: String;

    @Column({default: 1})
    max_persons: Number;

    @Column({length: 30})
    room_type: String;
}