# Vue(全自动版模板引擎)
双向绑定: 修改数据,自动同步修改DOM

使用: 

```javascript
**View部分**
<div id='box'>
	<div>{{message}}</div>
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
	ele:'#box'//此时id为box的标签下的所有元素,都归vue管理
	data: {
		message: "Hello Vue"
	}//(也可以data: dataArr)
	
})



```
