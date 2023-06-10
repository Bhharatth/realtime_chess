import React, { useEffect, useRef, useState } from "react";
import "./chessboard.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Socket } from "socket.io-client";
import PlayerList from "./playerList/PlayerList";

const io = require("socket.io-client");

const Chessboard = () => {
  const socket = useRef<Socket | undefined>();
  const [spot, setSpot] = useState(null);

  const user = useSelector((state: RootState) => state.user);
  const selectedUser = useSelector((state: RootState) => state.selectedPlayer);
  console.log(selectedUser);
  const userId = user.currentUser ? user.currentUser._id : null;

  const chessboardArray = [
    ["1,1", "1,2", "1,3", "1,4", "1,5", "1,6", "1,7", "1,8"],
    ["2,1", "2,2", "2,3", "2,4", "2,5", "2,6", "2,7", "2,8"],
    ["3,1", "3,2", "3,3", "3,4", "3,5", "3,6", "3,7", "3,8"],
    ["4,1", "4,2", "4,3", "4,4", "4,5", "4,6", "4,7", "4,8"],
    ["5,1", "5,2", "5,3", "5,4", "5,5", "5,6", "5,7", "5,8"],
    ["6,1", "6,2", "6,3", "6,4", "6,5", "6,6", "6,7", "6,8"],
    ["7,1", "7,2", "7,3", "7,4", "7,5", "7,6", "7,7", "7,8"],
    ["8,1", "8,2", "8,3", "8,4", "8,5", "8,6", "8,7", "8,8"],
  ];

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  //sending users to socket server
  //geting users and socketId from server

  useEffect(() => {
    socket.current?.emit("add_user", userId);
    socket.current?.on("getUsers", (data: object) => {
      console.log(data);
    });
  }, [user]);

  //geting users from socket client
  useEffect(() => {}, []);

  function handleClick(rowIndex: number, cellIndex: number) {
    console.log(`${rowIndex},${cellIndex}`);
  }

  return (
    <div className="chessboard">
      <PlayerList/>
      {chessboardArray.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              className="cell"
              key={cellIndex}
              onClick={() => handleClick(rowIndex, cellIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
