const exprees = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = exprees();

app.use(cors());
app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ["http://www.pri-chat.com", "http://pri-chat.com", "http://localhost:3000"],
    },
})

app.get("/", (req, res) => {
    res.send("Home");
})

/**
 * { roomId: string, chatOwner: string, participants: array }
 */
let rooms = [];

httpServer.listen(PORT, () => {

    io.on("connection", socket => {

        const roomId = socket.id + "61"; //I know bad way :(

        socket.on("createRoom", chatOwner => {
            rooms.push({
                roomId: roomId,
                chatOwner: chatOwner,
                participants: [{ id: socket.id, name: chatOwner }]
            })

            socket.join(roomId);
            socket.emit("roomCreated", ({ roomId, userId: socket.id }));

            onDisconnect();
        })

        socket.on("joinRoom", ({ roomId, username }) => {

            let roomIndex = rooms.findIndex(x => x.roomId == roomId)

            if (roomIndex == -1) {
                socket.emit("roomNotFound")
                return;
            }

            const userId = socket.id;

            rooms[roomIndex].participants.push({ id: userId, name: username })

            io.to(roomId).emit("newParticipant", { name: username, id: userId });

            socket.join(roomId);

            socket.emit("joinedRoom", { room: rooms[roomIndex], id: userId });

            onDisconnect();
        })

        socket.on("sendMessage", ({ message, from, roomId }) => {
            socket.broadcast.to(roomId).emit("newMessage", ({ message, from }))
        })

        function onDisconnect() {

            socket.on("disconnect", () => {

                const roomIndex = rooms.findIndex(r => r.participants.findIndex(p => p.id == socket.id) != -1);

                const roomId = rooms[roomIndex].roomId;

                rooms[roomIndex].participants = rooms[roomIndex].participants.filter(p => p.id != socket.id);

                socket.leave(roomId);

                io.to(roomId).emit("disconnected", socket.id);

                // if there is no socket, close room
                if (!rooms[roomIndex].participants.length) {
                    rooms = rooms.filter(r => r.roomId != roomId);
                }
            });
        }
    })
})