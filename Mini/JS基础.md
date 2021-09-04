

### JS中一共有七种数据类型

- **基本数据类型（值类型，保存在栈内存中）**：String 字符串、Number 数值、Boolean 布尔值、Null 空值、Undefined 未定义、Symbol类型。

- **引用数据类型（引用类型，保存到堆内存中的）**：Object 对象。



### null 和 undefined 

`null == undefined` 的结果为 `true`  

`null === undefined` 的结果是 false

- 任何数据类型和 undefined 运算都是 NaN; 10 + undefined 结果为 NaN。

- 任何值和 null 运算，null 可看做 0 运算。 10 + null 结果为 10。

### typeof 和 instanceof

| typeof 的代码写法   | 返回结果（都是字符串格式） |
| :------------------ | :------------------------: |
| typeof 数字         |           number           |
| typeof 字符串       |           string           |
| typeof 布尔型       |          boolean           |
| *typeof 对象，数组* |           object           |
| typeof 方法         |          function          |
| *typeof null*       |           object           |
| typeof undefined    |         undefined          |

> A instanceof B

如果B函数的显式原型对象在A对象的原型链上，则返回true，否则返回false。

obj instanceof Object 检测Object.prototype是否存在于参数obj的原型链上。

### 数组常见方法

WebMaster =》 04 =》 17

数组的类型相关

| 方法                             | 描述                               | 备注 |
| :------------------------------- | :--------------------------------- | :--- |
| Array.isArray()                  | 判断是否为数组                     |      |
| toString()                       | 将数组转换为字符串                 |      |
| Array.from(arrayLike)            | 将**伪数组**转化为**真数组**       |      |
| Array.of(value1, value2, value3) | 创建数组：将**一系列值**转换成数组 |      |

数组元素的添加和删除

| 方法      | 描述                                                         | 备注           |
| :-------- | :----------------------------------------------------------- | :------------- |
| push()    | 向数组的**最后面**插入一个或多个元素，返回结果为新数组的**长度** | 会改变原数组   |
| pop()     | 删除数组中的**最后一个**元素，返回结果为**被删除的元素**     | 会改变原数组   |
| unshift() | 在数组**最前面**插入一个或多个元素，返回结果为新数组的**长度** | 会改变原数组   |
| shift()   | 删除数组中的**第一个**元素，返回结果为**被删除的元素**       | 会改变原数组   |
|           |                                                              |                |
| slice()   | 从数组中**提取**指定的一个或多个元素，返回结果为**新的数组** | 不会改变原数组 |
| splice()  | 从数组中**删除**指定的一个或多个元素，返回结果为**被删除元素组成的数组** | *会改变原数组* |
|           | array.splice(start[, deleteCount[, item1[, item2[, ...]]]])  |                |
| fill()    | 填充数组：用固定的值填充数组，返回结果为**新的数组**         | 不会改变原数组 |

数组的合并和拆分

| 方法     | 描述                                                 | 备注             |
| :------- | :--------------------------------------------------- | :--------------- |
| concat() | 合并数组：连接两个或多个数组，返回结果为**新的数组** | 不会改变原数组   |
| join()   | 将数组转换为字符串，返回结果为**转换后的字符串**     | 不会改变原数组   |
| split()  | 将字符串按照指定的分隔符，组装为数组                 | 不会改变原字符串 |

注意，`split()`是字符串的方法，不是数组的方法。

 数组排序

| 方法      | 描述                                                    | 备注         |
| :-------- | :------------------------------------------------------ | :----------- |
| reverse() | 反转数组，返回结果为**反转后的数组**                    | 会改变原数组 |
| sort()    | 对数组的元素,默认按照**Unicode 编码**，从小到大进行排序 | 会改变原数组 |

