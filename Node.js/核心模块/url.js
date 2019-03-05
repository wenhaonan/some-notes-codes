const { URL } = require("url")
const url = require("url")
const qs = require("querystring")
const myUrl = new URL("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0")

const a = qs.parse(myUrl.search.slice(1))
console.log(a)