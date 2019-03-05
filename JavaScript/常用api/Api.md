### 类名操作
```
ele.classList.add("classname1" , "classname2") ;  //添加
ele.classList.remove("classname") ;               //删除
ele.classList.toggle("classname") ;               //有则删，无则加
ele.classList.contains("classname")               //是否有 
```
---

### 内容可编辑
```
< element contenteditable = "true" / contenteditable > //可编辑
< element contenteditable = "false" >                  //不可编辑
```
---

### 获取样式

**兼容写法**

```
function getStyle ( ele ) {
    return ele.currentStyle || getComputedStyle(ele)
}
getStyle(ele).width
```