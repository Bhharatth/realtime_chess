import { Server, Socket } from "socket.io";

interface User {
  userId: string;
  socketId: string;
  room?: string;
}

let users: User[] = [];


const randomRoomNumber = (): string => {
  return Math.floor(Math.random() * 1000).toString();
}


  //add user to a room
  const addUserToRoom = (userId: string, socketId: string, room: string) => {
    if (!(users.some((user) => user.userId === userId))) {
      users.push({ userId, socketId, room });
    };
  };

  //remove user from a room
  const removeUserFromRoom = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  //get users
  const getUsersInRoom = (room: string) => {
    return  users.filter((user) => user.room === room);
  }


  //when connect
 // Initialize the Socket.IO server and handle events
export function initializeSocketServer(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Handle "add_user" event
    socket.on("add_user", (userId: string) => {
      const roomNumber = randomRoomNumber();
      addUserToRoom(userId, socket.id, roomNumber);
      io.emit("getUsers", users);
      socket.emit("roomNumber", roomNumber);
    });

    io.emit("welcome","helloo")

    // Handle "send-message" event
    socket.on("send-message", ({ senderId, receiverId, text }) => {
      const receiver = getUsersInRoom("room1").find((user:User)=> user.userId === receiverId);
      if (receiver && receiver.socketId) {
        io.to(receiver.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    });

    // Handle "disconnect" event
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      removeUserFromRoom(socket.id);
    });
  });
}