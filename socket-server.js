var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io")(server);

var Port = process.env.Port || 300

io.on("connection", client =>{
    console.log("Client Connected"+client.id);
    client.emit("Acknowledge", {message:"You are connected"});
    client.on("msgToServer", (chatterName,msg)=>{
        console.log(chatterName +" says :" +msg);
        client.broadcast.emit("ServerMsg",chatterName, msg)
        client.emit("ServerMsg","Me", msg)
    })
})

app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

server.listen(3000, ()=>{
    console.log("Socket Server running on Port "+Port);
})
