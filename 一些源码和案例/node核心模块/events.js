const MyEmitter = require("events").EventEmitter;
const myEmitter = new MyEmitter()

myEmitter.on("haonan", () => {
  console.log("haonan事件触发了", this)
})

myEmitter.emit("haonan")