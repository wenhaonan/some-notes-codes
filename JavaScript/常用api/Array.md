### Array
- length属性,长度,可以通过length改变数据 (arr.length = 0 清空数组)
**Array.isArray()**

判断对象是不是数组

**concat()**

- 拼接数组,并返回一个新的数组,不改变原数组
- 可以有拼接多个数组
```
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```
**join()**

将数组的元素拼接成一个字符串,并返回这个字符串,不改变
```
let a = [0,1,2,3,4]
a.join() => "0,1,2,3,4"  //不传参数
a.join("") => "01234"  //参数为""
a.join("a") => "0a1a2a3a4" //这种情况每两个之间添加一个参数

```
**sort( ) **

对数组进行排序,不产生新数组(改变原数组)
``` 
let arr = [1, 2, 5, 50, 3, 20]
arr.sort((a, b) => a-b)  //从小到大 升序
arr.sort((a, b) => b-a)  //从大到小 降序
```
**fill()**

用一个固定值填充数组 Array.fill(value, start, end) 不包括end
```
var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]

```
**forEach()**

- 对数组的每一个值执行一次提供的函数
- 修改原数组
```
```
**indexOf()**

返回数组中给定元素值的第一个索引值,否则返回-1
```
```
**lastIndexOf()**

- 返回数组中给定元素值得最后一个索引值,否则返回-1
- 方法从后向前查找,从fromIndex开始
```
```
**push()**

将一个或者多个元素添加到数组的末尾,并且返回改数组的新长度
```
```
**reverse()**

将数组元素反转,改变原数组
```
```
**shift()**

删除数组的第一个元素,并返回改元素的值,改变原数组
```
```
**unshift()**

一个或者多个元素值添加到数组的开头,并返回数组的新长度
```
```
**slice()**

截取,返回一个新数组,[begin,end)
```
```
**splice()**

- 填充数组
- splice(start, deleteCount, item1,item2..) 
- 从start开始,删除deleteCount个元素,并添加item1,item2..
- deleteCount为 0 则不删除,只添加
```
```
**filter()**

创建一个新的数组,其中是通过制定函数测试的值
```
let arr = [0, 1, 2, 3, 4, 5, 6]
let arr1 = arr.filter(i => i > 3)

=> [4, 5, 6]
```
**find()**

- 返回数组中满足测试函数的第一个元素的值,否则返回Undefined
- 接收一个回调函数,有三个参数: 1:数组项 2:序号 3:原数组
```
```
**findIndex()**

- 返回满足测试函数的第一个元素的下标
- 参数和find()相同


**every()**

检测数组的内容是否通过指定函数的检测
```
var array1 = [1, 30, 39, 29, 10, 13];
array1.every(function (n){
    return n >= 10
})
// expected output: false
```
**some()**

检测数组中是否有一个或者多个元素同过指定函数的检测,空数组返回false
```
```
**map()**

- 不修改原数组,返回一个新数组
- 结果是数组中每个元素都调用一次提供的函数后的值
```
```
**reduce()**

- 第一个参数:回调函数,接收四个参数(total, value, index, arr)
- 第二个参数total初始值

统计字符串出现次数
```
let str = "abcabcabcabc"
str.split("").reduce((a, b) => (a[b] ? a[b]++ : a[b] = 1,a), {})
{a: 4, b: 4, c: 4}
```