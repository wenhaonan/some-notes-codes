## 获取时间
时间是一个对象,不是一个字符串,想要字符串 new Date().toString()
### 获取当前时间
```
let date = new Date()
```
### 获取当前年份
```
date.getFullYear()

date.getYear() //获取距离1900年的年数
```
### 获取当前月份(结果0-11,想要获取当前月份要+1) 
```
date.getMonth
```
### 获取当前日期
```
date.getDate()
```
### 获取当前星期(星期日是0)
```
date.getDay()
```
### 获取当前小时
```
date.getHours()
```
### 获取当前分钟
```
date.getMinutes()
```
### 获取当前秒钟
```
date.getSeconds()
```
### 获取毫秒值(当前时间距离1970年的毫秒值)
```
date.getTime()

H5新api
  console.log(Date.now()) 

  日期转毫秒
  Date.parse("Sat Jul 07 2018 20:00:00")

```
### 获取世界时
```
let date = new Date
let t_ = date.getTimezoneOffset() // 结果是 世界时-本地时间 = 单位是分钟

世界时的小时
date.getUTCHours()
世界时的分钟
date.getUTCMinutes() //理论上和本地分钟一样
```
### 获取人类易读的字符串形式的日期
```
date.toLocaleDateString()
"2018/12/30"
```
```
date.toLocaleTimeString()
"下午5:28:12"
```
---

## 设置时间
```
let date = new Date("Jul 8, 2018 20:30:00")

let date1 = new Date("2018-07-08T20:30:00") //如果不加小时,会自动加本时区的时间

let date2 = new Date(2018, 06, 08) //不会自动加小时 
                                   //月份是想添加的月份 - 1 
                                   //月份超过11会自动往后推
            new Date(2018) //就一个数字默认是毫秒值 结果是距离元年2018毫秒的时间
```

### 毫秒值转天数

```
let time = new Date().getTime()

dd = Math.floor(time / 1000 / 60 / 60 / 24)
hh = Math.floor(time / 1000 / 60 / 60) % 24
mm = Math.floor(time / 1000 / 60) % 60
ss = Math.floor(time / 1000) % 60
```