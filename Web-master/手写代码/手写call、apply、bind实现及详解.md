# 手写call、apply、bind实现及详解

# 它们有什么不同？怎么用？

call 接收多个参数，第一个为函数上下文也就是this，后边参数为函数本身的参数。

```js
        let obj = {
            name: "一个"
        }

        function allName(firstName, lastName) {
            console.log(this)
            console.log(`我的全名是“${firstName}${this.name}${lastName}”`)
        }
        // 很明显此时allName函数是没有name属性的
        allName('我是', '前端') //我的全名是“我是前端”  this指向window
        allName.call(obj, '我是', '前端') //我的全名是“我是一个前端” this指向obj
复制代码
```



![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/3/168b121940564627~tplv-t2oaga2asx-watermark.awebp)



## apply

apply接收两个参数，第一个参数为函数上下文this，第二个参数为函数参数只不过是通过一个数组的形式传入的。

```js
allName.apply(obj, ['我是', '前端'])//我的全名是“我是一个前端” this指向obj
复制代码
```

## bind

bind 接收多个参数，第一个是bind返回值*返回值是一个函数*上下文的this，不会立即执行。

```js
        let obj = {
            name: "一个"
        }

        function allName(firstName, lastName, flag) {
            console.log(this)
            console.log(`我的全名是"${firstName}${this.name}${lastName}"我的座右铭是"${flag}"`)
        }
        allName.bind(obj) //不会执行
        let fn = allName.bind(obj)
        fn('我是', '前端', '好好学习天天向上')

        // 也可以这样用，参数可以分开传。bind后的函数参数默认排列在原函数参数后边
        fn = allName.bind(obj, "你是")
        fn('前端', '好好学习天天向上')
复制代码
```

接下来搓搓手实现call、apply和bind

## 实现call

```js
      let Person = {
            name: 'Tom',
            say() {
                console.log(this)
                console.log(`我叫${this.name}`)
            }
        }

        // 先看代码执行效果
        Person.say() //我叫Tom 
        Person1 = {
            name: 'Tom1'
        }

        // 我们尝试用原生方法call来实现this指向Person1
        Person.say.call(Person1) //我叫Tom1

复制代码
```

通过第一次打印执行和第二次打印执行我发现，如果Person1有say方法那么Person1直接执行Person1.say() 结果就是我是Tom1,是的call就是这么实现的。 再看代码

```js
        Function.prototype.MyCall = function(context) {
            //context就是demo中的Person1
            // 必须此时调用MyCall的函数是say方法，那么我们只需要在context上扩展一个say方法指向调用MyCall的say方法这样this
            console.log(this)
            context.say = this //Mycall里边的this就是我们虚拟的say方法
            context.say()
        }
        // 测试
        Person.say.MyCall(Person1)//我叫Tom1
复制代码
```



![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/3/168b1219408803b4~tplv-t2oaga2asx-watermark.awebp)

perfect！爆棚的满足感！不过拿脚趾头想想也不会这么简单，继续完善 我们自己找茬 1、call支持多个参数，有可能一个也不没有 2、考虑多参数时要把参数传给扩展方法。 3、给上下文定义的函数要保持唯一不能是say 4、扩展完我们需要吧自定义函数删除 接下来针对找茬问题一一解决



```
        let Person = {
            name: 'Tom',
            say() {
                console.log(this)
                console.log(`我叫${this.name}`)
            }
        }
        Person1 = {
            name: 'Tom1'
        }
        //如果没有参数
        Person.say.call()
复制代码
```



![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/3/168b1219406d159f~tplv-t2oaga2asx-watermark.awebp)



##### 没有指定this，this指向window

我们也要这样

```
        Function.prototype.MyCall = function(context) {
            // 如果没有参数我们参考call的处理方式
            context = context || window
                //context就是demo中的Person1
                // 必须此时调用MyCall的函数是say方法，那么我们只需要在context上扩展一个say方法指向调用MyCall的say方法这样this
            context.say = this //Mycall里边的this就是我们虚拟的say方法
            context.say()
        }

        Person.say.MyCall()
复制代码
```



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/3/168b12194082dd4e~tplv-t2oaga2asx-watermark.awebp)

没毛病！ 继续解决



```
// 找茬2：我们默认定义context.say = this  fn如果已经被占用 嘎嘎 sb了。 不怕 搞定它

        // say需要是一个唯一值 是不是突然想到es6的新类型 Symbol   fn = Symbol() 不过我们装逼不嫌事大 都说自己实现了

        function mySymbol(obj) {
            // 不要问我为什么这么写，我也不知道就感觉这样nb
            let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
                // 牛逼也要严谨
            if (obj.hasOwnProperty(unique)) {
                return mySymbol(obj) //递归调用
            } else {
                return unique
            }
        }
//接下来我们一并把多参数和执行完删除自定义方法删除掉一块搞定
        Function.prototype.myCall1 = function(context) {
            // 如果没有传或传的值为空对象 context指向window
            context = context || window
            let fn = mySymbol(context)
            context[fn] = this //给context添加一个方法 指向this
            // 处理参数 去除第一个参数this 其它传入fn函数
            let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
            context[fn](...arg) //执行fn
            delete context[fn] //删除方法
        }
        
        let Person = {
            name: 'Tom',
            say(age) {
                console.log(this)
                console.log(`我叫${this.name}我今年${age}`)
            }
        }

        Person1 = {
            name: 'Tom1'
        }

        Person.say.call(Person1,18)//我叫Tom1我今年18
复制代码
```

测试结果相当完美！

## 实现apply

接下来apply就简单多了，只有多参数时第二个参数是数组，就不一步步细说了。

```
        Function.prototype.myApply = function(context) {
            // 如果没有传或传的值为空对象 context指向window
            if (typeof context === "undefined" || context === null) {
                context = window
            }
            let fn = mySymbol(context)
            context[fn] = this //给context添加一个方法 指向this
                // 处理参数 去除第一个参数this 其它传入fn函数
            let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
            context[fn](arg) //执行fn
            delete context[fn] //删除方法

        }
复制代码
```

## 实现bind

这个和call、apply区别还是很大的，容我去抽根烟回来收拾它 还是老套路先分析bind都能干些什么，有什么特点 1、函数调用，改变this 2、返回一个绑定this的函数 3、接收多个参数 4、支持柯里化形式传参 fn(1)(2)

```
       Function.prototype.bind = function(context) {
            //返回一个绑定this的函数，我们需要在此保存this
            let self = this
                // 可以支持柯里化传参，保存参数
            let arg = [...arguments].slice(1)
                // 返回一个函数
            return function() {
                //同样因为支持柯里化形式传参我们需要再次获取存储参数
                let newArg = [...arguments]
                console.log(newArg)
                    // 返回函数绑定this，传入两次保存的参数
                    //考虑返回函数有返回值做了return
                return self.apply(context, arg.concat(newArg))
            }
        }

        // 搞定测试
        let fn = Person.say.bind(Person1)
        fn()
        fn(18)
复制代码
```



![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/3/168b1219409eac64~tplv-t2oaga2asx-watermark.awebp)



是的，完美，实现了绑定this，返回函数，不立即执行，可以柯里化形式传参。柯里化相关讲解请移步：[segmentfault.com/a/119000001…](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000017998127)

简版的实现就算完成了

欢迎吐槽or点赞！