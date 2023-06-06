import MessageController from "./controllers/messageController"
import RoomController from "./controllers/roomController";

const sockets = ({ socket }: { socket: any }) => {
    const messageController = new MessageController(socket);
    const roomController = new RoomController(socket);

    socket.on("send-message", messageController.sendMessage);
    socket.on("join-room", roomController.joinRoom);
    socket.on("new-room-created", roomController.newRoomCreated);

    socket.on("endCall", () => {
        socket.broadcast.emit("callended");
    });

    socket.on("disconnect", () => {
        console.log('userLeft');
    });

}

export default sockets;
