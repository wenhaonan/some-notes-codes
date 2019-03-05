```
//写兼容并不是判断浏览器版本,而是看原型上有没有该方法,从根本上兼容
if(!Function.prototype.bind){  
    Function.prototype.bind = function (oThis){
        //接收obj
        var toBind = oThis;
        //接收参数 
        var arr = Array.prototype.slice.call(arguments,1) //修改slice的this指向arguments 
        //识别调用此函数的fn
        var that = this
        //返回一个函数
        var returnBind = function (){
            console.log("这是手写的兼容")
            that.apply(toBind,arr)
        }
      return returnBind  
  }   
}

var obj = {
    a : 1
}
function fn(){
    console.log(this)
}

fn.bind(obj)()

```
