# call,apply,bind 的作用都是修改函数this指向
---

## call
调用一个函数,其具有指定的this指向和分别提供的参数(参数的列表)
```
let obj = {
    a : 1
}
function fn(a, b){
    console.log(a+b)
    console.log(this)
}

fn.call(obj,1,2)

函数调用call立即执行,参数从第2位依次展开
```
---

## apply
调用一个函数,其具有指定的this指向和一个数组提供的参数
```
let obj = {
    a = 1
}
function fn(a, b){
    console.log(a+b)
    console.log(this)
}

fn.apply(obj,[1,2])

函数调用apply立即执行,参数为数组形式
```
---

## bind
创建一个新函数,并在调用时指定函数的this指向和一个分别提供的参数列表
```
let obj = {
    a = 1
}
function fn(a, b){
    console.log(a+b)
    console.log(this)
}

fn.bind(obj,1,2)

函数调用bind并不会立即执行,需要调用,传参形式和call一样

fn.bind(obj,1,2)()

用在事件触发,定时器等情况下
```