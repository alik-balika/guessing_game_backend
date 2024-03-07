import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 60 },
});

roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

const Room = mongoose.model("Room", roomSchema);

export { Room };
