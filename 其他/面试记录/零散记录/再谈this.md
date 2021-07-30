一般函数里面才有this，或者才使用this,

而this指向是对象（不考虑函数对象的情况）， `this`代表函数运行时所在的对象，而箭头函数的this指的是定义箭头函数时所在的函数运行时所处的对象，也就是指向定义时上层函数所在的对象

https://www.jianshu.com/p/5f8440535a2a

```js
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    let a = 1;
    function b(){
        console.log('b')
        console.log(this)
    }
    b();
    let c = () =>{
        console.log('c')
        console.log(this)
    }
    c();
  }
};
group.showList()
VM169:8 b
VM169:9 Window {window: Window, self: Window, document: document, name: "", location: Location, …}
VM169:13 c
VM169:14 {title: "Our Group", students: Array(3), showList: ƒ}
undefined
```

