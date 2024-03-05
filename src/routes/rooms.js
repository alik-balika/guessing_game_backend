import express from "express";
const router = express.Router();
import { Room } from "../models/room.js";
import { Player } from "../models/player.js";

console.log(__dirname); // Print the current working directory
console.log(path.join(__dirname, "../models/room.js")); // Check the constructed path

// GET room by room name
router.get("/:name", async (req, res) => {
  try {
    const room = await Room.findOne({ name: req.params.name });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a Room
router.post("/", async (req, res) => {
  const room = new Room({
    name: req.body.name,
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET players by room id
router.get("/:roomId/players", async (req, res) => {
  const { roomId } = req.params;

  console.log(roomId);

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const players = await Player.find({ roomId });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
