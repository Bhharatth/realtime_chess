import { Socket } from 'socket.io';
import BaseController from './baseController';
import Room from 'sockets/models/room';

export default class MessageController extends BaseController {
    sendMessage = async({message,room,user }:{message: string; room: string; user: string})=> {

        const foundRoom = await Room.findOne({roomId:room});

        const chatMessages = {
            messages: message,
            user: user,
        };

        if(foundRoom){
            foundRoom.chats.push(chatMessages);
        }

        await foundRoom.save();

        let skt = this.socket.broadcast;
        skt = room ? skt.to(room) : skt;
        skt.emit("message-from-server", {message});
        
    }

}