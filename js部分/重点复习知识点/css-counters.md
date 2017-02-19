---
title: css计数器详解
date: 2016-07-19 14:46:01
categories: CSS
tags: css,计数器
description: 本文首发于 http://liuxianan.com，原文地址：http://blog.liuxianan.com/css-counters.html，转载请注明署名“liuxianan”并在显眼位置保留原文链接，谢谢！
author: liuxianan
---

[TOC]

# 什么是css计数器

就是采用css给一些html元素自动生成编号，比如类似`1.3.2 `这种，先看个效果：

![](http://image.liuxianan.com/201607/20160721_083037_831_3589.png)

对，就是这种类似Word里面很常见的效果，代码如下：

```markup
<style type="text/css">
#demo1 ol { counter-reset: section; list-style-type: none; }
#demo1 ol li { counter-increment: section; }
#demo1 ol li:before { content: counters(section, ".") ". "; }
</style>
<div id="demo1">
	<ol>
		<li>进风口的爽肤水
			<ol>
				<li>非进口商的</li>
				<li>非进口商的</li>
				<li>非进口商的</li>
			</ol>
		</li>
		<li>进风口的爽肤水
			<ol>
				<li>非进口商的</li>
				<li>
					非进口商的
					<ol>
						<li>将咖啡色的开发商</li>
						<li>将咖啡色的开发商</li>
						<li>将咖啡色的开发商</li>
						<li>将咖啡色的开发商</li>
					</ol>
				</li>
				<li>非进口商的</li>
			</ol>
		</li>
		<li>进风口的爽肤水</li>
	</ol>
</div>
```

# 兼容性

IE8+，Chrome和Firefox支持良好。属于CSS2范畴。

![](http://image.liuxianan.com/201607/20160721_092149_393_4796.png)

# 解释

## 初始化计数器

首先，给我们的计数器取一个名字，这个名字可以随便取，比如这里叫`section`，然后使用`counter-reset`在你需要开始计数的地方重置计数器：

```css
ol { counter-reset: section; }
```

## 计数器自增

然后通过`counter-increment`指定计数器何时自增，比如这里是碰到`li`就自增，所以我们写在`li`上面：

```css
ol li { counter-increment: section; }
```

## 显示计数器

最后，就是如何显示计数器了。显示计数器有2种方式，counter和counters，先讲counter。

### counter

counter只是简单的从前至后计数，忽略嵌套，语法如下：

	counter(计数器名称[, 可选的显示风格]) // 默认风格为decimal

其中第二个参数为可选，表示计数器显示的风格，例如，你可以使用`upper-roman`以罗马数字显示，默认为`decimal`，即数字形式，其可选值大部分和css的 [list-style-style](http://www.w3school.com.cn/cssref/pr_list-style-type.asp) 的一致，除了如下几个不被支持（不同浏览器支持的程度不一样）：

* circle
* square
* lower-alpha
* upper-mongolian

我们使用`counter`把它显示到`li`的`:before`上面，并指定以大写罗马数字显示：

```css
ol li:before { content: counter(section, upper-roman) ". ";}
```

效果如下：

![](http://image.liuxianan.com/201607/20160721_093646_812_0612.png)

### counters

下面再来看看counters，counters和counter的最大区别是它会嵌套，什么是嵌套，我的表达能力有限，但我想大部分看到这里应该都明白了，就是类似`1.3.8`这种，

语法如下：

	counters(计数器名称, 嵌套时拼接字符串[, 可选的显示风格])

比如我们使用点号`.`分割，

```css
ol li:before { content: counters(section, "."); }
```

另外，你可以将counters或者counter与任意字符串用空格拼接：

```css
ol li:before { content: "我是字符串1" counters(section, ".") "我是字符串2" "我是字符串3"; }
```

甚至counter和counters混用：

```css
ol li:before { content: counter(section) ". " counters(section, ".", lower-alpha) ". "; }
```

效果如下：
