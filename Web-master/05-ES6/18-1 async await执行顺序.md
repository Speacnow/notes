https://blog.csdn.net/weixin_44224510/article/details/116572352

## async函数

**async 函数作用**就是**返回**一个**Promise 对象**，然后可以使用`then`方法添加回调函数。

> 通过 `Promise.resolve()` 封装成 Promise 对象，如果没有return，则`Promise.resolve(undefined)`。

## await命令
await (async wait，异步等待)作用就是**等待一个** async 函数/Promise 对象/任意表达式结果的**返回值**。await只能在async函数中出现。

async函数必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变。

> 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值（包装成promise）。

##async/await执行顺序

await是一个让出线程的标志。

1.先执行async里面的代码直至遇到await，它会阻塞函数内后面代码的执行。同步代码输出，遇到微任务/宏任务放入相应队列里。

2.执行await后紧跟的语句(如await Fn()的Fn函数，而不是下一行代码)。

3.执行完毕后跳出整个**async函数**，接着执行后面js栈的代码。

4.**等本轮事件循环执行完毕**，再跳回到async函数中等待await后面表达式的返回值

如果返回值不是promise，则继续执行async函数后面的代码，

如果是promise

如果await后面是async函数，默认返回值是Promise.resolve(undefined)，执行后面的代码完毕后会立即注册一个微任务，再跳出async函数接着注册外面的微任务Promise.then。注意该微任务执行也没有什么内容。

还有一种顺序是执行完毕后面的代码后立即跳出async函数，先注册外面的微任务，后续跳回async函数再注册里面的微任务。

这块有争议，不同浏览器显示注册顺序的结果不同。

Promise没有返回值，那么它的状态是pending，await会始终等待，因此不会执行await后面的代码
Promise有返回值，会执行await后面的代码

```js
        async function async1() {
            console.log("async1 start");
            let vv = await async2();
            console.log(vv);
            console.log("async1 end");

        }
        async function async2() {
            setTimeout(console.log, 0, "5555")
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log("444-----");
                    resolve("444")
                }, 0);
            })

            setTimeout(console.log, 0, "3333")
        }
        console.log("script start");
        setTimeout(function () {
            console.log("settimeout");
        }, 0);
        async1();
        new Promise(function (resolve) {
            console.log("promise1");
            resolve();
        }).then(function () {
            console.log("promise2");//微任务，先执行
        });
        console.log('script end');

```

![image-20210607174435961](18-1%20async%20await%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F.assets/image-20210607174435961.png)

```
async function testSometing() {
    console.log("testSomething");
    return Promise.resolve("hello async");
}

async function testAsync() {
    console.log("testAsync");
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");

    const testFn1 = await testSometing();
    console.log(testFn1);

    const testFn2 = await testAsync();
    console.log(testFn2);

    console.log('test end...');
}

test();

var promiseFn = new Promise((resolve)=> { 
                    console.log("promise START...");
                    resolve("promise RESOLVE");
                });
promiseFn.then((val)=> console.log(val));

console.log("===END===")

作者：大Y
链接：https://juejin.cn/post/6844903621360943118
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

