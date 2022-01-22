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
const wss = new WebSocket.Server({ port: 2000 });
app.get("/", (req, res) => {
  wss.once("connection", function onConnection(ws) {
    console.log("New ws connection established!");

    // ws.on("message", (data) => {
    //   console.log("client sends:" + data);

    //   ws.send(String(data).toUpperCase());
    // });

    ws.on("message", function incoming(data, isBinary) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          // console.log(data);
          client.send(data, { binary: isBinary });
          // client.send(JSON.stringify([data, name]), { binary: isBinary });
        }
      });
    });

    ws.on("close", () => {
      console.log("client disconnected");
    });
  });
  res.render("home");
});

const port = 2000;
const hostname = "127.0.0.1";

server.listen(port, hostname, () => {
  console.log(`server listening at http://${hostname}:${port}`);
});
