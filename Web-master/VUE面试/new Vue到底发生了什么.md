# new Vue到底发生了什么（2.0）

### Vue 实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的：

```
var vm = new Vue({
  // 选项
})
复制代码
```

一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。当这些数据改变时，视图会进行重渲染。

### 初始化及挂载

在 new Vue() 之后。 Vue 会调用 _init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」。



![img](https://user-gold-cdn.xitu.io/2019/6/25/16b8f3a55dd6dde2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

初始化之后调用 $mount 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行「编译」步骤。





![img](https://user-gold-cdn.xitu.io/2019/6/25/16b8f3aaaa339102?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



mount挂载 vue也可以使用render函数，render函数的参数是createElement(h),createElement有三个参数，分别是标签、attrs属性对象、内容数组，这样写反人性，所有日常还是使用template。

### 编译

compile编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function。

- parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成抽象语法树AST（动态生成语法树）
- optimize 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。
- generate 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串。

在经历过 parse、optimize 与 generate 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function 了

### 响应式



![img](https://user-gold-cdn.xitu.io/2019/6/25/16b8f3dc338d8bbe?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在 init 的时候通过 Object.defineProperty 进行了绑定，它使得当被设置的对象被读取的时候会执行 getter 函数，而在当被赋值的时候会执行 setter 函数。



当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 getter 函数进行「依赖收集」，「依赖收集」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中。形成如下所示的这样一个关系。



![img](https://user-gold-cdn.xitu.io/2019/6/25/16b8f3e30f195a8f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在修改对象的值的时候，会触发对应的 setter， setter 通知之前 「依赖收集」 得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher 就会开始调用 update 来更新视图，当然这中间还有一个 patch 的过程以及使用队列来异步更新的策略



### Virtual DOM

render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

```
{
    tag: 'div',                 /*说明这是一个div标签*/
    children: [                 /*存放该标签的子节点*/
        {
            tag: 'a',           /*说明这是一个a标签*/
            text: 'click me'    /*标签的内容*/
        }
    ]
}
复制代码
```

渲染后可以得到

```
<div>
    <a>click me</a>
</div>
复制代码
```

### 更新视图



![img](https://user-gold-cdn.xitu.io/2019/6/25/16b8f3f9ec6dfb16?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

修改一个对象值的时候，会通过 setter -> Watcher -> update 的流程来修改对应的视图，那么最终是如何更新视图的呢？



当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们如果想要得到新的视图，最简单粗暴的方法就是直接解析这个新的 VNode 节点，然后用 innerHTML 直接全部渲染到真实 DOM 中。但是其实我们只对其中的一小块内容进行了修改，这样做似乎有些「浪费」。

那么我们为什么不能只修改那些 「改变了的地方」 呢？这个时候就要介绍我们的「patch」了。我们会将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的 「差异」 。最后我们只需要将这些 「差异」 的对应 DOM 进行修改即可。

事实上。vue2并没有实现节点上vdom更新，在vue3上才有望实现（2019vueconf大会尤雨奚）

new vue 初始化-mounted挂载-compile-render-createElement虚拟节点-(返回普通vnode或者createcomponents创建一个组件vnode，这个节点是vue的一个子类,总之返回的都是vnode，这个vnode可能有若干个子节点，它们也是vnode类型，这里就可以描述为vnode-tree)-update->patch(createElm作用是，如果vnode是普通的节点就创建真实的dom节点插入父元素下，如果节点vnode 的tag标明是组件，根据vnode创建一个组件节点，并且执行相应的钩子函数，这个过程就是遍历所有的子vnode,如果它的子节点vnode又是个组件，重复刚才的过程render-创建虚拟节点，这个过程是一个深度优先遍历的算法。