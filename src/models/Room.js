import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  //   id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, unique: true },
});

const Room = mongoose.model("Room", roomSchema);

export { Room };
