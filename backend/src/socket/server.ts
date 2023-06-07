const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);

io.on("connection", ({socket}:{socket: any}) => {
    // Listen for the "join-room" event
    socket.on("join-room", ({ roomId}:{roomId: string}) => {
      socket.join(roomId);
    });
  
    // Listen for the "send-message" event
    socket.on("send-message", ({ message, roomId, user }:{message:string, roomId: string, user: string}) => {
      // Handle the received message
      console.log("Received message:", message);
  
      // Broadcast the message to all clients in the room
      io.to(roomId).emit("message-from-server", { message });
    });
  });
  
  // Start the server
  httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
  });