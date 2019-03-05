功能是用cookie实现记录上次登陆时间
```
  const setCookie = (obj, timer = 0) => {
      //时间以小时为单位
      const time = new Date(Date.now() + timer * 1000 * 60 * 60 * 24 * 365).toUTCString()
      for (let key in obj) {
        document.cookie = `${key}=${obj[key]};expires=${time}`
      }
    }
    //获取cookie
    const getCookie = attr => {
      const arr = document.cookie.match(new RegExp('\\b' + attr + "=([^;]+)(;|$)"))
      //console.log(arr[1])
      return arr ? arr[1] : ''
    }
    //删除cookie
    const deleCookie = attr => {
      let obj = {
      }
      obj[attr] = ''
      setCookie(obj, -1)
    }

    let lastTime = getCookie("lastTime")
    let time = new Date().toLocaleString()

    if (lastTime) {
      //不是第一次
      lasttime.innerHTML = "上次登陆时间: " + lastTime
    } else {
      //第一次登陆 
      lasttime.innerHTML = '欢迎你,你是第一次登陆!'
    }
    nowtime.innerHTML = "本次登陆时间: " + time

    setInterval(() => {
      time = new Date().toLocaleString()
      nowtime.innerHTML = "本次登陆时间: " + time
    }, 1000);

    setCookie({
      lastTime: time
    }, 10)
```