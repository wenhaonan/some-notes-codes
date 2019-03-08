##### async function 声明用于定义一个异步函数 
##### 语法
```
# async 函数
## 含义

ES2017标准引入了async函数,使得一部操作变的更加方便

`async` 函数是`Generator`函数的语法糖

`async` 函数使用时就算是讲`Generator`函数的星号(*)替换成`async`, 讲`yield`替换成`await`, 仅此而已

async函数对Generator函数的区别:

（1）内置执行器

Generator函数的执行必须依靠执行器, 而`async`函数自带执行器,不许用`next()`来执行

（2）)更好的语义

`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。

（3）正常情况下,`await`命令后面是一个Promise对象, 如果不是, 会被转成一个立即`resolve`的Promise对象

（4）返回值是Promise

`async`函数的返回值是 Promise 对象，你可以用`then`方法指定下一步的操作。

进一步说, `async`函数完全可以看做多个异步操作, 包装成一个Promise对象, 而`await`命令就是内部`then`命令的语法糖


​```js
    async function f(){
        await new Promise(function(resolve, reject) {
            throw new Error('出错了')
        })
    }
    f().catch(e=>{
        console.log(e)
    })
    //出错了

​```

防止出错的方法, 放在`try..catch`代码块儿中

​```js
async function f(){
    try{
        await new Promise(function(resolve, reject) {
            throw new Error('出错了')
        })
    } catch(e){
        console.log(e)
    }
}

f()

​```

如果有多个`await`命令，可以统一放在`try...catch`结构中。

​```js
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
​```

下面是async函数的写法

​```js
var fn = function (time) {
  return new Promise(function (resolve, reject) {
    console.log("开始处理异步");
    setTimeout(function () {
      resolve();
      console.log(time);
      console.log("异步处理完成");
    }, time);
  })
};

var start = async function () {
  // 在这里使用起来就像同步代码那样直观
  console.log('start');
  await fn(3000);
  await fn(500);
  await fn(1000);
  console.log('end');
};

start();
​```

```