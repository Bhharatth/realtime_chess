import mongoose from "mongoose";

const conversatonSchema = new mongoose.Schema({
    members: {
        type: Array
    }
}, { timestamps: true });

 const Conversaions = mongoose.model("Conversations", conversatonSchema);
export default Conversaions;