# notes and codes
我的一些学习笔记和一些代码


### bind兼容 
```
if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        //接收obj
        var toBind = oThis;
        //接收参数 
        var arr = Array.prototype.slice.call(arguments, 1) //修改slice的this指向arguments 
        //识别调用此函数的fn
        var that = this
        //返回一个函数
        var returnBind = function () {
          console.log("这是手写的兼容")
          that.apply(toBind, arr)
        }
        return returnBind
      }
    }
    var obj = {
      a: 1
    }
    function fn() {
      console.log(this)
    }
    fn.bind(obj)()
```

### 自己实现的call
```
Function.prototype.call = function (context) {
      context = context || window
      context.fn = this
      const args = [...arguments].slice(1)
      const result = context.fn(...args)
      delete context.fn
      return result
    }

    let obj = {
      a: 1
    }

    function f(a) {
      console.log(this.a)
    }

    f.call(obj,1)
```
### es5 继承写法

```
 function Person1(obj) {
      this.name = obj.name
      this.age = obj.age
    }

    Person1.prototype = {
      constructor: Person1,
      say() {
        console.log(this.name)
      }
    }

    let p1 = new Person1({ name: 'wen', age: 18 })

    function Person2(obj) {
      Person1.call(this, obj)
      this.sex = obj.sex
    }
    //子类的原型 = 父类的原型
    //直接交出地址，子类修改印象父类
    //Person2.prototype = Person1.prototype

    //子类的原型 = 父类的实例
    //子类改变原型不会印象父类，但是子类会包含父类的私有属性，值为undefined
    //Person2.prototype = new Person({})



    //中间商
    //干干净净的方法
    function Person3() {

    }
    Person3.prototype = Person1.prototype
    Person2.prototype = new Person3()
    Person2.prototype.say = function () {
      console.log("1")
    }
    let p2 = new Person2({ name: "haonan", age: 20, sex: 'male' })
    p2.say()
    p1.say()
```

### es6 继承写法

```
class Person{
    constructor(name){
    	this.name = name
	}
	sayname(){console.log(this.name)}
}

// extends 继承 内部已经继承完毕  私有公有一把抓
class Person2 extends Person{
	constructor(name,age){ 
        // age 是扩展的私有属性 必须传参进来 之前的参数 也不能省略
        // 使用super 给name和age this 不写子类就没有this
        // super是一个指针 指向离自己最近的父类
		super(name,age) //必备
		this.age = age 
	}
    //原来的共用方法 已然继承
    //公共 扩展的 方法
	sayage(){console.log(this.age)}
}

let p2 = new Person2("朱雀","18")
console.log(p2)
p2.sayname()  //能使用私有属性  也可以使用公有方法 
```

### 对象的深浅拷贝
```
const obj = {
      a: 1,
      b: [1, 2, {}],
      c: function(){
        alert(1)
      }
    }

    //deep是深浅参数,true是深层拷贝,false是浅层拷贝
    function extend(obj, deep = true) {
      var newObj = {}
      //判断obj的类型,数组或是对象
      if (obj instanceof Array) {  //如果是数组
        newObj = []
      }
      //遍历obj,用for...in 虽然性能低,但是唯一可以用的方法
      for (var key in obj) {
        var value = obj[key]  //先把值给取出来,在判断拷贝方式和值类型,再决定

        //如果是浅拷贝,就不用考虑值类型,是深层拷贝再看是引用还是什么
        //!! 强制改变为布尔类型
        newObj[key] = (!!deep && typeof value === "object" && value !== null) ? extend(value, true) : value

      }

      return newObj

    }

    let obj1 = extend(obj,null)
    obj1.b[0] = 2
    console.log(obj)
    console.log(obj1)
```

### 滚轮事件兼容
```
function scrollWheel(dom, cb, bool) {
      //默认事件类型为主流
      var type = "mousewheel"
      //火狐浏览器时
      if (dom.onmousewheel === undefined) {
        type = "DOMMouseScroll"
      }
      //真正的事件函数
      function fn(e) {
        e = e || window.event
        //是否阻止默认事件
        if (!!bool) {
          e.preventDefault() ? e.preventDefault() : e.returnValue = false
        }
        //统一滚轮方向和大小 
        let reg = /chrome\/(\d+\.\d+)/i
        if (reg.test(navigator.userAgent)) {
          e.wheelDetail = e.wheelDelta / 150
        } else {
          e.wheelDetail = e.wheelDelta / 120 || e.detail / -3
        }
        //执行回调函数,并修改this指向  window -> 事件对象 传参数e
        cb.call(this, e)
      }
      //是否IE浏览器
      if (dom.addEventListener) {
        dom.addEventListener(type, fn)
      } else {
        //IE的事件监听api
        dom.attachEvent("on" + type, fn)
      }
    }

    scrollWheel(document, function (e) {
      console.log(e.wheelDetail)
      //console.log(this)
    }, true)
```

