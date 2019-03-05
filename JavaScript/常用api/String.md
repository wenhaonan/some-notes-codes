### String 

- 字符串方法是只读的,不会修改元字符串,全部返回新字符串
- 具备length属性

**charAt()**

获取指定位置的字符-串项 (参数: 索引)
```
let a = "abc"
a.charAt(1) => "b"
```
**charCodeAt()**

返回指定位置字符串项的Unicode编码 (参数: 索引)
```
let b = "ABC"
b.charCodeAt(1) => 66
```
**String.fromCharCode()**


字符串的静态方法: 返回unicode编码对应的字符 (参数: unicode编码)
```
String.fromCharCode(67) => "C"
```
**indexOf**

- 返回所传字符串的索引值(参数: 第一个字符串项 第二个(可选)从那个索引开始)  
- 从前往后找
- 找不到返回 -1
```
b.indexOf("A") => 0
b.indexOf("A", 1) => -1
```
**lastIndexOf()**

- 返回所传字符串索引(参数: 同indexOf())
- 从后往前找
- 找不到返回 -1
```
b.indexOf("A") => 0
b.indexOf("A", 1) => 0
```
**subString()**

- 截取字符串 (参数: 1.起始 2.结束(可以不传,默认从第一个参数到最后)  左闭右开)
- 会参数互换: 自动识别从小到大
```
b.subString(1, 2)  => "B"
b.subString(2, 1)  => "B"
```
**slice()**

和subString() 作用一样,不会进行参数互换
```
b.slice(1, 2)  => "B"
b.slice(2, 1)  => ""
```
**toLowerCase()** 

全部转为小写字母
```
b.toLowerCase() => "abc"
```
**toUpperCase()**

全部转为大写字母

**split()**

按照一定方式把字符串切割成数组

```
let a = "a b c"
a.split() => ["a b c"]  //不传参数直接变成数组
a.split("") => ["a", " ","b"," ","c"]  //""按空切
a.split(" ") => ["a", "b", "c"]  //" "按空格切
a.split("b") => ["a","c"] //"b" 按"b" 切
```
**trim()**

把字符串两端的空格去掉,中间多的空格不切 
```
let c = " a b c  "
let d = c.trim() => "a b c"
```
**match**

搭配正则来使用,检索字符串,找到的字符串返回一个数组,找不到返回null
```
let a = "abc123"
a.match(/d/) => null
a.match("d") => null //传字符串会自动生成一个正则来匹配
a.match(/\d/g) => ['1', '2', '3']
a.match(/\d+/g) => ["123"]
```
**search()**

- 同上,但是返回索引值
- 找不到返回 -1


**replace()**

搭配正则使用
```
let a = "abc123"
a.replace(/\d+/,"abc") => "abcabc"
```
**parseInt()**

- 传入一个字符串,过滤不是整数的部分,返回一个整数
- 从第一个数字开始到不是数字为止
- 不能以非数字,空格开始,否则返回NaN
- 第二个参数是进制, 按照所传进制解析第一个参数, 2-36之间


**parseFloat()**
 
- 和上边不同的是保留小数,返回一个整数或是小数

### ES6 String方法

**startsWith("h")**

是否以"h"字符开头, 返回布尔值

**endsWith("o")**

是否以"o"字符结尾, 返回布尔值

**padStart()前面补全 / padEnd()后边补全**

- 第一个参数: 最终需要补全的字符串长度
- 第一个参数长度如果小于或者等于原字符串长度,则不添加
- 大于就用第二个参数进行填充
- 返回一个新字符串






