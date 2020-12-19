import { Request, Response, Router } from "express";
import {body, validationResult, checkSchema} from "express-validator";
import { Logger } from "../../config/Logger";
import { isAuthenticated } from "../../middlewares";
import { Room } from "../entities/Room";
import { RoomService } from "../service";
import {RoomSchema, RoomUpdateSchema} from "../validators/schema";
export const RoomRouter = Router();

/**
 * gets all the rooms in a hotel
 * rooms can be found by their types, price and locked status
 */
RoomRouter.get("/:room_id?",async (request: Request, response: Response)=> {

    let status = 200;
    const responseDTO = {
        data: [],
        message: ""
    };

    if(request.params.room_id) {
        try {
            const room = await RoomService.findByRoomId(request.params.room_id);
            if(room) {
                responseDTO.data.push(room);
            }else {
                status = 204;
            }       
            
        } catch (error) {
            status = 204;
            responseDTO.message = error.message;
        }
    }else {
        try {
            const rooms = await RoomService.findAll({});
            if(rooms.length) {
                responseDTO.data = rooms;
            }else {
                status = 204;
            }
            
        } catch (error) {
            status = 204;
            responseDTO.message = error.message;
        }
    }

    response.status(status).json(responseDTO);

    

});

/**
 * creates a room object
 * 
 */
RoomRouter.post("/",checkSchema(RoomSchema),async (request: Request, response: Response)=> {
    const errors = validationResult(request);
    if(errors.isEmpty()) {
        const room = new Room();
        const body = request.body;
        room.room_number = body.room_number;
        room.price = body.price;
        room.locked = body.locked;
        room.room_type = body.room_type;
        room.max_persons = body.max_persons;

        let status = 201;
        const responseDTO = {
            data: null,
            message: ""
        };

        try {
            responseDTO.data = await room.save();
            
        } catch (error) {
            responseDTO.message = error.message;
            status = 400;
        }

    
        response.status(status).json(responseDTO);
    }else {
        response.status(400).json({message: "Invalid payload", errors: errors});
    }
    
});



/**
 * Updates a room object
 * 
 */
RoomRouter.put("/",checkSchema(RoomUpdateSchema),async (request: Request, response: Response)=> {
    const errors = validationResult(request);
    if(errors.isEmpty()) {

        const body = request.body;

        Logger.info("MHLOG:: Room update payload"+ JSON.stringify(body) );

        const room = await Room.findOne({where: {id: body.id}})

        room.room_number = body.room_number;
        room.price = body.price;
        room.locked = body.locked;
        room.room_type = body.room_type;
        room.max_persons = body.max_persons;

        let status = 200;
        const responseDTO = {
            data: null,
            message: ""
        };

        try {
            responseDTO.data = await room.save();
            
        } catch (error) {
            responseDTO.message = error.message;
            status = 400;
        }

    
        response.status(status).json(responseDTO);
    }else {
        response.status(400).json({message: "Invalid payload", errors: errors});
    }
    
});


