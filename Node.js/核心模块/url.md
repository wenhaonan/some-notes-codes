**WHATWG的URL解析接口**

```
const { URL } = require("url")

const myUrl = new URL("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0")

console.log(myUrl)

=> 
URL {
  href:
   'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  origin: 'https://www.baidu.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/s',
  search:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  searchParams:
   URLSearchParams {
PS D:\Desktop\shiguangkey\node> node url
URL {
  href:
   'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  origin: 'https://www.baidu.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/s',
  search:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  searchParams:
   URLSearchParams {
  'ie' => 'utf-8',
  'f' => '8',
  'rsv_bp' => '1',
  'tn' => 'baidu',
  'wd' => '浩南',
  'oq' => '%E6%B5%A9%E5%8D%97',
  'rsv_pq' => 'e8f64c2a00006d70',
  'rsv_t' => 'a43991il0Z1t1S0/W09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc',
  'rqlang' => 'cn',
  'rsv_enter' => '0' },
  hash: '' }
```

**url.parse()**

```
const url = require("url")

console.log(url.parse("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0"))

=> 

URL {
  href:
   'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  origin: 'https://www.baidu.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/s',
  search:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  searchParams:
   URLSearchParams {
PS D:\Desktop\shiguangkey\node> node url
URL {
  href:
   'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  origin: 'https://www.baidu.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.baidu.com',
  hostname: 'www.baidu.com',
  port: '',
  pathname: '/s',
  search:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  searchParams:
PS D:\Desktop\shiguangkey\node> node url
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  query:
   'ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  pathname: null,
  path:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  href:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0' }
PS D:\Desktop\shiguangkey\node> node url
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search:
   '?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  query:
   'ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  pathname: '/s',
  path:
   '/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0',
  href:
   'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0' }
```

**url.resolve(from, to)**

- .com是一个根目录
- one/two不加 / 是替换
- one/two/ 加 / 是 接着
- .. 是返回上一层
```
const url = require('url');
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

**querystring.parse()**

- URL下的 URLSearchParams 是一个 Map格式的对象(键 => 值)
- 可以通过 querystring.parse() 方法

```

=>
const { URL } = require("url")

const qs = require("querystring")

const myUrl = new URL("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%B5%A9%E5%8D%97&oq=%25E6%25B5%25A9%25E5%258D%2597&rsv_pq=e8f64c2a00006d70&rsv_t=a43991il0Z1t1S0%2FW09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc&rqlang=cn&rsv_enter=0")

const a = qs.parse(myUrl.search.slice(1))
console.log(a)
[Object: null prototype] {
  ie: 'utf-8',
  f: '8',
  rsv_bp: '1',
  tn: 'baidu',
  wd: '浩南',
  oq: '%E6%B5%A9%E5%8D%97',
  rsv_pq: 'e8f64c2a00006d70',
  rsv_t:
   'a43991il0Z1t1S0/W09fEvyDWe6cM6Mb0zISvm32ND8cbyWxuQaW7FkVcmc',
  rqlang: 'cn',
  rsv_enter: '0' }
```

**querystring.stringify()**

```
querystring.stringify({key: "value", key1: ['value2', 'value3'], corge: ""})
// 返回 'key=value&key1=value2&key1=value3&corge='  

querystring.stringify({key: "value", key1: value2'}, ";", ":")
//返回 'key:value;key1:value2' 
//第二个参数是分隔符,第三个参数是 键值之间
//一般省略第二第三参数
``` 