import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  input: { type: String, required: true },
});

const Player = mongoose.model("Player", playerSchema);

export { Player };
