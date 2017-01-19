# Vue(全自动版模板引擎)
*双向绑定: 修改数据,自动同步修改DOM*

使用: 

```javascript
**View部分**
//关于'指令':写在html元素上的自定义属性,以'v-'开头
<div id='box'>
	<div>{{message}}</div>
	<li v-for="val of(或in) list">{{val.title}}</li>
	<input id="addInfo" v-on:keyup="addInfo"(可以简写为@keyup.13
		//.13是事件修饰符(代表keyCode),  
		//还有.enter之类的,相当于直接把过滤规则写在这里,就不需要写在函数里了*/) 
		//v-model="value" 
		//v-bind(可以简写为:,使用数据动态绑定给自定义属性):abc="mes"//class="{class名:布尔值}"表示通过对应的布尔值确定要不要加class"
	/>
	//在绑定事件处理函数的时候有两种方法:    		//@click="fn"//@click="fn()"    
	//第一种方法调用的时候第一个参数就是事件对象,
	//第二个方法第二个参数是事件对象
	<p>同步表单value值改变: {{value}}</p>
</div>

**Module部分**
var dataArr = [
	{
		title: xx,
		id: 0
	},
	{
		title: xx,
		id: 0
	},
	...
]


**VM部分**
//根实例,传入一个选项参数
new Vue({
	el(挂载点: 值可以是选择器字符串,也可以是DOM对象):'#box'//此时id为box的标签下的所有元素,都归vue管理
	data(这里的属性都是挂载在根实例上的): {
		message: "Hello Vue",
		list: dataArr,
		value: ""//这个值会实时同步此刻的value值,
		mes: "xx"
	}
	methods: {//放置所有函数,包括事件处理函数
		addInfo: function(){
			//里边的this指向Vue对象(根实例),所以通过this.list就可以找到数据(Module),然后用push之类的方法就可以更新数据
		};
	}
})
```
! 注意: 行间js\<div onclick = "fn()">而不是="fn"
! 注意: 命名规范,遇到一个,***方法名不能叫delete***
