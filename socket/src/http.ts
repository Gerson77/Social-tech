import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const serverHTTP = http.createServer(app);

const io = new Server(serverHTTP, {
  cors: {
    origin: "http://192.168.0.9:5173",
    methods: ["GET", "POST"],
  },
});

export { io, serverHTTP };
