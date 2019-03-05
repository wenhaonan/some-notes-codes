### generator
### 语法
```
//定义一个generator函数,在function和函数名之间加个 *,通常紧跟在function后
function* fn(){
		yield 1;
		yield 2;
		return 3;
		yield 4;
	} 
 	//拿到接口, gen{<suspended>}
 	let iter = fn()  
 	
 	// Generator.prototype.next(),返回由yield表达式生成的值
 	console.log(iter.next())   // {value: 1, done: false}
  	console.log(iter.next())   //{value: 2, done: false}
  	console.log(iter.next())   //{value: 3, done: true}
  	
  	//当执行过return之后,函数已经结束,value显示undefined, done:true表示已经完成遍历
  	console.log(iter.next())   //{value: undefined, done: true} 
    
```

### 方法
- Generator.prototype.next() : 返回一个由 yield表达式生成的值。
- Generator.prototype.return() : 返回给定的值并结束生成器。
- Generator.prototype.throw() : 向生成器抛出一个错误。
- 

### 如何传参
```
function* fn(x){
        var y = 2 * (yield(x+1));
        var z = yield(y / 3);
        return(x + y + z)
     
	} 
 	let iter = fn(5)    //第一行的x已经变成 5 
 	
 	//第一种传参
    iter.next()  {value:6,done:false}   //返回yield表达式的值, 所以返回 x + 1 = 6
    iter.next()  {value:NaN,done:false} //返回y/3的值,但是上一个yield表达式返回之后,变为undefined,所以 返回NaN
    iter.next()  {value:NaN,done:true}  //返回x + y + z,但是y,z都是undefined,所以返回NaN,遍历结束,done返回ture
    
    
    //第二中传参
    let iter = fn(5)
    iter.next()   {value:6,done:false}  //返回yield表达式的值, 所以返回 x + 1  = 6
    iter.next(12) {value:8,done:false}  //next里的参数,代替了上一次yield表达式的位置,所以y变成了 24, 所以返回 y / 3 = 8
    iter.next(13) {value:42,done:true}  //next的参数代替了上一次,所以z = 13,x = 5, y = 24 x + y + z = 42

```