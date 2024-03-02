import express from "express";
const router = express.Router();
import { Player } from "../models/Player.js";
import { Room } from "../models/room.js";

// GET player by player id
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a Player
router.post("/", async (req, res) => {
  const { roomId, name, input } = req.body;

  if (
    !roomId ||
    !name ||
    !input ||
    roomId.trim() === "" ||
    name.trim() === "" ||
    input.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required and cannot be empty" });
  }
  try {
    const roomExists = await Room.exists({ _id: roomId });
    if (!roomExists) {
      return res.status(404).json({ message: "Room does not exist" });
    }

    const player = await Player.findOneAndUpdate(
      { roomId, name },
      { input },
      { new: true, upsert: true }
    );

    const statusCode = player.isNew ? 201 : 200;
    res.status(statusCode).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
