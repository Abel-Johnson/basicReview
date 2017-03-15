# Vue学习

![](http://www.runoob.com/wp-content/uploads/2016/10/1476690217-1155-854231-1d2947692fba4957.png)



![](/Users/Johnson/GitHub/basicReview/js部分/高级篇/vue-cli文件目录.png)


## 路由: 
简单实例
Vue.js + vue-router 可以很简单的实现单页应用。
以下实例中我们将 vue-router 加进来，然后配置组件和路由映射，再告诉 vue-router 在哪里渲染它们。代码如下所示：


HTML 代码

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
 
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

JavaScript 代码

```javscript
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
 
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
 
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
 
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
 
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
 
// 现在，应用已经启动了！
```


## 给页面加点动态数据
这时候的页面都是静态的(数据在写程序的时候已经固定了不能修改)，而每个应用基本上都会请求外部数据以动态改变页面内容。对应有一个库叫 vue-resource 帮我们解决这个问题。

## 钩子函数
#### 钩子函数
指令定义函数提供了几个钩子函数（可选）：

* bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
* inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
* update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
* componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
* unbind: 只调用一次， 指令与元素解绑时调用。


#### 钩子函数参数
钩子函数的参数有：

* el: 指令所绑定的元素，可以用来直接操作 DOM 。
* binding: 一个对象，包含以下属性：
* name: 指令名，不包括 v- 前缀。
* value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
* oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
* expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
* arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
* modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
* vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
* oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。


响应式原理: 
![](http://cn.vuejs.org/images/data.png)

数据在vue对象实例化的过程中,会通过es5的objectdefineproperty属性添加getter和setter
同时vuejs会对模板做编译,看到指令后解析生成一个指令对象,每个指令对象会关联一个watcher

取数据的时候会触发getter,会把依赖收集到watcher里
改变数据的时候,