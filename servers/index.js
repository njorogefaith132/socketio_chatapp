const express = require("express");
const cors = require("cors")
const http = require("http")
const app = express()
const {Server} = require("socket.io");
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors :{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})


io.on("connection" , (socket) =>{
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);

      socket.on("send_message" , (data) =>{
        //   socket.io(data.room).emit("receive_message", data);
        console.log(data);
      })
})
})

server.listen(5000, () => {
    console.log("Server is running on port", 5000);
  });
