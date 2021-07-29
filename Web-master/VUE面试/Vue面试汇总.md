### 简述MVVM

**MVVM**是`Model-View-ViewModel`缩写，也就是把`MVC`中的`Controller`演变成`ViewModel。Model`层代表数据模型，`View`代表UI组件，`ViewModel`是`View`和`Model`层的桥梁，数据会绑定到`viewModel`层并自动将数据渲染到页面中，视图变化的时候会通知`viewModel`层更新数据。

### 谈谈对vue生命周期的理解？

- [vue实例的生命周期](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期)：从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期。


- [生命周期钩子](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)：就是生命周期事件的别名而已。

生命周期钩子 = 生命周期函数 = 生命周期事件。

![](http://img.smyhvae.com/20180422_1650.png)

- beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 **data 和 methods** 属性
- created：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有**开始 编译模板**。我们**可以在这里进行Ajax请求**。
- beforeMount：此时已经**完成了模板的编译**，但是还没有挂载到页面中
- mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示。（mounted之后，表示**真实DOM渲染完了，可以操作DOM了**）
- beforeUpdate：状态更新之前执行此函数， **此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的**，因为此时还没有开始重新渲染DOM节点
- updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了。
- beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
- destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

PS：可以在beforeDestroy里**清除定时器、或清除事件绑定**。

###  Vue Dom的异步更新与nextTick

https://www.cnblogs.com/jin-zhe/p/9985436.html

https://www.jianshu.com/p/a7550c0e164f

具体原因在Vue的官方文档中详细解释：

> Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和`MessageChannel`，如果执行环境不支持，会采用 `setTimeout(fn, 0)`代替。

> 例如，当你设置`vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用`Vue.nextTick(callback)` 。这样回调函数在 DOM 更新完成后就会调用。

1. `nextTick`是`Vue`提供的一个全局`API`,是在下次`DOM`更新循环结束之后执行延迟回调（就是当下次dom更新完毕之后再执行nextTick函数里面的内容），在修改数据之后使用`$nextTick`，则可以在回调中获取更新后的`DOM`；
2. Vue在更新DOM时是异步执行的。只要侦听到数据变化，`Vue`将开启1个**队列**，将同一事件循环中所有数据变更集中在一起。如果同一个`watcher`被多次触发，只会被推入到队列中1次。这种在缓冲时去除重复数据对于避免不必要的计算和`DOM`操作是非常重要的。`nextTick`方法会在队列末尾中加入一个回调函数，确保该函数在前面的dom操作完成后才调用；
3. 比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可；
4. 实现方法。。。

### computed与watch

**watch 属性监听** 是一个对象，键是需要观察的属性，值是对应回调函数，主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作,监听属性的变化，需要在数据变化时执行异步或开销较大的操作时使用

**computed 计算属性** 属性的**结果会被缓存**，当`computed`中的函数所依赖的属性没有发生改变的时候，那么调用当前函数的时候结果会从缓存中读取。除非依赖的响应式属性变化时才会重新计算，主要当做属性来使用 `computed`中的函数必须用`return`返回最终的结果 `computed`更高效，优先使用

**使用场景**： `computed`：当一个属性受多个属性影响的时候使用，例：购物车商品结算功能； `watch`：当一条数据影响多条数据的时候使用，例：搜索数据

### v-for中key的作用

https://juejin.cn/post/6899602713860898830

1. `key`的作用主要是为了更高效的**对比虚拟DOM中每个节点是否是相同节点**;

2. 对于用`v-for`渲染的**列表**数据来说，数据量可能一般很庞大，而且我们经常还要对这个数据进行一些增删改操作。假设我们给列表增加一条数据，整个列表都要重新渲染一遍，那不就很费事了。而`key`的出现就是尽可能的回避这个问题，提高效率，如果我们给列表增加了一条数据，页面只渲染了这数据，那不就很完美了。

   `v-for`默认使用就地复用策略，列表数据修改的时候，他会根据key值去判断某个值是否修改，如果修改，则重新渲染这一项，否则复用之前的元素。

### vue组件的通信方式

#### 父子组件通信

https://juejin.cn/post/6844903887162310669

常见使用场景可以分为三类:

- 父子组件通信: `props`; `$parent` / `$children`; `provide` / `inject` ; `ref` ;  `$attrs` / `$listeners`
- 兄弟组件通信: `eventBus` ; 	vuex
- 跨级通信:  `eventBus`；Vuex；`provide` / `inject` 、`$attrs` / `$listeners`

### 常用指令

- v-if：判断是否隐藏；
- v-for：数据循环出来；
- v-bind:class：绑定一个属性；
- v-model：实现双向绑定

### 双向绑定实现原理

https://juejin.cn/post/6844903698166988808

**数据劫持结合发布订阅模式**

当一个**Vue**实例创建时，Vue会遍历data选项的属性，用 **Object.defineProperty** 将它们转为 getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher重新计算，从而致使它关联的组件得以更新。

当一个**Vue**实例创建时，Observer 监听器深度递归遍历vm实例data对象，对象的每一层利用 **Object.defineProperty** 的 getter/setter监听，并且在内部收集相关依赖（Dep列表收集Watcher），所以在属性被访问和修改时通知变化（setter监听，Dep通知Watcher 触发回调函数），Watcher 触发回调函数更新视图

- Observer 监听器：用来监听属性的变化通知订阅者。Observer会监听对象每一层，每一层都会有一个Dep订阅者列表
- Watcher 订阅者：收到属性的变化，然后更新视图。初始化时会最先访问data[key]，触发Observer.get监听，Dep会将其收集
- Dep：订阅者列表。Observer.set会监听data[key]的改变，如果有改变，就让Dep通知每一个Watcher触发其回调函数修改视图
- Compile 解析器：解析指令，初始化模版，绑定订阅者

### v-model的实现以及它的实现原理吗？

1. `vue`中双向绑定是一个指令`v-model`，可以绑定一个动态值到视图，同时视图中变化能改变该值。`v-model`是语法糖，默认情况下相于:`:value和@input`。表单改变，数据也改变，数据改变，表单也改变，以下为示意图：

   ![](https://img-blog.csdnimg.cn/20190821175523461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ppYW5nNzcwMTAzNw==,size_16,color_FFFFFF,t_70)

2. 使用`v-model`可以减少大量繁琐的事件处理代码，提高开发效率，代码可读性也更好

3. 通常在表单项上使用`v-model`

### vnode虚拟DOM

Virtual DOM是对DOM的抽象,本质上是JavaScript对象,这个对象就是更加轻量级的对DOM的描述.

**首先,我们都知道在前端性能优化的一个秘诀就是尽可能少地操作DOM,不仅仅是DOM相对较慢,更因为频繁变动DOM会造成浏览器的回流或者重回,**这些都是性能的杀手,因此我们需要这一层抽象,在*patch过程*中尽可能地*一次性将差异更新到DOM中*,这样保证了DOM不会出现性能很差的情况.

其次,**现代前端框架的一个基本要求就是无须手动操作DOM**,一方面是因为手动操作DOM无法保证程序*性能*,多人协作的项目中如果review不严格,可能会有开发者写出性能较低的代码,另一方面更重要的是省略手动DOM操作可以*大大提高开发效率*.

最后,也是Virtual DOM最初的目的,就是更好的跨平台,比如Node.js就没有DOM,如果想实现SSR(**服务端渲染**),那么一个方式就是借助Virtual DOM,因为Virtual DOM本身是JavaScript对象.

### compiler和patch的过程



patcher:例如当`data`中定义了一个变量`a`，并且模板中也使用了它，那么这里生成的`Watcher`就会加入到`a`的订阅者列表中。当`a`发生改变时，对应的订阅者收到变动信息，这时候就会触发`Watcher`的`update`方法，实际`update`最后调用的就是在这里声明的`updateComponent`。
 当数据发生改变时会触发回调函数`updateComponent`，`updateComponent`是对`patch`过程的封装。`patch`的本质是将新旧`vnode`进行比较，创建、删除或者更新`DOM`节点/组件实例。





```javascript
vnode 虚拟DOM节点 创建：
export function Vnode (){
    return {
        tag:'div',
        children: 'span',
        attr:'',
        text:'你好!'
    }
}
复制代码
```

### new Vue后整个的流程

- `initProxy`：作用域代理，拦截组件内访问其它组件的数据。
- `initLifecycle`：建立父子组件关系，在当前组件实例上添加一些属性和生命周期标识。如`[Math Processing Error]parent,parent,refs,$children,_isMounted`等。
- `initEvents`：对父组件传入的事件添加监听，事件是谁创建谁监听，子组件创建事件子组件监听
- `initRender`：声明[Math Processing Error]slots和slots和createElement()等。
- `initInjections`：注入数据，初始化inject，一般用于组件更深层次之间的通信。
- `initState`：重要）数据响应式：初始化状态。很多选项初始化的汇总：data,methods,props,computed和watch。
- `initProvide`：提供数据注入。

**思考：为什么先注入再提供呢？？**

答：1、首先来自祖辈的数据要和当前实例的data,等判重，相结合，所以注入数据的initInjections一定要在`InitState`的上面。2. 从上面注入进来的东西在当前组件中转了一下又提供给后代了，所以注入数据也一定要在上面。

`vm.[Math Processing Error]mount(vm.mount(vm.options.el)`：挂载实例。

### keep-alive的实现

作用：实现组件缓存

#### 钩子函数：

```
`activated `组件渲染后调用
`deactivated `组件销毁后调用
复制代码
```

原理：`Vue.js`内部将`DOM`节点抽象成了一个个的`VNode`节点，`keep-alive`组件的缓存也是基于`VNode`节点的而不是直接存储`DOM`结构。它将满足条件`（pruneCache与pruneCache）`的组件在`cache`对象中缓存起来，在需要重新渲染的时候再将`vnode`节点从`cache`对象中取出并渲染。

#### 配置属性：

`include` 字符串或正则表达式。只有名称匹配的组件会被缓存

`exclude` 字符串或正则表达式。任何名称匹配的组件都不会被缓存

`max` 数字、最多可以缓存多少组件实例

### vuex、vue-router实现原理

`vuex`是一个专门为vue.js应用程序开发的状态管理库。 核心概念：

- `state`(单一状态树) `getter/Mutation`显示提交更改`state`
- `Action类似Mutation`，提交`Mutation`，可以包含任意异步操作。
- `module`(当应用变得庞大复杂，拆分`store`为具体的`module`模块)

### 你怎么理解Vue中的diff算法?

<img src="https://user-gold-cdn.xitu.io/2018/5/19/163777930be304eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom: 80%;" />

在js中,渲染真实`DOM`的开销是非常大的, 比如我们修改了某个数据,如果直接渲染到真实`DOM`, 会引起整个`dom`树的重绘和重排。那么有没有可能实现只更新我们修改的那一小块dom而不要更新整个`dom`呢？此时我们就需要先根据真实`dom`生成虚拟`dom`， 当虚拟`dom`某个节点的数据改变后会生成有一个新的`Vnode`, 然后新的`Vnode`和旧的`Vnode`作比较，发现有不一样的地方就直接修改在真实DOM上，然后使旧的`Vnode`的值为新的`Vnode`。

**diff**的过程就是调用`patch`函数，比较新旧节点，一边比较一边给真实的`DOM`打补丁。在采取`diff`算法比较新旧节点的时候，比较只会在同层级进行。 在`patch`方法中，首先进行树级别的比较 `new Vnode`不存在就删除 `old Vnode`; `old Vnode` 不存在就增加新的`Vnode` ;

都存在就执行diff更新 当确定需要执行diff算法时，比较两个`Vnode`，包括三种类型操作：属性更新，文本更新，子节点更新 新老节点均有子节点，则对子节点进行`diff`操作，调用`updatechidren`; 如果老节点没有子节点而新节点有子节点，先清空老节点的文本内容，然后为其新增子节点; 如果新节点没有子节点，而老节点有子节点的时候，则移除该节点的所有子节点 老新老节点都没有子节点的时候，进行文本的替换

**updateChildren** 将`Vnode`的子节点Vch和oldVnode的子节点oldCh提取出来。 `oldCh和vCh`各有两个头尾的变量`StartIdx和EndIdx`，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了`key`，就会用`key`进行比较，在比较的过程中，变量会往中间靠，一旦`StartIdx>EndIdx`表明`oldCh和vCh`至少有一个已经遍历完了，就会结束比较。

### 你都做过哪些Vue的性能优化？

```javascript
编码阶段
尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
v-if和v-for不能连用
如果需要使用v-for给每项元素绑定事件时使用事件代理
SPA 页面采用keep-alive缓存组件
在更多的情况下，使用v-if替代v-show
key保证唯一
使用路由懒加载、异步组件
防抖、节流
第三方模块按需导入
长列表滚动到可视区域动态加载
图片懒加载
SEO优化
预渲染
服务端渲染SSR
打包优化
压缩代码
Tree Shaking/Scope Hoisting
使用cdn加载第三方模块
多线程打包happypack
splitChunks抽离公共文件
sourceMap优化
用户体验
骨架屏
PWA
还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。
```

### 你知道Vue3有哪些新特性吗？它们会带来什么影响？

- **性能提升**

更小巧、更快速 支持自定义渲染器 支持摇树优化：一种在打包时去除无用代码的优化手段 支持Fragments和跨组件渲染

- **API变动**

模板语法99%保持不变 原生支持基于class的组件，并且无需借助任何编译及各种stage阶段的特性 在设计时也考虑TypeScript的类型推断特性 `重写虚拟DOM`可以期待更多的编译时提示来减少运行时的开销 `优化插槽生成`可以单独渲染父组件和子组件 `静态树提升`降低渲染成本 `基于Proxy的观察者机制`节省内存开销

- **不兼容IE11**

`检测机制`更加全面、精准、高效,更具可调试式的响应跟踪

### 实现双向绑定 Proxy 与 Object.defineProperty 相比优劣如何?

1. **Object.definedProperty**的作用是*劫持一个对象的属性*，劫持属性的getter和setter方法，在对象的属性发生变化时进行特定的操作。而   *Proxy劫持的是整个对象*。
2. **Proxy**会返回一个代理对象，我们只需要操作新对象即可，而Object.defineProperty只能遍历对象属性直接修改。
3. **Object.definedProperty**不支持数组，更准确的说是不支持数组的各种API，因为如果仅仅考虑arry[i] = value 这种情况，是可以劫持   的，但是这种劫持意义不大。而Proxy可以支持数组的各种API。
4. 尽管Object.defineProperty有诸多缺陷，但是其兼容性要好于Proxy。


作者：伊人a
链接：https://juejin.cn/post/6989422484722286600
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。