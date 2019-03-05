const fs = require("fs")

const read = fs.createReadStream('./1.txt');
const write = fs.createWriteStream("./2.txt");

read.pipe(write)

// read.setEncoding("utf8")

// read.on("data", data => {
//   console.log(data)
// })

// read.on("end", () => {
//   console.log("读取完成")
// })