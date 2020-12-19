import { FindManyOptions } from "typeorm";
import { Room } from "../entities/Room";

export const RoomService = {
    async findByRoomId(room_number: string): Promise<Room> {
        return Room.findOne({where: {room_number: room_number}});
    },
    async findAll(params?: FindManyOptions):Promise<any> {
        return Room.find(params);
    }
};