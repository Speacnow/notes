# [浅谈 Virtual DOM](https://segmentfault.com/a/1190000039874264)

[![img](Virtual%20DOM.assets/3066091677-5fb6027489380_huge128)**安歌**](https://segmentfault.com/u/linlinma)发布于 4 月 22 日

[English](https://segmentfault.com/a/1190000039874264/en)

![img](Virtual%20DOM.assets/lg.php)

# 前言

“Virtual Dom 的优势是什么？” 这是一个常见的面试问题，但是答案真的仅仅是简单粗暴的一句“直接操作dom和频繁操作dom的性能很差”就完事了吗？如果是这样的话，不妨继续深入地问几个问题：

- 直接操作Dom的性能为什么差？

- Virtual Dom到底是指什么？它是如何实现的？

- 为什么Virtual Dom能够避免直接操作dom引起的问题？

  ![image.png](Virtual%20DOM.assets/1460000039874266)

如果发现自己对这些问题不(yi)太(lian)确(meng)定(bi)，那么不妨往下读一读。

# 正文

Virtual Dom，也就是虚拟的Dom, 无论是在React还是Vue都有用到。它本身并不是任何技术栈所独有的设计，而是一种设计思路，或者说设计模式。

## DOM

在介绍虚拟dom之前，首先来看一下与之相对应的真实Dom:

`DOM(Document Object Model)`的含义有两层:

1. 基于对象来表示的文档模型(`the object-based representation`);
2. 操作这些对象的API;

形如以下的`html`代码，

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h1>Learning Virtual Dom</h1>
    <ul class="list">
        <li class="list-item">List item</li>
    </ul>
</body>
</html>
```

根据DOM会被表示为如下一棵树: 树的每个分支的终点都是一个节点(node)，每个节点都包含着对象，包含一些节点属性。 这就是**基于对象来表示文档**。
![image.png](Virtual%20DOM.assets/1460000039874267)

其次，DOM允许我们通过一些的api对文档进行操作，例如：

```
const listItemOne = document.getElementsByClassName("list-item")[0]; // 获取节点
listItemOne.textContent = "List item one"; // 修改对应的文本内容
const listItemTwo = document.createElement("li"); // 创建一个元素对象
listItemTwo.classList.add("list-item"); // 添加子元素
listItemTwo.textContent = "List item two";
list.appendChild(listItemTwo);
```

简而言之。DOM的作用就是把**web页面和脚本(通常是指Javascript)关联起来**。

## DOM操作带来的性能问题

那么原生的DOM操作存在哪些问题呢？在此还需要了解到浏览器工作的一些流程，通常来说，一个页面的生成需要经历以下步骤：

1. 解析HTML，产出对应的DOM树；
2. 解析CSS, 生成对应的CSS树；
3. 将1和2的结果结合生成一棵render树；
4. 生成页面的布局排列(flow)
5. 将布局绘制到显示设备上(paint)

其中第4步和第5步其实就是常说的页面**渲染**，而渲染的过程除了在页面首次加载时发生，在后续交互过程中，**DOM操作也会引起重新排列和重新绘制，渲染是需要较高性能代价的，尤其是重排的过程。**

所以常见的优化思路都会提到一点: 为了尽可能减少重绘和重排次数，尽量把改变dom的操作集中在一起，因为写入操作会触发重绘或者重排，**并且浏览器的渲染队列机制是：当某个操作触发重排或重绘时，先把该操作放进渲染队列，等到队列中的操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行。**所以集中进行dom操作可以减少重绘重排次数。

另一方面，关于DOM操作的影响范围问题：由于浏览器是基于流式布局的，所以一旦某个元素重排，它的内部节点会受到影响，而外部节点（兄弟节点和父级节点等等）是**有可能不受影响的，这种局部重排引起的影响比较小，所以也需要尽可能地每次只改动最需要的节点元素。**

## Virtual DOM概览

Virtual DOM 就是为了解决上面这个问题而生的，它为我们操作`dom`提供了一种新的方式。

virtual DOM 的本质就是真实dom的一个副本，**无需使用DOM API,就可以频繁地操作和更新此副本。 对虚拟DOM进行所有更新后，我们可以查看需要对原始DOM进行哪些特定更改，并以针对性和优化的方式进行更改.**

![image.png](Virtual%20DOM.assets/1460000039874268)

这个思路可以参照行军打仗时的沙盘，沙盘的一个作用就是模拟军队的排列分布。设想一下不借助沙盘时的场景：

将军1： 我觉得三队的士兵应该往东边移动200米，侧翼埋伏，然后传令官跑去通知三队的士兵，吭哧吭哧跑了200米；

将军2: 我觉得四队的士兵应该往西边移动200米，和三队形成合围之势，然后传令官继续通知，四队的士兵也继续奔跑。

将军3：我觉得埋伏的距离太远了，近一点比较好， 两队各向中间移动100米吧。

然后可怜的士兵们继续来回跑....

![image.png](Virtual%20DOM.assets/1460000039874269)

在这个过程里每次行军移动都要带来大量的开销，每次都直接用实际行动执行还在商讨中的指令，成本是很高的。实际上在将军们探讨商量布阵排列时，可以

- **先在沙盘上进行模拟排列，**
- **等到得出理想方阵**之后，最后再通知到手下的士兵进行对应的调整，

这也就是 Virtual DOM 要做的事。

## Virtual DOM 的简化实现

那么 Virtual DOM大概是什么样呢？ 还是按照前面的html文件，对应的`virtual dom`大概长这样（不代表实际技术栈的实现，只是体现核心思路）：

![image.png](Virtual%20DOM.assets/1460000039874267)

```
const vdom = {
    tagName: "html",// 根节点
    children: [
        { tagName: "head" },
        {
            tagName: "body",
            children: [
                {
                    tagName: "ul",
                    attributes: { "class": "list" },
                    children: [
                        {
                            tagName: "li",
                            attributes: { "class": "list-item" },
                            textContent: "List item"
                        } // end li
                    ]
                } // end ul
            ]
        } // end body
    ]
} // end html
```

我们用一棵`js`的嵌套对象树表示出了dom树的层级关系以及一些核心属性，`children`表示子节点。
在前文我们用原生dom给ul做了一些更新，现在使用Virtual Dom来实现这个过程：

1. 针对当前的真实DOM复制一份virtual DOM，以及期望改动后的virtual DOM;

   ```
   const originalDom = {
   tagName: "html",// 根节点
   children: [
   //省略中间节点
     {
        tagName: "ul",
        attributes: { "class": "list" },
        children: [
            {
                tagName: "li",
                attributes: { "class": "list-item" },
                textContent: "List item"
            }
        ]
     }
   ],
   }
   const newDom = {
   tagName: "html",// 根节点
   children: [
     //省略中间节点
      {
        tagName: "ul",
        attributes: { "class": "list" },
        children: [
            {
                tagName: "li",
                attributes: { "class": "list-item" },
                textContent: "List item one" //改动1，第一个子节点的文本 
            },
            {// 改动2，新增了第二个节点
                tagName: "li",
                attributes: { "class": "list-item" },
                textContent: "List item two"
            }
        ]
     }
    ], 
   };
   ```

2. 比对差异

   ```
   const diffRes = [
    {
      newNode:{/*对应上面ul的子节点1*/}，
      oldNode:{/*对应上面originalUl的子节点1*/}，
    },
    {
      newNode:{/*对应上面ul的子节点2*/}，//这是新增节点，所以没有oldNode
    },
   ]
   ```

3. 收集差异结果之后，发现只要更新list节点，，伪代码大致如下：

   ```
   const domElement = document.getElementsByClassName("list")[0];
   diffRes.forEach((diff) => {
    const newElement = document.createElement(diff.newNode.tagName);
    /* Add attributes ... */
    
    if (diff.oldNode) {
        // 如果存在oldNode则替换
        domElement.replaceChild(diff.newNode, diff.index);
    } else {
        // 不存在则直接新增
        domElement.appendChild(diff.newNode);
    }
   })
   ```

   当然，实际框架诸如`vue`和`react`里的`diff`过程不只是这么简单，它们做了更多的优化，例如：

对于有多个项的`ul`，往其中`append`一个新节点，可能要引起整个`ul`所有节点的改动，这个改动成本太高，在`diff`过程如果遇到了，可能会换一种思路来实现，直接用js生成一个新的`ul`对象，然后替换原来的`ul`。这些在后续介绍各个技术栈的文章（可能）会详细介绍。

可以看到，Virtual DOM的核心思路：先让预期的变化操作在虚拟dom节点，最后统一应用到真实DOM中去，这个操作一定程度上减少了重绘和重排的几率，因为它做到了：

1. 将实际dom更改放在diff过程之后， diff的过程有可能经过计算，减少了很多不必要的改变（如同前文将军3的命令一出，士兵的实际移动其实就变少了）；

2. 对于最后必要的dom操作，也集中在一起处理，贴合浏览器渲染机制，减少重排次数；

   ## 小结：回答开头的问题

现在我们回到开篇的问题--“Virtual Dom 的优势是什么？”

在回答这道题之前，我们还需要知道：

1. 首先，浏览器的DOM 引擎、JS 引擎 相互独立，但是共用主线程；
2. JS 代码调用 DOM API 必须 挂起 JS 引擎，激活 DOM 引擎，DOM 重绘重排后，再激活 JS 引擎并继续执行；
3. 若有频繁的 DOM API 调用，浏览器厂商不做“批量处理”优化，所以切换开销和重绘重排的开销会很大；

而Virtual Dom 最关键的地方就是**把dom需要做的更改，先放在js引擎里进行运算，等收集到一定期间的所有dom变更时**，这样做的好处是：

1. 减少了dom引擎和js引擎的频繁切换带来的开销问题；
2. 可能在计算比较后，最终只需要改动局部，可以较少很多不必要的重绘重排；
3. 把必要的Dom操作尽量集中在一起做，减少重排次数

# 总结

本文从一个常见面试问题出发，介绍了Dom 和Virtual Dom的概念，以及直接操作Dom可能存在的问题，通过对比来说明Virtual Dom的优势。对于具体技术栈中的Virtual Dom diff过程和优化处理的方式，没有做较多说明，更专注于阐述Virtual Dom本身的概念。

欢迎大家关注专栏，也希望大家**对于喜爱的文章，能够不吝点赞和收藏**，对于行文风格和内容有任何意见的，都欢迎私信交流。