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
    quart: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    },
    quint: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    },
    sine: {
      easeIn: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOut: function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      }
    },
    expo: {
      easeIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    },
    circ: {
      easeIn: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    },
    elastic: {
      easeIn: function (t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
          s = p / 4;
          a = c;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOut: function (t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
      },
      easeInOut: function (t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (typeof p == "undefined") p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
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
    tweenM = (tweenM == 'linear' || tweenM == 'quad' || tweenM == 'cubic' || tweenM == 'back' || tweenM == 'elastic' || tweenM == 'circ' || tweenM == 'expo' || tweenM == 'sine' || tweenM == 'quint' || tweenM == 'quart') ? tweenM : 'linear'
    //非linear时,不是0, 1, 2就默认0  上边有可能改变为linear,所以还要判断是不是linear
    tweenE = (tweenM != 'linear' && tweenE <= 2 && tweenE >= 0) ? tweenE : 0
  }
  //console.log(tweenM)
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