





## JavaScript

### 存储相关：请描述以下cookie、localStorage、sessionStorage的区别


> 在H5之前，cookie一直都是本地存储的一个重要的方法。直到后面的两个出现了， 就开始用后面的两个做本地存储。


**1、cookie**：

- 本身用于客户端和服务器端的通信。

- 但是它有本地存储的功能，于是就被“借用”。

我们可以通过`document.cookie`获取和修改cookie，获取到的其实就是一个字符串。


cookie用于存储时的缺点：

- 存储量太小，只有4kb
- 所有http请求都带着，会影响获取资源的效率
- api简单，需要封装才能用。`document.cookie = ...`

cookie是在HTML4中使用的给客户端保存数据的，也可以和session配合实现跟踪浏览器用户身份；而webstorage（包括：localStorage和sessionStorage）是在HTML5提出来的，纯粹为了保存数据，不会与服务器端通信。WebStorage两个主要目标：（1）提供一种在cookie之外存储会话数据的路径。（2）提供一种存储大量可以跨会话存在的数据的机制。

 

相同点：

 cookie，localStorage，sessionStorage都是在客户端保存数据的，存储数据的类型：都是字符串。

不同点：

1、生命周期：

1）、cookie如果不设置有效期，那么就是临时存储（存储在内存中），是会话级别的，会话结束后，cookie也就失效了，如果设置了有效期，那么cookie存储在硬盘里，有效期到了，就自动消失了。

2）、localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。

3）、sessionStorage仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。

 可以简单的理解为：sessionStorage，没有设置有效期的cookie。

                               如果说把cookie的有效期设置为永远永远，永久，那么就是localStorage。
    
                                             cookie没有设置有效期，那么就是sessionStorage

2、网络流量：cookie的数据每次都会发给服务器端，而localstorage和sessionStorage不会与服务器端通信，纯粹为了保存数据，所以，webstorage更加节约网络流量。

3、大小限制：cookie大小限制在4KB，非常小；localstorage和sessionStorage在5M

4、安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获。

5、使用方便性上：WebStorage提供了一些方法，数据操作比cookie方便；
------------------------------------------------
版权声明：本文为CSDN博主「田江」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/jiang7701037/article/details/89118086



## HTML5

### HTML5新增了哪些内容或API？使用过哪些？

新元素：

- `<section>`、`<footer>` 和 `<header>`等


新的api：

- 网络存储: sessionStorage 和 localStorage



参考链接：

- [笔记：阿里、网易、滴滴共十次前端面试碰到的问题](https://zhoukekestar.github.io/notes/2017/06/07/interview-answers.html)


## CSS

### 如何让一个div元素隐藏？你能想到的方式有几种？

-



## ES6

### for each、for in、for of的区别

- `foreach`用于遍历数组，是数组的一个方法。不支持 return。

- `for in`获取对象里属性的键。

- `for of`获取对象里属性的值。



## 网络相关

### 浏览器输入url到显示内容，有哪些过程


（1）浏览器解析url。包括：协议、域名、端口号、资源路径、参数查询

（2）DNS解析

（3）TCP握手

（4）HTTP请求

（5）服务器处理请求

（6）浏览器渲染：DOM tree、CSS rule tree、render tree。

（7）display


参考链接：


- [笔记：阿里、网易、滴滴共十次前端面试碰到的问题](https://zhoukekestar.github.io/notes/2017/06/07/interview-answers.html)

- [what-happens-when-zh_CN](https://github.com/skyline75489/what-happens-when-zh_CN)


- [码农翻身 | 小白科普：从输入网址到最后浏览器呈现页面内容，中间发生了什么？](https://mp.weixin.qq.com/s/3_DZKSP492uq9RfQ3eW4_A)

- 从输入URL到页面加载发生了什么：<https://segmentfault.com/a/1190000006879700>








## GitHub

- [荐]面试题和答案：<https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers>


- 面试题和答案：<https://github.com/qiu-deqing/FE-interview>

有个题是，浏览器输入url，有哪些过程

- [讲到了Cookie和session](https://github.com/WarpPrism/Blog/issues/5)

- 这个也很全：<https://github.com/gnipbao/Front-end-Interview-questions>

- <https://github.com/giscafer/front-end-manual/issues/3>









## 按时间排列

### 2018-03-11


- web前端面试题汇总：<https://www.jianshu.com/p/2f7eb1ad7174>

- 2017前端面试题及答案总结：<https://yeaseonzhang.github.io/2017/09/17/2017%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98%E5%8F%8A%E7%AD%94%E6%A1%88%E6%80%BB%E7%BB%93/>


### 2018-03-12-今日头条面试题

- [ 今日头条一面笔试面试题！！！！！完整](http://blog.csdn.net/github_35924246/article/details/75675901)

