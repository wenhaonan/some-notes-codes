### events (事件触发器)

**事件触发**

- 同步触发
- 只触发一次
```
const EventEmitter = require("events").EventEmitter;

const myEmitter = new EventEmitter()

myEmitter.on("haonan", () => {
    console.log("haonan事件触发了")
})

myEmitter.emit("haonan")

//移除监听器
myEmitter.off("haonan")

once注册一次性事件,触发一次被注销
myEmitter.once("event" , function(){})

//haohao事件触发了
```

**传参数与"this"**

eventEmitter.emit()方法可以传任意数量的参数到监听器函数,当监听器函数被调用时,this会指向监听器所绑定的EventEmitter实例

```
const myEmitter = new EventEmitter()
myEmitter.on("event", function(a, b){
    console.log(a, b, this, this === myEmitter)
  // 打印:
  //     a b 
  //     MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined }
  //     true
})

myEmitter.emit("event", "a", 'b')
```


使用箭头函数时, this 指向 {}
```
myEmitter.on("haonan", () => {
  console.log("haonan事件触发了", this)
})

myEmitter.emit("haonan")

=> {}
```

**异步VS同步**

- EventEmitter 会按照监听器的注册顺序同步的调用所有监听器,所以必须确保排序正确
- 可以使用 setImmediate() 和 process.nextTick() 切换到异步模式

```
    const myEmitter = new MyEmitter();
    myEmitter.on('event', (a, b) => {
      setImmediate(() => {
        console.log('异步进行');
      });
    });
    myEmitter.emit('event', 'a', 'b');
```

**`error`事件**

- 当实例出错时,应触发 `error`事件
- 如果没有为 `error`事件注册监听器,当发生错误,会抛出,并推出node.js进程
- 应始终为`error`事件注册监听器

```
    const myEmitter = new MyEmitter();
    myEmitter.on('error', (err) => {
      console.error('错误信息');
    });
    myEmitter.emit('error', new Error('错误信息'));
    // 打印: 错误信息
```

**`newListener` 和 `removeListener`事件**

- 当新增监听器时会触发 newListener 事件
- 当移除已存在的监听器时会触发 removeListener 事件


**setMaxListeners(n) 和 getMaxListeners(n)**

- 设置和获取EventEmitter的监听器限制数量
- 默认为10 
- 超过会打印警告,有助于发现内存泄露, 并不会报错
- 用setMaxListeners(n)提高上限