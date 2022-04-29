import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

io.on("connect", socket => {
    socket.emit("me", socket.id);

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", ({ to, signal }) => {
        io.to(to).emit("callAccepted", signal);
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("Listening to PORT : " + PORT));
