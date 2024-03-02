import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import roomsRouter from "./routes/rooms.js";

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

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
