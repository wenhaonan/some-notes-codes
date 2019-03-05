**对象的简洁属性表示法**

**对象属性名表达式**

注意,简洁表示法和属性名表达式,不能同时使用

---

**Object.is()**

判断值是否相等
```
Object.is("foo", "foo") //true
Object.is({}, {}) //false

+0 === -0 //true
NaN === NaN //false

区别 + -0
Object.is(+0, -0) //false
NaN相等
Object.is(NaN, NaN) //true
```
---

**Object.keys() / Object.values() / Object.entries()**

返回数组形式的键 / 值 / 键值对