>   1、charAt（）：把字符串分成每一个字符，从左往右提取指定位置的字符。
>
> var str = '天气';
> alert( str.charAt(1) );            //气
> 2、charCodeAt （）：在第一个的基础上，返回的是字符的unicode编码。
>
> var str = '天气';
>
> alert( str.charCodeAt(0) );        //22825
>
> 3、String.fromCharCode（）：通过编码值在unicode编码库中查找出对应的字符。
>
> alert( String.fromCharCode(22825, 27668) );            //天气
> 4、当两个字符串进行大小比较时，比的是第一个字符的unicode编码的大小：
>
> alert( 'abbbbb' > 'b' );                //unicode编码中a<b，所以是false；
> alert( '10000' > '2' );                 //unicode编码中1<2，所以是false；

查找数组的元素

| 方法                  | 描述                                                         | 备注                                                       |
| :-------------------- | :----------------------------------------------------------- | :--------------------------------------------------------- |
| indexOf(value)        | 从前往后索引，检索一个数组中是否含有指定的元素               |                                                            |
| lastIndexOf(value)    | 从后往前索引，检索一个数组中是否含有指定的元素               |                                                            |
| includes(item)        | 数组中是否包含指定的内容                                     |                                                            |
| find(function())      | 找出**第一个**满足「指定条件返回 true」的元素                |                                                            |
| findIndex(function()) | 找出**第一个**满足「指定条件返回 true」的元素的 index        |                                                            |
| every()               | 确保数组中的每个元素都满足「指定条件返回 true」，则停止遍历，此方法才返回 true | *全真才为真*。要求每一项都返回 true，最终的结果才返回 true |
| some()                | 数组中只要有一个元素满足「指定条件返回 true」，则停止遍历，此方法就返回 true | *一真即真*。只要有一项返回 true，最终的结果就返回 true     |

| 方法      | 描述                                                         | 备注                                                         |
| :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| for 循环  | 这个大家都懂                                                 |                                                              |
| forEach() | 和 for 循环类似，但需要兼容 IE8 以上                         | forEach() 没有返回值。也就是说，它的返回值是 undefined       |
| map()     | 对原数组中的每一项进行加工，将组成新的数组                   | 不会改变原数组                                               |
| filter()  | 过滤数组：返回结果是 true 的项，将组成新的数组，返回结果为**新的数组** | 不会改变原数组                                               |
| reduce    | 接收一个函数作为累加器，返回值是回调函数累计处理的结果，是一个值，不是一个数组 | array.reduce(function(previousValue, currentValue, currentIndex, arr), initialValue) |

### 作用域、作用域链

- **概念**：通俗来讲，作用域是一个变量或函数的作用范围。作用域在**函数定义**时，就已经确定了。
- **目的**：确定变量所属，避免冲突。

- 全局作用域、函数作用域（局部作用域）、块级作用域）

**作用域链**：**内部函数访问外部函数的变量**，采用的是**链式查找的方式**来决定取哪个值，这种结构称之为作用域链。查找时，采用的是**就近原则**。

### 执行上下文

当代码运行时，会产生一个对应的执行环境，在这个环境中，所有变量会被事先提出来（变量提升），有的直接赋值，有的为默认值 undefined，代码从上往下开始执行，就叫做执行上下文。

上下文总是关键字 this 的值，是**当前执行代码的对象的引用**。这个是由函数运行时决定的，简单来说就是谁调用此函数，this就指向谁。

执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生新的执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除（当然了闭包并不会乖乖就范），处于*活动状态*的执行上下文环境只有一个。

![image-20210728151704498](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210728151704498.png)

我的理解：

1. 作用域是确定变量与函数的作用范围，函数定义时确定
2. 上下文在函数执行时产生一个运行环境，可以确定this的值，进而确定变量具体的值，执行上下文是在执行的时候定义的。而且也有一个执行上下文栈

### 预编译

> 函数预编译，发生在函数**执行的前一刻**。

（1）创建AO对象。AO即 Activation Object 活跃对象，其实就是「执行期上下文」。（创建AO，即this）

（2）找形参和变量声明，将形参名和变量作为 AO 的属性名，值为undefined。（形参变量赋值undefined）

