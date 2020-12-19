import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../../bookings/entities/Booking";
import { Customer } from "../../customers/entities/Customer";

@Entity({
    name: "payments"
})
export class Payment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: Number;

    @ManyToOne(()=> Booking)
    booking: Booking;

    @ManyToOne(()=> Customer)
    customer: Customer;

    @Column({type: "double precision", nullable: false})
    amount: Number;

    @Column({type: "datetime", name: "paid_at"})
    date: Date;
}