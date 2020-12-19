import { json } from "body-parser";
import { Request, Response, Router } from "express";
import { checkSchema, param, validationResult } from "express-validator";
import { Logger } from "../../config/Logger";
import { Customer } from "../../customers/entities/Customer";
import { Payment } from "../../payment/entities/Payment";
import { Room } from "../../rooms/entities/Room";
import { Booking } from "../entities/Booking";
import { BookingSchema } from "../validator/BookingSchema";
import * as _ from "underscore";

export const BookingRouter = Router();

/**
 * Get all booking or a single booking object
 */
BookingRouter.get("/:id?", async (request: Request, response: Response) => {
    const responseDTO = {
        data: [],
        message: ""
    };
    let status = 200;
    
    try {
        if(request.params.id) {
            /**
             * fetch customer and room information on individual booking information
             */
            const booking = await Booking.findOne({where: {id: request.params.id} , relations: ["customer", "room"]});
            if(booking) {
                responseDTO.data.push(booking);
                status = 200;
            }else {
                status = 404;
            }
        }else {
            const bookings = await Booking.find({});
            if(bookings.length) {
                responseDTO.data = bookings;
                status = 200;
            }else {
                status = 204;
            }
        }
    } catch (error) {
        responseDTO.message = error.message;
        Logger.info("Exception "+error.message);
    }

    response.status(status).json(responseDTO);
});

BookingRouter.post("/", checkSchema(BookingSchema), async (request: Request, response: Response) => {
    const responseDTO = {
        data: [],
        message: ""
    };
    let status = 200;
    const errors = validationResult(request);
    if(errors.isEmpty()) {
        /**
         * Store data
         */
        const payload = request.body;
        const room = await Room.findOne({where: {room_number: payload.room_number}});

        if(room && room.locked === "N") {
            
            const customer = await Customer.findOne({where: {id: payload.customer_id}});

            const booking = new Booking();
            
            booking.customer = customer;
            booking.room = room;
            booking.arrival = payload.arrival;
            booking.checkout = new Date(payload.checkout);
            booking.booked_at = new Date();
            booking.booking_type = payload.booking_type;

            booking.payment = room.price;

            booking.payment_status = "PENDING";
    
            try {

                //set room is locked
                room.locked = "Y";
                await room.save();

                await booking.save();
                responseDTO.data.push(payload);


                status = 200;
            } catch (error) {
                status = 400;
                responseDTO.message = error.message;
                Logger.info("Exception "+error.message);
            }
        }else {
            status = 400;
            responseDTO.message = "This room is not available";
        }

        

        response.status(status).json(responseDTO);
    }else {
        response.status(400).json({errors});
    }
});

/**
 * Checkout a customer
 * This endpoint will be responsible for checkout out a customer
 * 
 * {
 *   booking_id
 * }
 */
BookingRouter.post("/:id/checkout", [param("id", "ID is missing")],
async (request: Request, response: Response)=> {

    const errors = validationResult(request);
    const responseDTO = {
        message: ""
    };
    let status = 200;
    if(errors.isEmpty()) {
        try {
            console.log("REQUEST", request.params);
            const booking = await Booking.findOne({where: {id: request.params.id}, relations: ["room", "customer"]});
            
            if(!booking) {
                responseDTO.message = "No bookings were found"; 
                status = 404;
            }else if(booking && booking.payment_status === "DONE") {

                if(isNaN(Date.parse(booking.checkout.toString()))) {
                    const room = await Room.findOne({where: {id: booking.room.id}});
                    room.locked = "N";
                    await room.save();
                    Logger.info("Checkout out ");
                    booking.checkout = new Date();
                    await booking.save();
                    responseDTO.message = "Successfully checkout"; 
                }else {
                    responseDTO.message = "Already checked out"; 
                }
                
            }else {
                status = 200;
                responseDTO.message = "Payment is not yet completed"; 
            }
        } catch (error) {
           status = 400;
           Logger.info("Exception "+error.message);
           responseDTO.message = error.message; 
        }  

        response.status(status).json(responseDTO);
    }else {
        response.status(400).json({message: "Data validation"});
    }
});


/**
 * Checkout a customer
 * This endpoint will be responsible for checkout out a customer
 * 
 * {
 *   booking_id
 * }
 */
BookingRouter.post("/:id/payment", [param("id", "ID is missing")],async (request: Request, response: Response)=> {
    const errors = validationResult(request);
    const responseDTO = {
        message: ""
    };
    let status = 200;
    const body = request.body;
    if(errors.isEmpty()) {
        try {
            const booking = await Booking.findOne({where: {id: request.params.id}, relations: ["customer", "room"]});
            
            /**
             * Check if payment is pending or partially done and proceed accordingly
             */
            let payment_added = 0;
            if(booking && ["PARTIAL", "PENDING", "P"].indexOf(booking.payment_status.toString()) > -1) {
               
                const payment = new Payment();
                payment.amount = body.amount;
                payment.customer = booking.customer;
                payment.booking = booking;
                payment.date = new Date();
                await payment.save();
                payment_added = 1;
            }else {
                responseDTO.message = "Failed to process a payment";
            }

            /**
             * Calculate booking payment status and update booking payment status
             */

            if(payment_added === 1) {
                const payments = await Payment.find({where: {booking: booking}});
                if(payments.length) {
                    const paymentDone = payments.map((item)=> Number(item.amount)).reduce((total, current)=> {
                        return total+current;
                    }, 0);

                    if(paymentDone >= booking.payment ) {
                        booking.payment_status = "DONE";
                        responseDTO.message = "Payment competed";
                    }else if(paymentDone === 0) {
                        booking.payment_status = "PENDING";
                        responseDTO.message = "Payment Not done";
                    }else {
                        booking.payment_status = "PARTIAL";
                        responseDTO.message = "Payment partially done";
                    }

                    await booking.save();
                }
            }


        } catch (error) {
           status = 400;
           responseDTO.message = error.message; 
           Logger.info("Exception "+error.message);
        }  

        response.status(status).json(responseDTO);
    }else {
        response.status(400).json({message: "Data validation"});
    }
});