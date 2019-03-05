**获取cookie**

let allCookies = document.cookie;

为一个字符串,包含所有cookie,形式为key=value; key=value

**设置cookie**

document.cookie = "user=wenhaonan;expires=" + new Date(Date.now() + 1000 * 60 * ...)//过期时间

每一条语句都是另外设置,除非key名一样,才进行覆盖

```
    //设置cookie
    const setCookie = (obj, timer = 0) => {
      //时间以小时为单位
      const time = new Date(Date.now() + timer * 1000 * 60 * 60).toUTCString()
      for (let key in obj) {
        document.cookie = `${key}=${obj[key]};expires=${time}`
      }
    }

    //删除cookie
    const deleCookie = attr => {
      let obj = {
      }
      obj[attr] = ''
      setCookie(obj, -1)
    }
    
    //获取cookie
    const getCookie = attr => {
      const arr = document.cookie.match(new RegExp('\\b' + attr + "=([^;]+)(;|$)"))
      //console.log(arr[1])
      return arr ? arr[1] : '无匹配字段'
    }


```