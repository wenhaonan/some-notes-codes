#### Symbol 的参数是对Symbol的描述,描述相同,但是并不相等
```

let a = Symbol(123)
let b = Symbol(123)

a === b  //false


```
#### Symbol的参数会调用 toString()
```
let a = Symbol( {} )

console.log(a)  // Symbol([Object, Object])

```
#### Symbol的参数会忽略""
```
let a = Symbol("123")

a // Symbol(123)
```

#### Symbol.for()方法创建Symbol,会把描述值放在一个全局变量里, 再次用Symbol.for()生成,会直接赋值
```
let a = Symbol.for(123)
let b = Symbol.for(123)

a === b //true

//此只针对用Symbol.for()声明的变量
```

#### Symbol.keyFor()用来获取变量用Symbol.for()生成的描述
```
let a = Symbol.for(123)
Symbol.keyFor(a)  // "123"
```

#### Symbol不能new调用,因为他是基础类型
```
let a = new Symbol(123)

//Symbol is not a constructor
```
#### Symbol类型的变量作为属性名时,属性名要加 [] ,否则只是一个普通的变量
```
let a = Symbol("123")
let b = {
    a : 1,
    [a] : 2
}

b.a // 1
b[a] // 2

```