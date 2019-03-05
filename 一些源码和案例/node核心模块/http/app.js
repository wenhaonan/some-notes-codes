//浏览器信任的服务器
const http = require("http")
const fs = require("fs")
const options = {
  host: "localhost",
  port: "3001",
  method: "get",
  path: "/"
}
function fn(response) {
  let requestObj = http.request(options, res => {
    let data = {}
    res.setEncoding("utf8")
    //响应体
    res.on("data", chunk => {
      data = chunk
    })
    //监听结束
    res.on("end", () => {
      response.end(data)
    })
  })
  requestObj.on("error", err => {
    if (err) throw err
    console.log(err)
  })
  requestObj.write("")
  requestObj.end()
}

const server = http.createServer((req, res) => {
  //允许跨域 * 代表所有
  res.setHeader("Access-Control-Allow-Origin", "*")
  fn(res)
})
server.listen(3000, () => {
  console.log("服务器启动成功,监听在3000端口")
})
