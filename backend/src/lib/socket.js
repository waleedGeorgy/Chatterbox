import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const onlineUsers = {};

export const getReceiverSocketID = (userID) => {
  return onlineUsers[userID];
};

io.on("connection", (socket) => {
  const userID = socket.handshake.query.userID;
  if (userID) onlineUsers[userID] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    delete onlineUsers[userID];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { app, server, io };
