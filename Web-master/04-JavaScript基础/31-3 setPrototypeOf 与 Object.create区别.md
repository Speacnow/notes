## 前言

> 可以用prototype访问的只有function类型，其他类型只能用getPrototypeOf或者_proto_,其他类型也都是通过function生成的（String,Number……涉及到隐式创建对象）

> 对象的原型只是一个引用，指向另外一个对象。对象原型之间的嵌套组成了原型链，原型链的作用是维护访问对象属性的查询，确定访问权限。

## 用法

> 若存在A和B俩个函数,让A的原型指向B

## 1.setPrortotypeOf

> Object.setPrototypeOf(A.prototype,B.prototype)

## 2.Create

> A.prototype = Object.create(B.prototype)

### 俩者都可以达到设置对象原型的功能,但是具体表现上有一些区别。

## 比较

> 假设有Animal和Plants俩个函数用于生成对象，并在原型上具备一些方法。 然后我们让Animal的原型指向Plants

### 初始代码如下

```js
    function Animal (name,sound) {
        this.name = name
        this.sound = sound
    }
    
    Animal.prototype.shout = function () {
        console.log(this.name + this.sound)
    }
    
    let dog = new Animal('pipi','wang!wang!')
    
    // 定义Plants
    function Plants (name) {
        this.name = name
        this.sound = null
    }
    
    // 函数接收参数用于区分
    Plants.prototype.shout = function (xssss) {
        console.log(this.name + this.sound +'plants tag')
    }
    
    Plants.prototype.genO2 = function () {
        console.log(this.name + '生成氧气。')
    }
复制代码
```

### 使用create

```js
    Animal.prototype = Object.create(Plants.prototype)
    console.log(Animal.prototype)
    /*
    Plants {}
        __proto__:
            shout: ƒ (xssss)
            genO2: ƒ ()
            constructor: ƒ Plants()
            __proto__: Object
    */
    let cat = new Animal('mimi','miao~miao~')
    
    dog.shout() // pipi wang!wang!
    cat.shout() // mimi miao~miao~ plants tag
    cat.genO2() // mimi 生成氧气。
复制代码
```

### 使用setPrototypeOf

```js
    Object.setPrototypeOf(Animal.prototype,Plants.prototype)
    console.log(Animal.prototype)
    /*
    Plants {shout: ƒ, constructor: ƒ}
        shout: ƒ (xssss)
        constructor: ƒ Animal(name,sound)
        __proto__:
        shout: ƒ ()
        genO2: ƒ ()
        constructor: ƒ Plants()
        __proto__: Object
    */
    dog.shout() // pipi wang!wang!
    cat.shout() // mimi miao~miao~
    cat.genO2() // mimi 生成氧气。
复制代码
```

# 总结

> 使用Object.create,Animal.prototype将**会指向一个空对象**，空对象的原型属性指向Plants的prototytpe。所以我们不能再访问Animal的原有prototypoe中的属性。Object.create的使用方式也凸显了直接重新赋值。

> 使用Object.setPrototypeOf则会将Animal.prototype将会指向Animal原有的prototype，然后这个prototype的prototype再指向Plants的prototytpe。所以我们优先访问的Animal，然后再是plants。就是说会保存原有protype的属性

> 在进行俩个原型之间的委托时使用setPrototype更好，Object.create更适和直接对一个无原生原型的对象快速进行委托。


作者：昀容
链接：https://juejin.cn/post/6844903527941144589
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。