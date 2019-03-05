**Object.is( )**

ES6提供检测两个值是否相等的函数
```
NaN === NaN ?  -> false
Object.is(NaN, NaN) -> true
```
---

**JSON (JavaScript Object Notation, JS 对象表示法)**

对象格式的字符串

特点
```
- 无序
- 有具体的标识, 可以快速的取到值
- 保留数据,用于后期获取数据,传递数据
- 不能使用单引号 ' '
- 属性名可以不用声明,可以不加引号,但值必须声明

```

声明形式: 字面量声明 / 直接量声明 
```
let obj = {   
    a : 1     //键值对形式
}
//JSON格式的对象
```
in 操作符,用于判断对象内是否存在某属性

```
console.log("a" in obj)  -> true
 
```
迭代方法
```
for ( var key in obj){    // key : 键名 / 属性名
     console.log(obj[key])
}
```
对象的复制
```
let obj2 = JSON.parse(JSON.stringify(obj1))
console.log(obj2)
//不能复制函数
```
删除对象属性
```
delete obj.name 
//还可以用来删除未声明使用的变量(泄漏,var声明的不可以删除)
a = 2
delete a

```

**JSON.stringify()**

JSON格式对象的序列化 - 对象转字符串
```
let obj1 = JSON.stringify(obj)
console.log(typeof obj1)  -> string
console.log(obj1)  -> "{"a":1}"
```
**JSON.parse()**

JSON格式对象的反序列化 - 字符串转对象

```
let obj2 = JSON.stringify(obj1)
console.log(obj2)  ->  {a: 1}
```
---

**解构赋值**

ES6 允许按照一定模式,从数组和对象中提取值,对变量进行赋值,这被称为解构

传统赋值方法
```
数组
let arr = [1, 2, 3]
let a = arr[0]
let b = arr[1]
let c = arr[2]

对象
let obj = {
    aa: 1,
    bb: 2,
    cc: 3
}
let a = obj.aa
let b = obj.bb
let c = obj.cc
```
解构赋值
```
数组
let arr = [1, 2, 3]  //理解为一种模式
let [a, b, c] = arr
//因为数组是有序的 
对象
let obj = {
    aa: 1,
    bb: 2,
    cc: 3
}
let {aa: a, bb: b, cc: c} = obj
//对象无序

当变量和模式一样的时候, let {a: a, b: b, c: c} = obj
可以简写成let {a, b, c} = obj

多重数组的解构赋值
let arr = [1, 2, [3]]
let [a, b, [c]] = arr //保持结构一样

```
举例

```
传统获取PI的方式:
const PI = Math.PI
//要先加载Math,再从庞大的对象中找到PI,无疑性能底下

用了解构赋值之后
const {PI} = Math

```
```
接收函数返回值
function fn(){
    return [1, 2, 3, 4]
}
let [a, b, c] = fn() //左边少:不完全解构
```
---

**扩展运算符**

展开数组
```
let arr = [1, 2, 3]
console.log(...arr) 
```
复制数组
```
let arr = [1, 2, 3]
let arr1 = [...arr]
```
类数组转换数组
```
let box = document.getElementsByClassName("box")
let arr = [...box]
 更简单的方法
 let box = [...document.getElementsByClassName("box")] //box直接就是一个数组了
```

---

**值类型和引用类型**

**值类型:** 字符串, 数值, null, undefined, boolean, symbol

- 占用空间固定,保存在栈中,每个方法都会建立自己的内存栈,这个方法定义的变量都会逐个放入栈内存中,随着方法的执行结束,这个方法的内存栈也会被销毁.因此,所有在方法中定义的变量都放在栈内存中的;栈中存储的是值类型变量和对象的引用变量(基础变量的值存在栈中,引用变量在栈中存储的是指向堆中的数组或对象的地址)
- 保存于复制的是值本身
- 基本类型数据都是值类型
- 使用typeof 检测数据类型

**引用类型:** 对象 => 函数,数组,实例对象

- 占用空间不固定,保存在堆中,不会随着方法的结束而销毁,只有当这个对象没有任何引用变量指向它时,系统的垃圾回收机制才会在核实的时候回收它(解决方案是使用完成后,将对象指针指向null)
- 保存与复制的是 指向对象的一个指针
- 使用 instanceof 检测数据的类型(对象是否在原型链上)

值类型比较值和数据类型,引用类型比较地址