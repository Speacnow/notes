# 前端面试题：vue响应式原理 Vdom diff

https://blog.csdn.net/Hunt_bo/article/details/108163869

vue的响应式原理，也算是面试中再常见不过的题目了，之前遇见这道题目只会说：利用的是**Object.defineProperty**进行的数据劫持，监听数据的变化，通知watcher进行的数据更新。

现在最流行的框架非vue，react莫属，他们流行起来的原因，离不开响应式，因为它在做一些数据更新的时候，会去更新相应的视图，把我们从操作DOM中释放出来，让我们不再去自己操作dom，这也就是所说的数据驱动吧。

React是通过this.setState去改变数据，然后根据新的数据重新渲染出虚拟DOM，最后通过对比虚拟DOM找到需要更新的节点进行更新。也就是说React是依靠着虚拟DOM以及DOM的diff算法做到这一点的。







https://www.cnblogs.com/chenwenhao/p/11258895.html#_label0





