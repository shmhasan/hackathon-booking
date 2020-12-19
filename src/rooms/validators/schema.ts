import { Schema } from "express-validator";
import * as _ from "underscore";

export const RoomSchema:Schema = {

    room_number: {
        isLength: {
            errorMessage: "Room number should of at least one character long",
            options: {min: 1, max: 10},
        },
        notEmpty: {
            errorMessage: "room_number field can not be empty"
        }
    },
    price: {
        notEmpty: {
            errorMessage: "price parameter should be included",
        },
        isFloat: true
    },
    max_persons: {
        notEmpty: {
            errorMessage: "max_persons parameter should be included",
        },
        isInt: true
    },
    room_type: {
        notEmpty: {
            errorMessage: "room_type parameter should be included",
        },
    }
}

export const RoomUpdateSchema:Schema = _.extend({
    id: {
        notEmpty: {
            errorMessage: "Can not update without an id",
        }
    }
}, RoomSchema)