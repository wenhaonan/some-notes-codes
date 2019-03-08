### Promise对象用于表示一个异步操作的最终状态(完成或失败),以及其返回的值

#### 语法
```
# Promise

## 概念

Promise 是异步编程的一种解决方案, 比传统的解决方案--回调函数和事件 来的更合理和更强大

所谓的`Promise`, 简单的说就是一个容器, 里面保存着某个未来才会结束的事件 (通常是一个异步操作) 的结果

### 特点

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### 状态

`Promise`对象代表一个异步操作, 有三种状态: 
`pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)

只有异步操作的结果, 可以决定当前是哪一个状态, 任何其他操作都无法改变这个状态

### 缺点

1. 无法取消`Promise`, 一旦新建他就会立即执行, 无法中途取消
2. 如果不设置回调函数, `Promise`内部抛出的错误,不会反应到外部
3. 当处于`pending`状态时, 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)


> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

## 用法 

写js必然不会对异步事件陌生

​```js

    settimeout(()=>{
      console.log("123")
    },0)
    
    console.log("abc")
    //先输出谁？

​```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

> 这时：Promise这个为异步编程而生的对象站了出来....

​```js
let p = new Promise((resolve,reject)=>{
  //一些异步操作
  settimeout(()=>{
    console.log("123")
    resolve("abc");
  },0)
})
.then(function(data){
  //resolve状态
  console.log(data)
}).then(function(data){
  //resolve状态
  console.log(data)
})
//'123'
//'abc'
​```


在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

​```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
​```

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

​```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){
  	console.log(err)
  })
//reject不能结束Promise
//>5，走reject 	
​```

## Promise.all( ) 

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.all([p1, p2, p3]);
​```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。

## Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.race([p1, p2, p3]);
​```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

​```js
const jsPromise = Promise.resolve('123');

​```

上面代码将123转为一个 Promise 对象。

`Promise.resolve`等价于下面的写法。

​```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
​```

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   ```

   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   
   ```

   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```js
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

   ```js
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```js
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

   ```js
   const thenable = {
     then(resolve, reject) {
       reject('出错了');
     }
   };
   
   Promise.reject(thenable)
   .catch(e => {
     console.log(e === thenable)
   })
   // true
   
   ```

   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。# Promise

## 概念

Promise 是异步编程的一种解决方案, 比传统的解决方案--回调函数和事件 来的更合理和更强大

所谓的`Promise`, 简单的说就是一个容器, 里面保存着某个未来才会结束的事件 (通常是一个异步操作) 的结果

### 特点

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### 状态

`Promise`对象代表一个异步操作, 有三种状态: 
`pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)

只有异步操作的结果, 可以决定当前是哪一个状态, 任何其他操作都无法改变这个状态

### 缺点

1. 无法取消`Promise`, 一旦新建他就会立即执行, 无法中途取消
2. 如果不设置回调函数, `Promise`内部抛出的错误,不会反应到外部
3. 当处于`pending`状态时, 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)


> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

## 用法 

写js必然不会对异步事件陌生

​```js

    settimeout(()=>{
      console.log("123")
    },0)
    
    console.log("abc")
    //先输出谁？

​```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

> 这时：Promise这个为异步编程而生的对象站了出来....

​```js
let p = new Promise((resolve,reject)=>{
  //一些异步操作
  settimeout(()=>{
    console.log("123")
    resolve("abc");
  },0)
})
.then(function(data){
  //resolve状态
  console.log(data)
}).then(function(data){
  //resolve状态
  console.log(data)
})
//'123'
//'abc'
​```


在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

​```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
​```

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

​```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){
  	console.log(err)
  })
//reject不能结束Promise
//>5，走reject 	
​```

## Promise.all( ) 

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.all([p1, p2, p3]);
​```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。

## Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.race([p1, p2, p3]);
​```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

​```js
const jsPromise = Promise.resolve('123');

​```

上面代码将123转为一个 Promise 对象。

`Promise.resolve`等价于下面的写法。

