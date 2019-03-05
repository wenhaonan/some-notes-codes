**ES5类的创建方式**

传统js没有类的概念,要想对象实例,要定义一个构造函数,用new来实例
```
function Person(opt){
    this.name = opt.name,
    this.age = opt.age
}
//这种原型上可以定义非函数的数值
Person.prototype.say = function(){
    return "我的名字叫" + this.name+"今年"+this.age+"岁了";
}
```

**ES6类创建方式**

ES6新的关键字class用来创建类,可以认为是构造函数的另一种写法
```
class Person{
    //constructor里面放的是私有属性
    constructor(opt){     
        this.name = opt.name,
        this.age = opt.age
    }
    prototype的方法写在外边,不用任何标签符号
    sayName(){
        console.log(this.name)
    }
    sayAge(){
        console.log(this.age)
    }
    //不可以定义function之外的数据
}

//用ES6创建的类只能用new实例化
const obj = new Person({
    name: wen,
    age: 14
})
```

**ES6类继承**
```
class Person{
    //constructor里面放的是私有属性
    constructor(opt){     
        this.name = opt.name,
        this.age = opt.age
    }
    prototype的方法写在外边,不用任何标签符号
    sayName(){
        console.log(this.name)
    }
    sayAge(){
        console.log(this.age)
    }
    
}


class Person1 extends Person{
    constructor(opt){
        super(opt)      //super()必须要写
        this.y = opt.y //扩展的私有属性
    }
    fn(){} //扩展的方法
}

```
---

**super 关键字**

super既可以当做函数使用,也可以当做对象使用

- super作为函数调用时,代表父类的构造函数,ES6要求,子类的构造函数里必须执行一次super函数
```
class A{
    constructor(){
        
    }
}

class B extends A {
    constructor(){
        super();   //代表父类,this指向子类
    }
}

```

- super作为对象时,在普通方法中,指向父类的原型,在静态方法中,指向父类
```
class A{
    constructor(){
        
    }
}

class B extends A {
    constructor(){
        super();   //必须执行的
        super.say()  // A.prototype.say()
    }
    
    //静态方法  没有静态属性
    static say(){
        super    // A
    }
    
    //原型方法
    add(){
        super   //A.prototype
    }
    
}

```