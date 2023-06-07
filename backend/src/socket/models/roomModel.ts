const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  chats: {
    type: Array,
    default: [],
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
