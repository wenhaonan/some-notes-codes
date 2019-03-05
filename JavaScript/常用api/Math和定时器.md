### ==Math==
javascript 内置对象, window的一个属性

**Math.PI**

常量 π

**Math.E**

自然常数 e(2.71..)

**Math.abs()**

取绝对值

**Math.ceil()**

向上取整
```
Math.ceil(1.2) => 2
Math.ceil(-1.2) => -1
```
**Math.floor()**

向下取整
```
Math.floor(1.2) => 1
Math.floor(-1.2) => -2
```
**Math.round()**

四舍五入
```
Math.round(1.2) => 1
Math.round(-1.2) => -1
```
**Math.max() / Math.min()**

最大最小值

**Math.random()**

产生随机数[0,1)
```
//产生[a, b]的随机数

function randomAB(a, b){
    return Math.floor(Math.random()*(b - a + 1)) + a
}
```

**toFixed()**

保留几位小数,Number的原型上的方法
```
1.6546.toFixed(2) => 1.65
```
**Math.pow()**

幂运算 (** ES6写法)
```
Math.pow(2, 2) => 4
2 ** 2 => 4 
```

---

### 定时器

**setInterval**

循环定时器

- 第一个参数是回调函数, 第二个参数是毫秒值,后边的参数都是回调函数的实参
- 不限制运行次数
- 返回定时器编号 1, 2.. (谁写在前面编号就靠前,和执行先后顺序无关)

**setTimeout**

一次性定时器

- 参数同setInterval
- 运行一次
- 返回编号(谁写在前面编号就靠前)

**clearTimeout() / clearInterval()**

清除定时器,传入定时器编号或者名字


### 圆周运动
```
function run(){
    let rad = (Math.PI / 180) * deg     //deg 弧度值
    let X = r + Math.sin(rad) * r - a   //a 是小球的半径, r是圆半径
    let y = r - Math.cos(rad) * r - a
    deg++ 
}
```



