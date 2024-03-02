import express from "express";
const router = express.Router();
import { Room } from "../models/room.js";
import res from "express/lib/response.js";

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
  console.log(req.body);
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

export default router;
