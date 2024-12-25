import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 24 * 60 * 60 },
});

const Room = mongoose.model("Room", roomSchema);

export { Room };