​```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
​```

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   ```

   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   
   ```

   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```js
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

   ```js
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```js
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

   ```js
   const thenable = {
     then(resolve, reject) {
       reject('出错了');
     }
   };
   
   Promise.reject(thenable)
   .catch(e => {
     console.log(e === thenable)
   })
   // true
   
   ```

   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。
# Promise

## 概念

Promise 是异步编程的一种解决方案, 比传统的解决方案--回调函数和事件 来的更合理和更强大

所谓的`Promise`, 简单的说就是一个容器, 里面保存着某个未来才会结束的事件 (通常是一个异步操作) 的结果

### 特点

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### 状态

`Promise`对象代表一个异步操作, 有三种状态: 
`pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)

只有异步操作的结果, 可以决定当前是哪一个状态, 任何其他操作都无法改变这个状态

### 缺点

1. 无法取消`Promise`, 一旦新建他就会立即执行, 无法中途取消
2. 如果不设置回调函数, `Promise`内部抛出的错误,不会反应到外部
3. 当处于`pending`状态时, 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)


> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

## 用法 

写js必然不会对异步事件陌生

​```js

    settimeout(()=>{
      console.log("123")
    },0)
    
    console.log("abc")
    //先输出谁？

​```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

> 这时：Promise这个为异步编程而生的对象站了出来....

​```js
let p = new Promise((resolve,reject)=>{
  //一些异步操作
  settimeout(()=>{
    console.log("123")
    resolve("abc");
  },0)
})
.then(function(data){
  //resolve状态
  console.log(data)
}).then(function(data){
  //resolve状态
  console.log(data)
})
//'123'
//'abc'
​```


在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

​```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
​```

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

​```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){
  	console.log(err)
  })
//reject不能结束Promise
//>5，走reject 	
​```

## Promise.all( ) 

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.all([p1, p2, p3]);
​```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。

## Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.race([p1, p2, p3]);
​```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

​```js
const jsPromise = Promise.resolve('123');

​```

上面代码将123转为一个 Promise 对象。

`Promise.resolve`等价于下面的写法。

​```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
​```

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   ```

   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   
   ```

   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```js
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

   ```js
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```js
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

   ```js
   const thenable = {
     then(resolve, reject) {
       reject('出错了');
     }
   };
   
   Promise.reject(thenable)
   .catch(e => {
     console.log(e === thenable)
   })
   // true
   
   ```

   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。
# Promise

## 概念

Promise 是异步编程的一种解决方案, 比传统的解决方案--回调函数和事件 来的更合理和更强大

所谓的`Promise`, 简单的说就是一个容器, 里面保存着某个未来才会结束的事件 (通常是一个异步操作) 的结果

### 特点

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### 状态

`Promise`对象代表一个异步操作, 有三种状态: 
`pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)

只有异步操作的结果, 可以决定当前是哪一个状态, 任何其他操作都无法改变这个状态

### 缺点

1. 无法取消`Promise`, 一旦新建他就会立即执行, 无法中途取消
2. 如果不设置回调函数, `Promise`内部抛出的错误,不会反应到外部
3. 当处于`pending`状态时, 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)


> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

## 用法 

写js必然不会对异步事件陌生

​```js

    settimeout(()=>{
      console.log("123")
    },0)
    
    console.log("abc")
    //先输出谁？

​```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

> 这时：Promise这个为异步编程而生的对象站了出来....

​```js
let p = new Promise((resolve,reject)=>{
  //一些异步操作
  settimeout(()=>{
    console.log("123")
    resolve("abc");
  },0)
})
.then(function(data){
  //resolve状态
  console.log(data)
}).then(function(data){
  //resolve状态
  console.log(data)
})
//'123'
//'abc'
​```


在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

​```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
​```

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

​```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){
  	console.log(err)
  })
//reject不能结束Promise
//>5，走reject 	
​```

## Promise.all( ) 

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.all([p1, p2, p3]);
​```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。

## Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.race([p1, p2, p3]);
​```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

​```js
const jsPromise = Promise.resolve('123');

​```

上面代码将123转为一个 Promise 对象。

`Promise.resolve`等价于下面的写法。

