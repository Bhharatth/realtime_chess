import { Server, Socket } from "socket.io";

interface User {
  userId: string;
  socketId: string;
  // room?: string;
}

let users: User[] = [];




  //add user to a room
  const addUserToRoom = (userId: string, socketId: string) => {
    if (!(users.some((user) => user.userId === userId))) {
      users.push({ userId, socketId });
    };
  };

  //remove user from a room
  const removeUserFromRoom = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  //get users
  const getUserById = (userId: string): User | undefined => {
    return users.find((user) => user.userId === userId);
  };

  //when connect
 // Initialize the Socket.IO server and handle events
export function initializeSocketServer(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Handle "add_user" event
    socket.on("add_user", (userId: string) => {
      addUserToRoom(userId, socket.id);
      io.emit("getUsers", users);
    });

    io.emit("welcome","helloo")

    // Handle "send-message" event
    socket.on("send-message", ({ senderId, receiverId, text }) => {
      const receiver = getUserById(receiverId);
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