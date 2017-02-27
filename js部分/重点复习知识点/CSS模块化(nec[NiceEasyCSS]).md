# CSS模块化(nec[NiceEasyCSS])

## 平时写css遇到的问题大概有:
	1. 选择器冗长
	2. 命名冲突
	3. 代码难以复用

	需要一套合理的规则来约束和组织代码(网易的nec是一种比较完美的解决方案)
	
## 制订一套CSS编程规范
> 我们规定页面只由3种基本结构构成:
> 
> 1. g-框架(页面的基础结构)
> 	
> 	```html
> 	<!DOCTYPE html>
> 	<html>
> 		<head>
> 			<meta charset='utf-8'>
> 			<title></title>
> 		</head>
> 		<body>
> 			<div class="g-index">
> 				<div class="g-hd"></div>head
> 				<div class="g-bd"></div>body
> 				<div class="g-ft"></div>foot
> 				<div class="g-sd"></div>side
> 				<div class="g-mn"></div>main
> 			</div>
> 		</body>
> 	</html>
> 	
> 	```
> 
> 2. m-模块(代码复用的主体部分),按照功能划分的功能完整的整体.如导航栏,轮播图,登录框
> 	
> 	```html
> 	<div class="g-hd">
> 		<div m-nav></div>
> 		<div m-news></div>
> 		<div m-copy_right></div>
> 	</div>
> 	```
> 
> 3. u-元件(细颗粒),比如一个按钮,一个logo,与模块的区别就是规模不同
> 	```html
> 	<div class="g-hd">
> 		<div u-logo></div>
> 		<div u-btn></div>
> 		<div m-nav></div>//可以和模块并列同级
> 	</div>
> 	```
> 	
> 4*. z-状态 ,如z-active,z-succ,z-disabled
 
碰到一个问题,如果一些模块只会出现一次,比如文章页的列表模块,只出现一次就没必要放到common.css文件里(这种模块就叫做私有模块),那么就要考虑一个问题:

- 后续添加别的公共模块,命名的时候要考虑与私有模块命名冲突的问题
- 解决办法:
	1. ~~不允许私有模块,都放到公共模块里(不可取,共用css文件会越来越大)~~
	2. 为common.css里的公共模块添加cm-前缀作区分,所有-m前缀的都是私有模块

	
还有一个问题: 
无法全局掌控模块的复用性,私有模块如果突然发现别的页面也会用到,需要提升到公共css里,而这些无法预知...只能走一步看一步....基本无解


---
模块的定义: 一个样式完整且独立的类

1. 只对外暴露一个类名

		/**
		 * 正确示范，所有模块相关的代码都挂在模块的选择器名下
		 */
		.m-nav { ... }
		.m-nav .list { ... }
		.m-nav .list .item { ... }

2. 不影响周围布局：一般情况下，尽量不要使用一个脱离文档流的布局（既使用了float:left/right，position:absolute/fixed的布局），尽量不要使用外边距（margin）。这是为了使得模块更加稳定、具备更高的可塑性

		/**
		 * 正确示范，在common中定义一个模块，在页面css中对模块进行定位和偏移
		 */
		
		/* common */
		.u-logo {
		  width: 100px;
		  height: 100px;
		}
		
		.cm-news {
		  width: 200px;
		  height: 100px;
		}
		
		/* index */也是实现继承的方法,即在共用类上直接添加
		.u-logo {
		  position: absolute;
		  left: 20px;
		  top: 20px;
		}
		
		.cm-news {
		  margin-top: 50px;
		}
3. 模块尽量设计为方便复用的量级，避免大而全，求精巧
