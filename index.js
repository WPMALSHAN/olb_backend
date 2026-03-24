import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


dotenv.config();
const app = express();

/* =============================
   CREATE HTTP SERVER
============================= */

const server = http.createServer(app);

/* =============================
   SOCKET.IO SETUP
============================= */

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* =============================
   MIDDLEWARE
============================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

/* =============================
   DATABASE
============================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

/* =============================
   ROUTES
============================= */





/* =============================
   START SERVER
============================= */

server.listen(7000, () => {
  console.log("Server running on port 7000");
});