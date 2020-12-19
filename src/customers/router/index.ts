import { Response, Router , Request} from "express";
import { Customer } from "../entities/Customer";
import * as _ from "underscore";
import { Logger } from "../../config/Logger";
import { checkSchema, param, validationResult } from "express-validator";
import { CustomerSchema,CustomerUpdateSchema } from "../validators/CustomerSchema";

export const CustomerRouter = Router();


/**
 * Get all customers or by an id
 */
CustomerRouter.get("/:customer_id?", async (request: Request, response: Response)=> {

    const responseDTO = {
        data: [],
        message: ""
    };
    let status = 204;

    try {
        
        if(_.has(request.params, "customer_id") && request.params.customer_id) {
            const customer = await Customer.findOne({where: {id: request.params.customer_id}});
            if(customer) {
                responseDTO.data.push(customer);
                status = 200;
            }
        }else {
            Logger.info("Fetching customer data");
            const customers = await Customer.find({});
            if(customers.length ) {
                responseDTO.data = customers;
                status = 200;
            }
            
        }
        
    } catch (error) {
        status = 204;
        responseDTO.message = error.message;
    }

    response.status(status).json(responseDTO);

});


CustomerRouter.post("/", checkSchema(CustomerSchema), async (request:Request, response:Response) => {
    const errors = validationResult(request);
    const responseDTO = {
        data: [],
        message: ""
    };
    let status = 201;

    if(errors.isEmpty()) {
        const payload = request.body;
        const customer = new Customer();
        customer.email = payload.email;
        customer.first_name =payload.first_name;
        customer.last_name = payload.last_name;
        customer.phone = payload.phone;
        customer.registered_at = new Date()

        try {
            await customer.save();
            responseDTO.data.push(customer);
            status = 201;
        } catch (error) {
            status = 400;
            responseDTO.message = error.message;
        }

        response.status(status).json(responseDTO);

    }else {
        response.status(400).json({
            errors
        });
    }
});



CustomerRouter.put("/", checkSchema(CustomerUpdateSchema), async (request:Request, response:Response) => {
    const errors = validationResult(request);
    const responseDTO = {
        data: [],
        message: ""
    };
    let status = 201;

    if(errors.isEmpty()) {
        
        const payload = request.body;

        const customer = await Customer.findOne({where: {id: request.body.id}});

        if(customer) {
            customer.email = payload.email;
            customer.first_name =payload.first_name;
            customer.last_name = payload.last_name;
            customer.phone = payload.phone;
            customer.registered_at = new Date()
    
            try {
                await customer.save();
                responseDTO.data.push(customer);
                status = 201;
            } catch (error) {
                status = 400;
                responseDTO.message = error.message;
            }
        }else {
            responseDTO.message = "Could not find Customer";
            status = 404;
        }
    
        

        response.status(status).json(responseDTO);

    }else {
        response.status(400).json({
            errors
        });
    }
});



CustomerRouter.delete("/:customer_id", [param("customer_id", "Customer ID must a number")], async (request:Request, response:Response) => {
    const errors = validationResult(request);
    const responseDTO = {
        data: [],
        message: ""
    };
    let status = 404;

    if(errors.isEmpty()) {
        
        const payload = request.params.customer_id;

        const customer = await Customer.findOne({where: {id: request.params.customer_id}});

        if(customer) {
            await customer.remove();
            status = 200;
            responseDTO.message = "Successfully deleted";
        }else {
            responseDTO.message = "Could not find Customer";
            status = 404;
        }
    
        

        response.status(status).json(responseDTO);

    }else {
        
        response.status(400).json({
            errors
        });
    }
});