import React, { useEffect, useState } from "react";
import "./playerList.css";
import { publicRequest } from "../../redux/publicRequest";
import { useDispatch } from "react-redux";
import { setSelectedPlayers } from "../../redux/selectedPlayerSlice";

const PlayerList = () => {
  const dispatch = useDispatch();

  const [playerList, setPlayerList] = useState([]);

  interface ApiResponse {
    data: [];
  }

  interface Player {
    _id: string;
    username: string;
  }

  useEffect(() => {
    const allPlayers = async () => {
      const res: ApiResponse = await publicRequest.get("users/getAllUsers");
      setPlayerList(res.data);
    };
    allPlayers();
  }, []);


  const handleUserClick = (player: Player) => {
    
    dispatch(setSelectedPlayers(player));
  };

  return (
    <div className="players_data">
      <span className="title">PLAYERS:</span>
      {playerList.map((player: Player) => (
        <div
          className="players"
          key={player._id}
          onClick={() => handleUserClick(player)}
        >
          <span className="name">{player.username}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
