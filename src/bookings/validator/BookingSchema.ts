import { Schema } from "express-validator";

export const BookingSchema:Schema = {
    room_number: {
        notEmpty: {
            errorMessage: "room_number is a mandatory field"
        }
    },
    customer_id: {
        notEmpty: {
            errorMessage: "customer_id can not be null"
        },
        isInt: true
    },
    arrival: {
        notEmpty: {
            errorMessage: "arrival is a mandatory field"
        }
    },
    checkout: {
        optional: true
    },
    booking_type: {
        notEmpty: true
    }
}