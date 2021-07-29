# Vue 之keep-alive的使用，实现页面缓存

## 什么是`keep-alive`

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到`keep-alive`组件。 官网释义：

```
<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 <keep-alive> 树内的所有嵌套组件中触发。

主要用于保留组件状态或避免重新渲染。
复制代码
```

## 应用场景

如果未使用`keep-alive`组件，则在页面回退时仍然会重新渲染页面，触发`created`钩子，使用体验不好。 在以下场景中使用`keep-alive`组件会显著提高用户体验：

1. 商品列表页点击商品跳转到商品详情，返回后仍显示原有信息
2. 订单列表跳转到订单详情，返回，等等场景。

## `keep-alive`的生命周期

- 初次进入时：
  1. `created` > `mounted` > `activated`
  2. 退出后触发 `deactivated`
- 再次进入：
  1. 只会触发 `activated`
- 事件挂载的方法等，只执行一次的放在 `mounted` 中；组件每次进去执行的方法放在 `activated` 中

## 在项目中使用

> #### 一、更改App.vue

```
<div id="app" class='wrapper'>
  <keep-alive>
  <!-- 需要缓存的视图组件 -->
    <router-view v-if="$route.meta.keepAlive">
    </router-view>
  </keep-alive>

  <!-- 不需要缓存的视图组件 -->
  <router-view v-if="!$route.meta.keepAlive">
  </router-view>
</div>
复制代码
```

> #### 二、在路由中设置keepAlive

```
{
  path: 'list',
  name: 'itemList', // 商品管理
  component (resolve) {
    require(['@/pages/item/list'], resolve)
  },
  meta: {
    keepAlive: true,
    title: '商品管理'
  }
}
复制代码
```

> #### 三、更改 `beforeEach`钩子

这一步是为了清空无用的页面缓存。 假设现在A、B两个页面都开启的缓存：

- 若第一次进入A页面后退出，再次进入页面时，页面不会刷新。这和目前的业务逻辑不符。我们想要的结果是A页面前进后返回，页面保持不变，而不是退出后重新进入保持不变。
- 在进入过A页面后进入B页面，经过测试后发现，B页面竟然会显示A页面的缓存，尽管url已经改变~

为了解决这个问题，需要判断页面是在前进还是后退。 在`beforeEach`钩子添加代码：

```
let toDepth = to.path.split('/').length
let fromDepth = from.path.split('/').length
if (toDepth < fromDepth) {
  // console.log('后退。。。')
  from.meta.keepAlive = false
  to.meta.keepAlive = true
}
复制代码
```

## 记录页面滚动位置

`keep-alive`并不会记录页面的滚动位置，所以我们在跳转时需要记录当前的滚动位置，在触发`activated`钩子时重新定位到原有位置。 具体设计思路：

1. 在`deactivated`钩子中记录当前滚动位置，在这里我使用的是`localStorage`：

```
 deactivated () {
   window.localStorage.setItem(this.key, JSON.stringify({
    listScrollTop: this.scrollTop
  }))
 }
复制代码
```

1. 在`activated`钩子中滚动：

```
this.cacheData = window.localStorage.getItem(this.key) ? JSON.parse(window.localStorage.getItem(this.key)) : null
$('.sidebar-item').scrollTop(this.cacheData.listScrollTop)
复制代码
```

> 参考链接：

- [vue实现前进刷新，后退不刷新](https://juejin.im/post/6844903555657269261)
- [在动态组件上使用 keep-alive](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Fcomponents-dynamic-async.html%23%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive)

文章分类