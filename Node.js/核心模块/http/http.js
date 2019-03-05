const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
  // res.write("欢迎光临")
  // //调用无数次
  // res.write("1欢迎光临")
  // res.write("1欢迎光临")
  // //调用一次 字符串或buffer
  // res.end(".")
  //res.end(req.method)

  // if (req.method === "GET") {
  //   res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  //   switch (req.url) {
  //     case "/":
  //       res.write("<h1>index</h1><a href='http://localhost:3000/home'>home页面</a><br><a href='http://localhost:3000/search'>搜索页面</a>")
  //       break;
  //     case "/home":
  //       res.write("<h1>home</h1><a href='http://localhost:3000'>返回主页</a>")
  //       break;
  //     case "/user":
  //       res.write("<h1>haonan</h1><a href='http://localhost:3000'>返回主页</a><br><a href='http://localhost:3000/home'>home页面</a>")
  //       break;
  //     case "/search":
  //       fs.readFile("./BlackSearch.html", 'utf8', (err, data) => {
  //         if (err) throw err
  //         res.write(data)
  //         res.end()
  //       })
  //       fs.createReadStream("../Black Search/BlackSearch.html").pipe(res)
  //       break;
  //     default:
  //       res.write("<h1>404 Not Found</h1>")
  //       break;
  //   }
  // }
})
server.listen(3000)
