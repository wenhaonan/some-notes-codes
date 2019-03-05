//真正返回数据的服务器
const http = require("http")

http.createServer((req, res) => {
  let date = new Date().toLocaleString()
  let obj = {
    date
  }
  res.write(JSON.stringify(obj))
  res.end()
}).listen(3001)