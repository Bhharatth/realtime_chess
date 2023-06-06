import Room from "sockets/models/room";
import BaseController from "./baseController";


export default class RoomController extends BaseController {
    newRoomCreated = async ({ player1, player2 }:{ player1:any, player2:any }) => {
        const roomId = "12345-random id"
        const roomFound = await Room.find({ 
            $and: [{ player1: player1 }, { player2: player2 }]
         });
         if(roomFound.length===0){
            const room = new Room({
                player1,
                player2,
                roomId: roomId,
            })
            await room.save();
            this.socket.emit("new-room-created-server", {roomId})
         }else{
            this.socket.emit("new-room-created-server",roomFound[0].roomId)
         }
    }

    joinRoom = ({room}: {room: {roomId: string}})=> {
        this.socket.join(room.roomId);
        this.socket.broadcast.emit("new-room-created");
    };

}