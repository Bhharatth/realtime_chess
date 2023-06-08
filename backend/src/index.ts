import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { Request, Response } from 'express';
import authRoute from "./routes/auth";
import { Server } from "socket.io";
// import sockets from "./sockets/routes";
import { Socket } from "socket.io";
import { initializeSocketServer } from "./socket/server";





const app = express();
app.use(express.json())

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);


const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
  initializeSocketServer(io);

// let chessBoard: (null | any)[][] = [];
// for (let i = 0; i < 8; i++) {
//     let row: (null | any)[]=[];
//     for(let j = 0; j < 8; j++){
//         row.push(i,j)
//     }
//     chessBoard.push(row)

// };

// app.get("/", (req: express.Request, res: express.Response)=> {
//     res.json(chessBoard);a
// });

 let chessBoard: (null | any)[][] = [];
const rows:number = 8;
const colums: number = 9;

for(let i = 1 ; i<= rows; i++){
    const row: (null | any)[] = [];

    for(let j =1; j<colums;j++){
        row.push(`${i},${j}`);
    }
    chessBoard.push(row);
}


app.get("/", (req: express.Request, res: express.Response)=> {
    res.json(chessBoard);
});



io.on("connection", (socket: Socket) => {
    // Handle the "join-room" event
    socket.on("join-room", ({ roomId }: { roomId: string }) => {
      socket.join(roomId);
      // Additional logic for handling room joining
    });
  
    // Handle the "send-message" event
    socket.on("send-message", ({ message, roomId, user }: { message: string, roomId: string, user: string }) => {
      // Handle the received message
      console.log("Received message:", message);
  
      // Broadcast the message to all clients in the room
      io.to(roomId).emit("message-from-server", { message });
      // Additional logic for handling and broadcasting messages
    });
  
    // Add more event handlers for other events as needed
  
    // Handle the "disconnect" event
    socket.on("disconnect", () => {
      console.log("User disconnected");
      // Additional logic for handling disconnections
    });
  });
  


app.use("/api/auth", authRoute);








const MONGO_URL = "mongodb+srv://appu:appu123@cluster0.5c3rgox.mongodb.net/?retryWrites=true&w=majority"
server.listen(8080, () => {
    console.log('server running on http://localhost:8080/')
});


mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));