​```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
​```

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   ```

   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   
   ```

   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```js
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

   ```js
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```js
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

   ```js
   const thenable = {
     then(resolve, reject) {
       reject('出错了');
     }
   };
   
   Promise.reject(thenable)
   .catch(e => {
     console.log(e === thenable)
   })
   // true
   
   ```

   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。
# Promise

## 概念

Promise 是异步编程的一种解决方案, 比传统的解决方案--回调函数和事件 来的更合理和更强大

所谓的`Promise`, 简单的说就是一个容器, 里面保存着某个未来才会结束的事件 (通常是一个异步操作) 的结果

### 特点

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### 状态

`Promise`对象代表一个异步操作, 有三种状态: 
`pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)

只有异步操作的结果, 可以决定当前是哪一个状态, 任何其他操作都无法改变这个状态

### 缺点

1. 无法取消`Promise`, 一旦新建他就会立即执行, 无法中途取消
2. 如果不设置回调函数, `Promise`内部抛出的错误,不会反应到外部
3. 当处于`pending`状态时, 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)


> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

## 用法 

写js必然不会对异步事件陌生

​```js

    settimeout(()=>{
      console.log("123")
    },0)
    
    console.log("abc")
    //先输出谁？

​```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

> 这时：Promise这个为异步编程而生的对象站了出来....

​```js
let p = new Promise((resolve,reject)=>{
  //一些异步操作
  settimeout(()=>{
    console.log("123")
    resolve("abc");
  },0)
})
.then(function(data){
  //resolve状态
  console.log(data)
}).then(function(data){
  //resolve状态
  console.log(data)
})
//'123'
//'abc'
​```


在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

​```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
​```

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

​```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){
  	console.log(err)
  })
//reject不能结束Promise
//>5，走reject 	
​```

## Promise.all( ) 

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.all([p1, p2, p3]);
​```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。

## Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.race([p1, p2, p3]);
​```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

​```js
const jsPromise = Promise.resolve('123');

​```

上面代码将123转为一个 Promise 对象。

`Promise.resolve`等价于下面的写法。

​```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
​```

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   ```

   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   
   ```

   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```js
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

   ```js
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```js
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

   ```js
   const thenable = {
     then(resolve, reject) {
       reject('出错了');
     }
   };
   
   Promise.reject(thenable)
   .catch(e => {
     console.log(e === thenable)
   })
   // true
   
   ```

   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。
# Promise

## 概念

Promise 是异步编程的一种解决方案, 比传统的解决方案--回调函数和事件 来的更合理和更强大

所谓的`Promise`, 简单的说就是一个容器, 里面保存着某个未来才会结束的事件 (通常是一个异步操作) 的结果

### 特点

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### 状态

`Promise`对象代表一个异步操作, 有三种状态: 
`pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)

只有异步操作的结果, 可以决定当前是哪一个状态, 任何其他操作都无法改变这个状态

### 缺点

1. 无法取消`Promise`, 一旦新建他就会立即执行, 无法中途取消
2. 如果不设置回调函数, `Promise`内部抛出的错误,不会反应到外部
3. 当处于`pending`状态时, 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)


> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

## 用法 

写js必然不会对异步事件陌生

​```js

    settimeout(()=>{
      console.log("123")
    },0)
    
    console.log("abc")
    //先输出谁？

​```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

> 这时：Promise这个为异步编程而生的对象站了出来....

​```js
let p = new Promise((resolve,reject)=>{
  //一些异步操作
  settimeout(()=>{
    console.log("123")
    resolve("abc");
  },0)
})
.then(function(data){
  //resolve状态
  console.log(data)
}).then(function(data){
  //resolve状态
  console.log(data)
})
//'123'
//'abc'
​```


在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

​```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
​```

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

​```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){
  	console.log(err)
  })
//reject不能结束Promise
//>5，走reject 	
​```

## Promise.all( ) 

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.all([p1, p2, p3]);
​```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。

## Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

​```js
const p = Promise.race([p1, p2, p3]);
​```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

​```js
const jsPromise = Promise.resolve('123');

