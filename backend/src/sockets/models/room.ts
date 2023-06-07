import mongoose from "mongoose";
const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
    player1: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    player2: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    roomId: {
        type: String, 
        required: true,
    },
    chats: {
        type: Array,
    },
});

export const Room = mongoose.model("Room", RoomSchema);
export default Room;
