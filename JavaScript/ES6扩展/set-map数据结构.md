### `Set`和`Map`数据结构
#### Set 
#### 基本用法
ES6提供了新的数据结构`Set`. 它类似于数组,但是成员的值是惟一的,没有重复的值.
Set本身是一个构造函数,用来生成Set数据结构.
```
const s = new Set()
[1, 1, 2, 2, 3, 3].forEach(x => s.add(x))

console.log(s)  // Set(3){1, 2, 3} 

//通过add方法向Set结构加入成员,结果表明Set结构不会添加重复的值
```
Set函数可以接受一个数组作为参数,用来初始化,并且也不会添加重复的值
```
const arr = new Set([1,2,3,3])   //Set(3){1, 2, 3} 

[...arr]     ///[1, 2, 3]
```
#### 对数组去重 
```
[...new Set(array)]
//区别NaN, 也就是说只能存一个NaN
```
#### Set实例的属性和方法
##### Set结构的实例有以下属性:
- Set.prototype.constructor : 构造函数.默认就是Set函数
- Set.prototype.size:返回Set实例的成员总数

##### Set结构的实例有以下方法
- Set.prototype.add(value) :在Set对象尾部添加一个元素,返回该Set对象。
- Set.prototype.clear():移除Set对象内的所有元素.
- Set.prototype.delete(value):移除Set的中与这个值相等的元素
- Set.prototype.has(value):返回一个布尔值，表示该值在Set中存在与否。
- Set.prototype.entries():返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组。为了使这个方法和Map对象保持相似， 每个值的键和值相等。//SetIterator{1, 2, 3}


#### WeakSet
与Set的区别
- WeakSet 对象中只能存放对象引用, 不能存放值, 而 Set 对象都可以.
- WeakSet 对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 正因为这样, WeakSet 对象是无法被枚举的, 没有办法拿到它包含的所有元素.(没有size属性)


#### Map
#### 基本用法

- Map 对象保存键值对
- es5普通的对象的属性名就是字符串任何值，Map 键名允许是对象（对象或者原始值都可以）

**大多数用法**

- 接收参数传入可迭代对象，通常是二维数组

```
   let obj = {
        name :"雀雀"
    }
    let arr = [1,2]
    let m1 = new Map([[arr,2],[3,4]])

    m1.forEach((value)=>{
        console.log(value);
    })


```


```
let myMap = new Map()
var keyObj = {},
    keyFunc = function () {},
    keyString = "a string";
 
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");
 //Map(3){"a string" => "和键'a string'关联的值", {…} => "和键keyObj关联的值", ƒ => "和键keyFunc关联的值"}
```
