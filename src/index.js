import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import roomsRouter from "./routes/rooms.js";
import playersRouter from "./routes/players.js";

mongoose.connect(process.env.MONGO_CONNECTION_STRING);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req, res) => {
  res.json({ message: "Hello from express endpoint!" });
});

app.use("/api/rooms", roomsRouter);
app.use("/api/players", playersRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", (data) => {
    console.log(data);
    socket.broadcast.emit("playerJoined" + data.roomName, data);
    // socket.join(data.roomId);
    // socket.to(data.roomId).emit("playerJoined", data.playerId);
  });
});

server.listen(7000, () => {
  console.log("server running on localhost:7000");
});
