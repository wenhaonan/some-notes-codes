```
    let xhr = new XMLHttpRequest();

    //GET 方法
    btn.onclick = function () {
      let str = `?user=${user.value}&pwd=${pwd.value}`
      xhr.open("GET", "http://localhost:3001/" + str)
      xhr.send()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            let data = JSON.parse(xhr.responseText)
            alert(data.msg)
          }
        }
      }
    }

    // POST 方法
    btn1.onclick = function () {
      let str = `user=${user.value}&pwd=${pwd.value}`
      xhr.open("POST", "http://localhost:3001/", true)
      xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")
      xhr.send(`user=${user.value}&pwd=${pwd.value}`)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            let data = JSON.parse(xhr.responseText)
            alert(data.msg)
          }
        }
      }
    }
```