（3）将实参值和形参统一，实参的值赋给形参。（形参赋值）

（4）查找函数声明，函数名作为 AO 对象的属性名，值为整个函数体。（函数挂载）

注意：变量赋值发生在函数执行的过程中

### 事件循环

#### 前置知识

 本文主要分析js引擎执行的第三个阶段–**执行阶段**，在分析之前我们先思考以下两个问题：

1、js是单线程的，**为了避免代码解析阻塞使用了异步执行**，那么它的**异步执行机制**是怎么样的？

答：通过事件循环（Event Loop），理解了事件循环的原理就理解了js的异步执行机制，本文主要介绍。

2、js是单线程的，那么是否代表参与js执行过程的线程就只有一个？

答：不是的，会有**四个线程参与该过程**，但是永远只有**JS引擎线程在执行JS脚本程序**，其他的三个线程只**协助**，不参与**代码解析与执行**。参与js执行过程的线程分别是：

（1）**JS引擎线程**： 也称为JS内核，负责解析执行Javascript脚本程序的**主线程**（例如V8引擎）。

（2）**事件触发线程**： 归属于浏览器**内核进程**，不受JS引擎线程控制。主要用于控制事件（例如鼠标，键盘等事件），当该事件被触发时候，事件触发线程就会把该事件的==处理函数==推进**事件队列**，等待JS引擎线程执行。

（3）**定时器触发线程**：主要控制计时器setInterval和延时器setTimeout，用于定时器的计时，计时完毕，满足定时器的触发条件，则将定时器的==处理函数==推进**事件队列**中，等待JS引擎线程执行。

注：W3C在HTML标准中规定setTimeout低于4ms的时间间隔算为4ms。

（4）**HTTP异步请求线程**：通过XMLHttpRequest连接后，通过浏览器新开的一个线程，监控readyState状态变更时，如果设置了该状态的回调函数，则将该状态的==处理函数==推进**事件队列**中，等待JS引擎线程执行。

注：浏览器对同一域名请求的并发连接数是有限制的，Chrome和Firefox限制数为6个，ie8则为10个。

**总结**：永远只有JS引擎线程在执行JS脚本程序，其他三个线程只负责将满足触发条件的处理函数推进事件队列，等待JS引擎线程执行。

#### 具体过程

事件循环可以理解成由三部分组成，分别是：

1、主线程执行栈

2、异步任务等待触发

3、任务队列

**任务队列(task queue)就是以队列的数据结构对事件任务进行管理，特点是先进先出，后进后出**。



这里直接引用一张著名的图片(参考自Philip Roberts的演讲《Help, I’m stuck in an event-loop》)，帮助我们理解，如下：

