import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  player1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  player2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  roomId: {
    types: String,
    required: true,
  },
  chats: {
    type: Array,
  },
});


export const Room = mongoose.model("Room", roomSchema);
export default Room;

// import mongoose from "mongoose";

// const RoomSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
// });

// export const Room = mongoose.model("Room", RoomSchema);
// export default Room;
