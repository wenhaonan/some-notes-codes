### 传统的构造函数 / 类声明
```
function Person(name){
    this.name = name
    this.age = 20
}
Person.prototype = {           
    age: 10                     //可以有非函数的值
    say(){
        console.log(this.age)
    }
}
var v = new Person()  //用new创建
```
### new与普通调用的三点区别:
- 生成一个对象
- new执行的这一次,函数内部的this指向这个new创建的对象
- new执行的本次函数调用结束,默认返回这个new创建的对象

```
function fn(){
    
    this,name = arguments[0]
    
}

fn.prototype = {
    constructor: fn
}

new fn()
var obj = new fn()
//fn是构造函数
//fn.prototype = 类的原型 (是给实例提供的共有的属性)
//new fn() 类的实例化
//obj = new fn()  obj就是fn类的实例

//原型也是对象,也有构造函数

//obj.__proto__ == fn.prototype

 
```