![img](https://img-blog.csdnimg.cn/img_convert/49637e67666f95e3df3fd4ea4b0e92e1.png)

在JS引擎主线程执行过程中：

1、首先执行宏任务的同步任务，在主线程上形成一个**执行栈**，可理解为函数调用栈。

2、**当执行栈中的函数**调用到一些异步执行的API（例如异步Ajax，DOM事件，setTimeout等API），则会开启对应的线程（Http异步请求线程，事件触发线程和定时器触发线程）进行监控和控制。

3、当异步任务的事件满足触发条件时，对应的线程则会把该事件的处理函数推进**任务队列(task queue)**中，等待主线程读取执行。

4、当JS引擎主线程上的任务执行完毕，则会读取任务队列中的事件，将**任务队列中的事件任务推进主线程中**，按任务队列顺序执行

5、当JS引擎主线程上的任务执行完毕后，则会再次读取任务队列中的事件任务，如此循环，这就是事件循环（Event Loop）的过程。

#### 宏任务与微任务 

宏任务（macro-task）可分为**同步任务**和**异步任务**：

1、同步任务指的是*在JS引擎主线程上按顺序执行的任务*，只有前一个任务执行完毕后，才能执行后一个任务，形成一个执行栈（函数调用栈）。

2、异步任务指的是*不直接进入JS引擎主线程*，而是满足触发条件时，相关的线程将该异步任务推进**任务队列(task queue)**，等待JS引擎主线程上的任务执行完毕，空闲时读取执行的任务，例如异步Ajax，DOM事件，setTimeout等。

**微任务是在es6和node环境中出现的一个任务类型**，如果不考虑es6和node环境的话，我们只需要理解宏任务事件循环的执行过程就已经足够了，但是到了es6和node环境，我们就需要理解微任务的执行顺序了。微任务（micro-task）的API主要有:Promise， process.nextTick

#### 最终的事件循环

**宏任务(同步任务) --> 微任务 --> 宏任务(异步任务)**

1、执行宏任务中**同步任务**，执行结束。

2、检查是否存在可执行的**微任务**，

有的话执行所有微任务，执行完微任务后**然后读取任务队列的任务事件**，**推进主线程形成新的宏任务**；

没有的话则读取任务队列的任务事件，**推进主线程形成新的宏任务**。

3、执行**新宏任务**的事件任务，执行完后再检查是否存在可执行的微任务，如此不断的重复循环。

### 防抖与节流

个人理解：

函数防抖：**一段时间一个连续的操作，多次触发事件绑定的回调函数，变为只触发一次**。解决方法：将回调函数使用setTimeOut延迟执行，如果又触发了回调函数，则cleartimer(timer),然后再将timer赋值为setTimeout(回调函数)

节流就是一段时间一个连续的操作，定时触发回调函数，解决思路是不利用cleartimer(timer)

```js
/*****************************简化后的分割线 ******************************/
function debounce(fn,delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay) // 简化写法
    }
}
// 然后是旧代码
function showTop  () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
　　console.log('滚动条位置：' + scrollTop);
}
window.onscroll = debounce(showTop,1000) // 为了方便观察效果我们取个大点的间断值，实际使用根据需要来配置

function throttle(fn,delay){
    let valid = true
    return function() {
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
/* 请注意，节流函数并不止上面这种实现方案,
   例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
   也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
    */

// 以下照旧
function showTop  () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
　　console.log('滚动条位置：' + scrollTop);
}
window.onscroll = throttle(showTop,1000) 
```

### this指向

解析器在**调用函数**每次都会向函数内部**传递**当前的执行上下文，赋值函数内部的this，( 比如obj.fu()传递的是obj)，this 指向的是一个对象，**这个对象我们称为函数执行的上下文对象**。

- 1.以函数的形式（包括普通函数、**定时器函数、立即执行函数**）调用时，this 的指向永远都是 window。比如`fun();`相当于`window.fun();`

  ```js
  let o ={
  a:10,
  b:function(){
  (function(){
  console.log(this.a)})()
  }
  }
  o.b()
  //输出undefined,
  ```

- 2.以方法的形式调用时，this 指向调用方法的那个对象

- 3.以构造函数的形式调用时，this 指向实例对象

- **4.以事件绑定函数的形式调用时，this 指向绑定事件的对象**

- 5.使用 call 和 apply 调用时，this 指向指定的那个对象

#### 箭头函数中 this 的指向

箭头函数没有this，所以会沿着作用域去找this,也就是父级的this

#### call apply bind

fn1.call(想要将this指向哪里, 函数实参1, 函数实参2);

fn1.apply(想要将this指向哪里, [函数实参1, 函数实参2]);

bind() 方法**不会调用函数**，但是可以改变函数内部的 this 指向。

新函数 = fn1.bind(想要将this指向哪里, 函数实参1, 函数实参2);

### 闭包

(我的理解 ：一个函数里又定义了一个函数时，就产生了闭包，通过闭包函数可访问内部的变量与方法 )

简单理解就是：如果**这个作用域可以访问另外一个函数内部的局部变量**，那就产生了闭包（此时，你可以把闭包理解成是一种现象）；而另外那个作用域所在的函数称之为**闭包函数**。注意，这里强调的是访问**局部变量**哦。

代码举例：

```js
function fn1() {
    let a = 10;
    return function() {
        console.log(a);
    }
}
let fn2 = fn1();
fn2()
//10
```

函数 fn2 的作用域 访问了 fn1 中的局部变量，那么，此时在 fn1 中就产生了闭包，fn1 称之为闭包函数。

### new 一个构造函数的执行流程

new 在执行时，会做下面这四件事：

（1）开辟内存空间，在内存中创建一个新的空对象。

（2）让 this 指向这个新的对象。

（3）执行构造函数里面的代码，给这个新对象添加属性和方法。

（4）返回这个新对象（所以构造函数里面不需要 return）。

### 拷贝

#### 浅拷贝

Object.assign(目标对象一般为{}, 源对象1, 源对象2...);

#### 深拷贝

### 用 for in 递归实现深拷贝

代码实现：

```js
function checkType(any) {
  return Object.prototype.toString.call(any).slice(8, -1)
}
function clone(any){
  if(checkType(any) === 'Object') { // 拷贝对象
    let o = {};
    for(let key in any) {
      o[key] = clone(any[key])
    }
    return o;
  } else if(checkType(any) === 'Array') { // 拷贝数组 "[object Array]"
    var arr = []
    for(let i = 0,leng = any.length;i<leng;i++) {
      arr[i] = clone(any[i])
    }
    return arr;
  } else if(checkType(any) === 'Function') { // 拷贝函数
    return new Function('return '+any.toString()).call(this)
  } else if(checkType(any) === 'Date') { // 拷贝日期
    return new Date(any.valueOf())
  } else if(checkType(any) === 'RegExp') { // 拷贝正则
    return new RegExp(any)
  } else if(checkType(any) === 'Map') { // 拷贝Map 集合
    let m = new Map()
    any.forEach((v,k)=>{
      m.set(k, clone(v))
    })
    return m
  } else if(checkType(any) === 'Set') { // 拷贝Set 集合
    let s = new Set()
    for(let val of any.values()) {
      s.add(clone(val))
    }
    return s
  }
  return any;
}
// 测试

var a = {
  name: '张三',
  skills: ['踢球', '跑步', '打羽毛球'],
  age: 18,
  love: {
    name: '小红',
    age: 16
  },
  map: new Map([['aaa', '123']]),
  fn:function(a){
    console.log(`我的名字叫${this.name}` + a)
  },
  set: new Set([1,2,3,4,5])
}
var newA = clone(a)
a.age = 100
a.love.age = 100
a.set.add('1123')
a.skills.push('计算机')
a.name = '小梅'
a.map.set('name', '小明')

console.log(a)
console.log(newA)

a.fn('a')
newA.fn('newA')
```



```js
let obj1 = {
    name: 'qianguyihao',
    age: 28,
    info: {
        desc: 'hello',
    },
    color: ['red', 'blue', 'green'],
};
let obj2 = {};

deepCopy(obj2, obj1);
console.log(obj2);
obj1.info.desc = 'github';
console.log(obj2);

// 方法：深拷贝
function deepCopy(newObj, oldObj) {
    for (let key in oldObj) {
        // 获取属性值 oldObj[key]
        let item = oldObj[key];
        // 判断这个值是否是数组
        if (item instanceof Array) {
            newObj[key] = [];
            deepCopy(newObj[key], item);
        } else if (item instanceof Object) {
            // 判断这个值是否是对象
            newObj[key] = {};
            deepCopy(newObj[key], item);
        } else {
            // 简单数据类型，直接赋值
            newObj[key] = item;
        }
    }
}
```

https://www.cnblogs.com/dobeco/p/11295316.html



```js
function deepCopy( source ) {
    if (!isObject(source)) return source; //如果不是对象的话直接返回
    let target = Array.isArray( source ) ? [] : {} //数组兼容
    for ( var k in source ) {
        //Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。
        if (source.hasOwnProperty(k)) {
            if ( typeof source[ k ] === 'object' ) {//数组typeof 也是 object
                target[ k ] = deepCopy( source[ k ] )
            } else {
                target[ k ] = source[ k ]
            }
        }
    }
    return target
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}
```

### 原型与原型链

  * **每个函数**都有一个prototype属性, 它默认指向一个Object对象(即称为: **原型对象**)
  * 原型对象中有一个属性constructor, **它指向函数对象**
  * 每个函数function都有一个**prototype，即显式原型** 。原型里的constructor又指向函数function
* 每个实例对象都有一个**\__proto__，可称为隐式原型**
* 对象的隐式原型的值为其对应构造函数的显式原型的值

<img src="JS%E5%9F%BA%E7%A1%80.assets/image-20210312200011477.png" alt="image-20210312200011477" style="zoom: 67%;" />

**原型链**：当我们使用或访问一个对象的属性或方法时：

- 它会先在对象自身中寻找，如果有则直接使用；

- 如果没有则会去原型对象中寻找，如果找到则直接使用；

- 如果没有则去原型的原型中寻找，直到找到Object对象的原型。

- *Object对象的原型没有原型*，如果在Object原型中依然没有找到，则返回 null

  *这样可以向上查找属性或方法的链式结构称为原型链*

  SubType.prototype = new SuperType(); 

  

  

  <img src="JS%E5%9F%BA%E7%A1%80.assets/image-20210312210642006.png" alt="image-20210312210642006" style="zoom:67%;" />

### 继承模式

#### 借用构造函数

利用call() apply() 在子类构造函数中调用父类构造函数。

缺点：1. 每个实例都拷贝一份，占用内存大，尤其是方法过多的时候。（函数复用又无从谈起了，本来我们用 prototype 就是解决复用问题的）

　　2. 方法都作为了实例自己的方法，当需求改变，要改动其中的一个方法时，之前所有的实例，他们的该方法都不能及时作出更新。只有后面的实例才能访问到新方法。

```js
function SuperType() { 
 	this.colors = ["red", "blue", "green"]; 
    
} 
function SubType() { 
 // 继承 SuperType 
 	SuperType.call(this); 
} 
let instance1 = new SubType(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
let instance2 = new SubType(); 
console.log(instance2.colors); // "red,blue,green"
```

#### 组合继承

  

```js
function SuperType(name){ 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age){ 
 // 继承属性
 SuperType.call(this, name); //第一次调用父类的构造方法
 this.age = age; 
} 
// 继承方法
SubType.prototype = new SuperType(); //第二次调用父类的构造方法
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
}; 
let instance1 = new SubType("Nicholas", 29); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
instance1.sayName(); // "Nicholas"; 
instance1.sayAge(); // 29 
let instance2 = new SubType("Greg", 27); 
console.log(instance2.colors); // "red,blue,green" 
instance2.sayName(); // "Greg"; 
instance2.sayAge(); // 27原型式继承
```

#### 原型式继承

 **Object.create()**方法接收两个参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时，Object.create()与这里的 object()方法效果相同：

```javascript
let person = { 
 name: "Nicholas", 
 friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = Object.create(person);
anotherPerson.name = "Greg"; 
anotherPerson.friends.push("Rob"); 
```

Object.create()的第二个参数与 Object.defineProperties()的第二个参数一样：每个新增

属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。比如：

```js
let person = { 
 name: "Nicholas", 
 friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = Object.create(person, { 
 name: { 
 value: "Greg" 
 } 
}); 
console.log(anotherPerson.name); // "Greg"
```

**原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。**

#### 寄生式组合继承

组合继承其实也存在效率问题。最主要的效率问题就是**父类构造函数始终会被调用两次**：一次在是创建子类原型时调用，另一次是在子类构造函数中调用。本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了。

```js
function SuperType(name) { 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age){ 
 SuperType.call(this, name); // 第二次调用 SuperType() 
 this.age = age; 
} 
SubType.prototype = new SuperType(); // 第一次调用 SuperType() 
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
};
let ss = new SubType()
console.log(ss);
```



![image-20210313094813796](JS%E5%9F%BA%E7%A1%80.assets/image-20210313094813796-16274694820731.png)

*寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法*。基本思路是**不通过调用父类构造函数给子类原型赋值**，而是取得父类原型的一个副本。说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。寄生式组合继承的基本模式如下所示：

```js
function inheritPrototype(subType, superType) { 
 let prototype = Object.create(superType.prototype); // 创建对象
 prototype.constructor = subType; // 增强对象 
 subType.prototype = prototype; // 赋值对象
}
function Father(name) { 
 this.name = name; 
 this.money = ["122", "222", "333"]; 
} 
Father.prototype.father_func = function() { 
 console.log(this.name); 
}; 
function Son(name, book) { 
 Father.call(this, name); 
 this.book = book; 
} 
inheritPrototype(Son, Father); 
//将子类的原型的原型设置为父类的原型
   //Son.prototype = Object.create(Father.prototype)
//Object.setPrototypeOf(Son.prototype,Father.prototype)
Son.prototype.Reading = function() { 
 console.log(this.book); 
};
let ss = new Son()
console.log(ss);
```

Son.prototype = Object.create(Father.prototype)

![image-20210728192233257](JS%E5%9F%BA%E7%A1%80.assets/image-20210728192233257.png)

Object.setPrototypeOf(Son.prototype,Father.prototype)

![image-20210728192345161](JS%E5%9F%BA%E7%A1%80.assets/image-20210728192345161.png)



inheritPrototype(Son, Father); 

![image-20210728192545409](JS%E5%9F%BA%E7%A1%80.assets/image-20210728192545409.png)

## 类的 prototype 属性和__proto__属性

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。**Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。**

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

上面代码中，子类`B`的`__proto__`属性指向父类`A`，子类`B`的`prototype`属性的`__proto__`属性指向父类`A`的`prototype`属性。

这样的结果是因为，类的继承是按照下面的模式实现的。

```javascript
class A {
}

class B {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();
```

《对象的扩展》一章给出过`Object.setPrototypeOf`方法的实现。

```javascript
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

因此，就得到了上面的结果。

## [Object静态方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object#静态方法)

- [`Object.assign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

  通过复制*一个或多个*对象来*创建一个新的对象*。

- [`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

  使用*指定的原型对象*和属性创建一个新对象。

- [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

  给对象添加一个属性并指定该属性的*配置*。

- [`Object.defineProperties()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

  给对象添加多个属性并分别指定它们的配置。

- [`Object.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

  返回给定对象自身可枚举属性的 `[key, value]` 数组。

  ```js
  const object1 = {
    a: 'somestring',
    b: 42,
    c:function(){
      let d = 1;
    },
    d:{
  	w:10,
      j:{
        f:3
      }
    }
  };
  
  for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
  }
  //a: somestring
  //b: 42
  //c: function(){
   //   let d = 1;
   // }
  //d: [object Object]
  ```

  

- [`Object.freeze()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

  冻结对象：其他代码不能删除或更改任何属性。

- [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

  返回对象指定的属性*配置*。

- [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

  返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。

- [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)

  返回一个数组，它包含了指定对象自身所有的符号属性。

- [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)

  返回指定对象的原型对象。

- [`Object.is()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

  比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。

- [`Object.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)

  判断对象是否可扩展。

- [`Object.isFrozen()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)

  判断对象是否已经冻结。

- [`Object.isSealed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)

  判断对象是否已经密封。

- [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

  返回一个包含所有给定对象**自身**可枚举属性名称的数组。

- [`Object.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)

  防止对象的任何扩展。

- [`Object.seal()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

  防止其他代码删除对象的属性。

- [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

  设置对象的原型（即内部 `[[Prototype]]` 属性）。

- [`Object.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

  返回给定对象自身可枚举值的数组。
