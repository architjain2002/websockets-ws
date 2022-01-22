const http = require("http");
const fs = require("fs");
const express = require("express");
app = express();
const server = http.createServer(app);
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });
app.get("/chat", (req, res) => {
  console.log("testmess");
  wss.once("connection", function Connection(ws) {
    console.log("New ws connection established!");

    ws.on("close", () => {
      console.log("client disconnected");
    });
  });
  res.render("test1");
});

const port = 2000;
const hostname = "127.0.0.1";

server.listen(port, hostname, () => {
  console.log(`server listening at http://${hostname}:${port}/chat`);
});