​```

上面代码将123转为一个 Promise 对象。

`Promise.resolve`等价于下面的写法。

​```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
​```

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   ```

   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   
   ```

   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```js
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

   ```js
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```js
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

   ```js
   const thenable = {
     then(resolve, reject) {
       reject('出错了');
     }
   };
   
   Promise.reject(thenable)
   .catch(e => {
     console.log(e === thenable)
   })
   // true
   
   ```

   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。xxxxxxxxxx new Promise( function(resolve, reject){...} );# Promise## 概念​Promise 是异步编程的一种解决方案, 比传统的解决方案--回调函数和事件 来的更合理和更强大​所谓的`Promise`, 简单的说就是一个容器, 里面保存着某个未来才会结束的事件 (通常是一个异步操作) 的结果​### 特点​1. 对象的状态不受外界影响。2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。​### 状态​`Promise`对象代表一个异步操作, 有三种状态: `pending`(进行中), `fulfilled`(已成功) 和 `rejected`(已失败)​只有异步操作的结果, 可以决定当前是哪一个状态, 任何其他操作都无法改变这个状态​### 缺点​1. 无法取消`Promise`, 一旦新建他就会立即执行, 无法中途取消2. 如果不设置回调函数, `Promise`内部抛出的错误,不会反应到外部3. 当处于`pending`状态时, 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)​​> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。​## 用法 ​写js必然不会对异步事件陌生```js​    settimeout(()=>{      console.log("123")    },0)        console.log("abc")    //先输出谁？```​如果abc需要在123执行结束后再输出怎么办？​当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。​> 这时：Promise这个为异步编程而生的对象站了出来....```jslet p = new Promise((resolve,reject)=>{  //一些异步操作  settimeout(()=>{    console.log("123")    resolve("abc");  },0)}).then(function(data){  //resolve状态  console.log(data)}).then(function(data){  //resolve状态  console.log(data)})//'123'//'abc'```​​在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：```jsrunAsync1().then(function(data){    console.log(data);    return runAsync2();}).then(function(data){    console.log(data);    return '直接返回数据';  //这里直接返回数据}).then(function(data){    console.log(data);});//异步任务1执行完成//随便什么数据1//异步任务2执行完成//随便什么数据2//直接返回数据```​## Promise.prototype.catch()​`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。```jsp1()  .then(function(data){    console.log(data)  })  .catch(function(err){    console.log(err)  })//reject不能结束Promise//>5，走reject    ```​## Promise.all( ) ​`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。```jsconst p = Promise.all([p1, p2, p3]);```​`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。​1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。​`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。​如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。​## Promise.race()​`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。```jsconst p = Promise.race([p1, p2, p3]);```​上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。​​​## Promise.resolve()​有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。```jsconst jsPromise = Promise.resolve('123');```​上面代码将123转为一个 Promise 对象。​`Promise.resolve`等价于下面的写法。```jsPromise.resolve('123')// 等价于new Promise(resolve => resolve('123'))```​`Promise.resolve`方法的参数分成四种情况。​1. **参数是一个 Promise 实例**​   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。​2. **参数是一个thenable对象**​   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。​   ```js   let thenable = {     then: function(resolve, reject) {       resolve(42);     }   };      ```​   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。​   ```js   let thenable = {     then: function(resolve, reject) {       resolve(42);     }   };      let p1 = Promise.resolve(thenable);   p1.then(function(value) {     console.log(value);  // 42   });      ```​   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。​3. **参数不是具有then方法的对象，或根本就不是对象**​   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。​   ```js   const p = Promise.resolve('Hello');      p.then(function (s){     console.log(s)   });   // Hello      ```​   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。​4. **不带有任何参数**​   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。​   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。​   ```js   const p = Promise.resolve();      p.then(function () {     // ...   });         ```​   上面代码的变量`p`就是一个 Promise 对象。​   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。​   ```js   setTimeout(function () {     console.log('three');   }, 0);      Promise.resolve().then(function () {     console.log('two');   });      console.log('one');      // one   // two   // three      ```​   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。​   ## Promise.reject()​   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。​   ```js   const p = Promise.reject('出错了');   // 等同于   const p = new Promise((resolve, reject) => reject('出错了'))      p.then(null, function (s) {     console.log(s)   });   // 出错了      ```​   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。​   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。​   ```js   const thenable = {     then(resolve, reject) {       reject('出错了');     }   };      Promise.reject(thenable)   .catch(e => {     console.log(e === thenable)   })   // true      ```​   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。​
```