### 闭包递归阶乘
```
    let input = document.getElementsByTagName("input")[0]
    let btn = document.getElementsByTagName("button")[0]
    let result = document.getElementsByClassName("result")[0]
    btn.onclick = function () {
      let num = input.value.trim()
      let reg = /^\d+$/
      if (reg.test(num)) {
        if (num == 0) {
          result.innerHTML = "0没有阶乘"
        }
        else {
          result.innerHTML = jiecheng(num * 1)
        }
      } else {
        result.innerHTML = "只能输入数字"
      }
    }
    function factorial() {
      var obj = {
      }
      return function f(num) {
        if (!num) return
        let arr = `${num}!`
        if (obj[arr]) {
          //如果缓存里有,直接输出
          return obj[arr]
        } else if (num === 1) {
          //num最小值1,返回1
          return 1
        } else {
          //num * num - 1 直到 1
          obj[arr] = num * f(num - 1)
          return obj[arr]
        }
      }
    }

    const jiecheng = factorial()
```

### 时间运动框架
```
    //获取样式函数兼容
    function getStyle(ele) {
      return ele.currentStyle || getComputedStyle(ele)
    }
    //requestAnimationFrame兼容
    window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
      return setTimeout(fn, 1000 / 60);
    }

    //运动框架
    function animation(ele, obj, time, cb) {
      //就留4种方式
      const Tween = {
        linear: {
          easeIn: function (t, b, c, d) {
            return c * t / d + b;
          }
        },
        quad: {
          easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
          },
          easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
          },
          easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
          }
        },
        cubic: {
          easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
          },
          easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
          },
          easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
          }
        },
        back: {
          easeIn: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
          },
          easeOut: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
          },
          easeInOut: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
          }
        }
      }
      //ease方式
      const ease = ["easeIn", "easeOut", "easeInOut"]
      //初始时间
      let startTime = new Date()
      //初始所有样式
      let allStyle = getStyle(ele)
      //目标样式
      let data = obj.data
      //目标初始样式
      let startValue = {}
      //变化量
      let changValue = {}
      //添加初始以及变化量
      for (let key in data) {
        let value = parseFloat(allStyle[key])
        //非NaN
        startValue[key] = (value / 1) ? value : 0
        changValue[key] = parseFloat(data[key]) - startValue[key]
      }

      //获取运动方式, 没有传就默认匀速
      //默认方式
      let de_t = { method: "linear", ease: 0 }
      //没传默认
      let tween = obj.tween || de_t
      //传了判断有没有值,有一个没有就默认,管你呢 ,0也是false,加个判断
      tween = tween.method ? (tween.ease == 0 || tween.ease) ? tween : de_t : de_t
      let tweenM = tween.method.toLowerCase()
      let tweenE = tween.ease
      //ease大小判断
      if (tweenM === "linear") {
        tweenE = 0
      } else {
        //方式有没有对
        tweenM = (tweenM == 'linear' || tweenM == 'quad' || tweenM == 'cubic' || tweenM == 'back') ? tweenM : 'linear'
        //非linear时,不是0, 1, 2就默认0  上边有可能改变为linear,所以还要判断是不是linear
        tweenE = (tweenM != 'linear' && tweenE <= 2 && tweenE >= 0) ? tweenE : 0
      }
      console.log(tweenM)
      run()
      //运动函数
      function run() {
        let nowTime = new Date()
        //时间差
        let changeTime = nowTime - startTime
        //时间差和总时间比值
        let a = changeTime / time
        //给属性
        for (let key in data) {
          //计算属性
          /*
          * t: current time（变化时间）；
          * b: beginning value（属性初始值）；
          * c: change in value（属性变化量）；
          * d: duration（持续时间 总时间）。
          */
          let val = (a >= 1) ? parseFloat(data[key]) : Tween[tweenM][ease[tweenE]](changeTime, startValue[key], changValue[key], time)
          if (key.toLowerCase() === "opacity") ele.style[key] = val
          ele.style[key] = val + "px"
        }
        if (a >= 1) {
          cb && cb()
        } else {
          requestAnimationFrame(run)
        }
      }
    }
```
