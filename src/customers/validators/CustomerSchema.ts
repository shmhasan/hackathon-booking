import { Schema } from "express-validator";
import * as _ from "underscore";

export const CustomerSchema:Schema = {
    first_name: {
        isAlpha: true,
        isLength: {
            options: {
                min: 2,
                max: 15
            }
        },

    },
    last_name: {
        isAlpha: true,
        isLength: {
            options: {
                min: 2,
                max: 15
            }
        },
        
    },
    email: {
        isEmail: {
            errorMessage: "Valid email address should be provided "
        }
    },
    phone: {
        isMobilePhone: true,
        notEmpty: true
    }
}

export const CustomerUpdateSchema:Schema = _.extend({
    id: {
        notEmpty: {
            errorMessage: "id field can not be null"
        },
        isInt: {
            errorMessage: "id field should a numeric value"
        }
    }
}, CustomerSchema)