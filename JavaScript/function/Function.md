### 函数声明
    只有 function fn(){} 才叫函数声明，会在 js 编译期声明，其他的都是函数表达式，在编译期不会被声明
    例如 let a = function fn(){}
         return function fn(){}
---

### 函数作用域

作用域在什么地方不是看函数在哪里执行，而是看函数在哪里定义的

```
let a = 3; 

function fn1(){
    alert(a)
}

function fn2(){
    let a = 2;
    fn1()
}

fn2()  -> 3
```

当函数初始化时, 如果函数参数有默认值, 那么函数的圆括号会产生一个临时的作用域, 在初始化结束后, 销毁
```

function (a = 1, b = a) {
    console.log(b)         -> 1
}
```

---

### 关键字

#### this

fn() 函数自执行时，函数不依赖任何对象，这种情况this全部指向 顶层对象 window
```           
fn();
```

其他情况this 指向函数依赖的对象

```
document.onclick = fn
box.onclick = fn
let obj ={
    a:fn 
}
this 都指向依赖的对象
```
#### arguments
```
arguments : 不定参  属于 类数组，没有数组的方法 //ES5 之前的产物
            只有 arguments[0]
                 arguments.length
```
#### name, length 
```
- name 返回函数名 
- length 返回形参个数,但是不包括以下两种
        - 带有默认值的参数
        - rest参数

```
---

### 箭头函数   *ES6*
#### 语法
```
//下边两种写法含义是相同的
let add = function(n){
    return n+1
}

let add1 = (n) => n+2; // => 后边是 return 的内容，如何 {} 里还有其他语句的时候，就不能这么写了
                       //没有参数: ()里的内容可以省略，直接() => {}
                       //只有一个参数: ()可以省略 ，直接 n => {}
                       //多个参数: (a, n, b) => {}
```
```
//如果想加入其他语句
let add = function(n){
    let n = n * 5
    return n+1
}

let add1 = (n) => {
    let n = n * 5
    return n+1  
};   //直接用 {} 正常些逻辑
     //return 也必须写

```
#### this 
箭头函数里的this是固化的,或者说箭头函数压根没有this,所以在箭头函数里使用this, 是默认外层的, 外层也是箭头函数就再往外找, 直到找到顶层对象

#### arguments
    ES6没有arguments
```
        let a = () => {
            console.log(arguments)
        }

        a(1,2,3)   //arguments is not defined

        let b = function   (){
           console.log(arguments)
        }
        b(1,2,1)  // Arguments(3)[1, 2, 1, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
    
#### rest参数 - 剩余参数

可以接收全部的剩余参数, 格式 (...a)

```
function fn(a,...b){
    console.log(a)      // -> [1]
    console.log(b)      // -> [2, 3, 4]    
}
fn(1,2,3,4)

//值得注意的写法问题
- 必须写在 ( ) 中最后的位置  // (...a, b) 这样是会报错

```

    
    
    
    
    
    

---
### 严格模式
```
//开启方法
"use strict"

ES2016规定,只要函数参数使用了默认值,解构赋值,扩展运算符,那么函数内部就不能显示的设定为严格模式,否则会报错

严格模式下,函数内部不能使用this指向顶层对象,会指向undefined





```
---