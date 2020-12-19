import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../../customers/entities/Customer";
import { Room } from "../../rooms/entities/Room";

@Entity({
    name: "bookings"
})
export class Booking extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: Number;

    @ManyToOne(()=> Room)
    room: Room;

    @ManyToOne(()=> Customer)
    customer: Customer;

    @Column({nullable: false, type: "datetime"})
    arrival: Date;

    @Column({nullable: true, type: "datetime"})
    checkout: Date;

    @Column({nullable: false, type: "datetime"})
    booked_at: Date;

    @Column({nullable: false, type: "varchar"})
    booking_type: String;

    @Column({default: 0.0, type: "double precision"})
    payment: Number;
    
    /**
     * payment status can be PENDING/PARTIAL/DONE
     */
    @Column({nullable: false, default: "PENDING", type: "varchar"})
    payment_status: String;

}