import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { Request, Response } from 'express';


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

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






server.listen(8080, () => {
    console.log('server running on http://localhost:8080/')
});

const MONGO_URL = "mongodb+srv://appu:appu123@cluster0.5c3rgox.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));