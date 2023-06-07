import MessageController from "./controllers/messageController"
import RoomController from "./controllers/roomController";
import { Socket } from "socket.io";

const sockets =  (socket: Socket) => {
    const messageController = new MessageController(socket);
    const roomController = new RoomController(socket);

    socket.on("send-message", messageController.sendMessage);
    socket.on("join-room", roomController.joinRoom);
    socket.on("new-room-created", roomController.newRoomCreated);

    socket.on("endCall", () => {
        socket.broadcast.emit("call ended");
    });

    socket.on("disconnect", () => {
        console.log('userLeft');
    });

}

export default sockets;
