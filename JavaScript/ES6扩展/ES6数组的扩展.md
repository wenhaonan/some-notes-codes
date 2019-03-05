**扩展运算符**
```
```
---

**Array.from()**

类数组转为数组
```
当对象具有 Iterator 接口时,可以使用扩展运算符转换
```
**Array.of()**

将一组数值转换为数组  解决了当数组传一个参数的时候 new Array(10) 为长度的问题
```
```
---

**find() 、 findIndex()**

find()
```
返回数组中满足提供的测试函数的第一个元素的值
```
findIndex()
```
返回数组中满足提供的测试函数的第一个元素的下标值
```

---

**fill(value, start, end)**
```
从start开始,不包括end,填充value
```
---

**for ... of**

ES6引入 ,在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
```
let arr = ["a", "b", "c", "d"]
for(var idx in arr){
    console.log(idx)   => 0, 1, 2, 3
}  // for ... in 是所有遍历中性能最差的,因为会向上查找原型

for(var idx of arr){
    console.log(idx)   => a, b, c, d
}

for(var idx in "1231321"){
    console.log(idx)   => 1, 2, 3 ...
}


```
---

**数组实例的 entries() 、 keys() 、values()**

 keys() 是对键值得遍历,values() 是对值得遍历, entries() 是对键值对的遍历
 ```
 ```
 ---
 
**数组实例的includes()**

与字符串类似, 不同是的他能识别NaN
 ```
 [1, 2, NaN].includes(NaN) //true
 ```
 
**数组的空位**

- ES6的方法都不会忽略数组空位,会将空位处理为undefined
- 数组的空位表示数组的某一位置没有任何值
- 空位不是undefined,一个位置的值等于undefined