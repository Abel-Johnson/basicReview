# JS中:本地对象,内置对象,宿主对象

## 本地对象
* 定义: 独立于宿主对象的es实现提供的对象(就是引用类型),可以用new实例化
* 内容:
	- Object
	- Array
	- Function
	- String
	- Boolean
	- Number
	- Date
	- RegExp
	- Error

## 内置对象
* 定义: 由es实现提供的,独立于宿主环境的所有对象,在es程序开始执行前出现(每个内置对象都是本地对象)
* 补充: Global对象是ECMAScript中最特别的对象，因为实际上它根本不存在，有点玩人的意思。大家要清楚，在ECMAScript中，不存在独立的函数，所有函数都必须是某个对象的方法。
* 内容: 
	- Global
	- Math 

	
## 宿主对象
- 定义: 所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。
- 补充: 所有的BOM和DOM对象都是宿主对象。因为其对于不同的“宿主”环境所展示的内容不同。其实说白了就是，ECMAScript官方未定义的对象都属于宿主对象，因为其未定义的对象大多数是自己通过ECMAScript程序创建的对象。
- 内容: 
	- BOM
	- DOM
	- 非内置对象