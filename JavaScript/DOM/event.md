#### event 事件信息对象
- 主流浏览器事件函数的第一个形参
- 低版本IE: window.event
- 事件对象的兼容写法: e = e || window.event

**事件信息对象的属性**  
```
clientX / Y: 相对可视窗口的左上角
pageX / Y:  相对与整个文档的左上角
type: 事件类型
target: 事件源
srcElement: 低版本IE的事件源
which:兼容IE的keycode
ctrlKey: false 是否按下了ctrl键
key:按下的键
keyCode: 键对应的键值

```
---
#### 事件冒泡和捕获

- 冒泡: 子节点的事件会触发父节点及其以上节点的相同事件,浏览器默认冒泡
- 捕获: 事件首先被父节点捕获,一层一层向内触发相同的事件

阻止冒泡:
```
主流浏览器: stopPropagation()
低版本IE: cancelBubble = true
```
---

#### 事件监听
DOM 0级事件
- ele.on+type = function(){}
- 
DOM 2级事件
- 添加事件监听: addEventListener("type", fn, false) //事件类型,事件函数,默认false冒泡, true捕获
- 注销事件监听: removeEventListener("type",fn,false)//事件类型,事件函数(具名函数),方式  必须一一对应
- 还可以写在标签上 <div onclick="fn()"></div>  //不建议这样写


低版本IE
- attachEvent("on+type",fn) //第一个参数是 'on + type',没有第三个参数
- detachEvent("on+type",fn)

**DOM 2级优点**

- 可以监听多个相同的事件
---

#### 事件代理/委托
```
<div>
p
span
ul
img
</div> 

div.onclick = function(e){
    e = e || window.event
    let that = e.target 
    let tagName = e.target.tagName.toLowerCase()  //tagName 返回的是大写的标签名
    if(tagName === "p"){
        console.log(`我是p标签`)
    }
}

```
---
#### event默认行为
选中操作,右键菜单等等都是默认行为,要想阻止默认行为,首先要知道这个默认行为是哪个事件对象触发的

**阻止默认行为的方式**
- 主流浏览器: e.preventDefault()
- 低版本IE: e.returnValue = false
- 在DOM零级事件中,在事件函数末尾加上return false ,也可以阻止默认行为
- 还可以在html标签上写 oncontextmenu = "return false"
```
    document.oncontextmenu = function(e){
        e.returnValue()//IE浏览器
        e.preventDefault()
        return false //DOM 0级事件的比较奇怪的方式
    }

```