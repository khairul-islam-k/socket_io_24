require('dotenv').config()
const express = require("express");
const app = express();
const http = require("http");
const path = require("path")
const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer, {
  cors: {
    origin: "*", // 🔥 সব origin allow (তুমি চাইলে নির্দিষ্ট origin দিতে পারো)
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("chat", (data) => {

    io.emit("chat_transfer", data);

  })
})


app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  res.send("sock server hello world");
})

expressServer.listen(port, () => {
  console.log(`Example app listening on port${port}`)
})