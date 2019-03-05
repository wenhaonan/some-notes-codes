#### Symbol.iterator为对象提供一个迭代器的接口,具有iterator接口的对象能够被 for ... of 遍历, 也能被扩展运算 ... 展开 

#### 原生具备iterator接口的数据结构
- Array
- Map
- Set
- String
- 函数的arguments对象
- NodeList对象  
- HTMLCollection
```
构造函数不同
console.log(document.getElementsByTagName("div"))  //HTMLCollection(1)
console.log(document.getElementsByTagName("div"))  //NodeList[div]
```

#### 工作流程

- 创建一个指针对象, 指向数据结构中的起始位置
- 调用对象的next方法 指针指向下一个数据
- 调用对象的next方法 指针指向下一个数据
- 直到指向的数据没有的时候 结束位置
- done: false 显示未完成


**模拟iterator方法**

```
let arr = ["a", "b", "c"]

function Iter(obj){
    let i = 0 //模拟指针
    return {
        next(){
            let done = (i >= obj.length)
            let value = !done ? obj[i++] : undefined
            return {
                value,
                done
            }
        }
    }
}

```

**obj模拟**

```

    let obj = {
        0 : "雀雀",
        1 : 18,
        length:2,
        [Symbol.iterator]:Array.prototype[Symbol.iterator]
    }

```