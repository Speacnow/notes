JavaScript基础分为三个部分：

- ECMAScript：JavaScript的语法标准。包括变量、表达式、运算符、函数、if语句、for语句等。

- **DOM**：文档对象模型（Document object Model），操作**网页上的元素**的API。比如让盒子移动、变色、轮播图等。

- **BOM**：浏览器对象模型（Browser Object Model），操作**浏览器部分功能**的API。比如让浏览器自动滚动。

## 节点

**节点**（Node）：构成 HTML 网页的最基本单元。网页中的每一个部分都可以称为是一个节点，比如：html标签、属性、文本、注释、整个文档等都是一个节点。

虽然都是节点，但是实际上他们的具体类型是不同的。常见节点分为四类：

- 文档节点（文档）：整个 HTML 文档。整个 HTML 文档就是一个文档节点。

- 元素节点（标签）：HTML标签。

- 属性节点（属性）：元素的属性。

- 文本节点（文本）：HTML标签中的文本内容（包括标签之间的空格、换行）。

<img src="DOM%E5%9F%BA%E7%A1%80.assets/image-20210313111657046.png" alt="image-20210313111657046" style="zoom:50%;" />

## eventXY

<img src="DOM%E5%9F%BA%E7%A1%80.assets/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202021-07-28%20200236.png" alt="屏幕截图 2021-07-28 200236" style="zoom: 50%;" />



## 事件对象

*当事件的响应函数被触发时*，会产生一个事件对象`event`。浏览器每次都会将这个事件`event`作为实参传进之前的响应函数。

这个对象中包含了与当前事件相关的一切信息。比如鼠标的坐标、键盘的哪个按键被按下、鼠标滚轮滚动的方向等。

![](http://img.smyhvae.com/20180203_1739.png)

- **event.target返回触发事件的元素**

  一层一层的冒泡或者捕获，事件流到达某一个层级的dom，event.target就要指向那个层级

- **event.currentTarget返回事件绑定的元素**

  就是监听函数绑定在哪个元素，哪个元素就是event.currentTarget

  *标准 Event 属性*

  | 描述                                                         |                                                |
  | :----------------------------------------------------------- | ---------------------------------------------- |
  | [bubbles](https://www.w3school.com.cn/htmldom/event_bubbles.asp) | 返回布尔值，指示事件是否是起泡事件类型。       |
  | [cancelable](https://www.w3school.com.cn/htmldom/event_cancelable.asp) | 返回布尔值，指示事件是否可拥可取消的默认动作。 |
  | [currentTarget](https://www.w3school.com.cn/htmldom/event_currenttarget.asp) | 返回其事件监听器触发该事件的元素。             |
  | [eventPhase](https://www.w3school.com.cn/htmldom/event_eventphase.asp) | 返回事件传播的当前阶段。                       |
  | [target](https://www.w3school.com.cn/htmldom/event_target.asp) | 返回触发此事件的元素（事件的目标节点）。       |
  | [timeStamp](https://www.w3school.com.cn/htmldom/event_timestamp.asp) | 返回事件生成的日期和时间。                     |
  | [type](https://www.w3school.com.cn/htmldom/event_type.asp)   | 返回当前 Event 对象表示的事件的名称。          |



*标准 Event 方法*

下面列出了 2 级 DOM 事件标准定义的方法。IE 的事件模型不支持这些方法：

| 方法                                                         | 描述                                     |
| :----------------------------------------------------------- | :--------------------------------------- |
| [initEvent()](https://www.w3school.com.cn/htmldom/event_initevent.asp) | 初始化新创建的 Event 对象的属性。        |
| [preventDefault()](https://www.w3school.com.cn/htmldom/event_preventdefault.asp) | 通知浏览器不要执行与事件关联的默认动作。 |
| [stopPropagation()](https://www.w3school.com.cn/htmldom/event_stoppropagation.asp) | 不再派发事件。                           |





## DOM事件流

事件传播的三个阶段是：事件捕获、事件冒泡和目标。

- 事件捕获阶段：事件从祖先元素往子元素查找（DOM树结构），*直到捕获到事件目标 target*。在这个过程中，默认情况下，事件相应的监听函数是不会被触发的。

- 事件目标：当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。

- 事件冒泡阶段：事件从事件目标 target 开始，从子元素往冒泡祖先元素冒泡，直到页面的最上一级标签。

如下图所示：

![](http://img.smyhvae.com/20180204_1218.jpg)



## 事件委托

事件传播的三个阶段是：事件捕获、事件冒泡和目标。

- 事件捕获阶段：事件从祖先元素往子元素查找（DOM树结构），直到捕获到事件目标 target。在这个过程中，默认情况下，事件相应的监听函数是不会被触发的。
- 事件目标：当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。
- 事件冒泡阶段：事件从事件目标 target 开始，从子元素往冒泡祖先元素冒泡，直到页面的最上一级标签。

事件委托：为父节点注册 click 事件，当子节点被点击的时候，click事件会从子节点开始**向父节点冒泡**。**父节点捕获到事件**之后，开始执行方法体里的内容：通过判断 event.target 拿到了被点击的子节点`<a>`。从而可以获取到相应的信息，并作处理。

