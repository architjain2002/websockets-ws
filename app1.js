var fs = require("fs");
var rs = fs.appendFile("./demofile.txt", "hello world!", (err) => {
  if (err) throw err;
});
var event = require("events").EventEmitter;
const eventEmitter = new event();
eventEmitter.on("open", (rs) => {
  console.log("file is appended");
});

eventEmitter.emit("open");
