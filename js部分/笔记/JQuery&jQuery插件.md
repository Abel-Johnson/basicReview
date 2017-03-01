# JQuery&jQuery插件

1. `$(document).ready(function(){})`  
 简写为:`$(function(){})`  
 *注意: DOM节点全部加载进去才会触发(并不是资源加载完以后,所以不等价于window.onload)*
2. 获取元素  `$('选择器')`*有第二个参数,默认document,即从document下获取*,返回一个jq对象
3. .on('click mouseover','选择器字符串',{数据data:xx},为事件绑定事件处理函数(ev.type/data))----可以给事件名添加命名空间(比如'click.tag1'),不影响功能,解绑的时候方便
4. .off('click',fn)//解绑函数,off('click')解绑该元素的所有单击事件;off()解绑该元素的所有事件
4. .on('自定义事件',fn)------触发.trigger('自定义事件'[,{数据data:xx}]),,,,click()不传参是trigger的简写也可以触发事件
5. parent()/next()/prev()
6. filter('选择器字符串'/fn---this指被遍历到的DOM对象元素)
7. map(fn)
8. first()/last()/slice()
9. text()/html()
10. css(k,v)
11. hasClass()/addClass()/removeClass()
12. show()/hide()
13. .attr()/removeAttr()  `radio.attr('checked'); // 'checked'`
14. .prop()`radio.prop('checked'); // true`15. is('选择器字符串')`radio.is(':checked'); // true`(最好)
16. val()
17. append(dom/jq/fn(index,html){return ...})
18. before(...)/after(...)同级插入节点
19. .remove()删除节点

4. > `$("div")[1]`会返回原生元素(\<div></div>)
	> `$("div").eq(1)`会返回jq对象,可以直接用jq方法

6. 距离获取: 
	> $().offset()  返回的是对象
	> {left，top}
	获取相对浏览器左边和上边的距离
	> 尺寸获取:
	> .width()/.height()
	> $().position()  返回的是对象
	> {left，top}
	获取相对定位父级的距离

5.	data和attr  
	1. 传一个参数就是读取  
	2. 传两个参数就是设置

4. $("input").mouseover({a:1},function (ev){
		console.log( ev.data );
		console.log( ev.originalEvent );
	});
	
--
AJAX

	$.ajax('/api/categories', {
	    dataType: 'json'
	}).done(function (data) {
	    ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
	}).fail(function (xhr, status) {
	    ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
	}).always(function () {
	    ajaxLog('请求完成: 无论成功或失败都会调用');
	});	
	
get:

	var jqxhr = $.get('/path/to/resource', {
	    name: 'Bob Lee',
	    check: 1
	});	

第二个参数如果是object，jQuery自动把它变成query string然后加到URL后面，实际的URL是：
`/path/to/resource?name=Bob%20Lee&check=1`
这样我们就不用关心如何用URL编码并构造一个query string了。


post
post()和get()类似，但是传入的第二个参数默认被序列化为application/x-www-form-urlencoded：

	var jqxhr = $.post('/path/to/resource', {
	    name: 'Bob Lee',
	    check: 1
	});
实际构造的数据name=Bob%20Lee&check=1作为POST的body被发送。

getJSON

由于JSON用得越来越普遍，所以jQuery也提供了getJSON()方法来快速通过GET获取一个JSON对象：

	var jqxhr = $.getJSON('/path/to/resource', {
	    name: 'Bob Lee',
	    check: 1
	}).done(function (data) {
	    // data已经被解析为JSON对象了
	});

JSONP
如果需要使用JSONP，可以在ajax()中设置`jsonp: 'callback'`，让jQuery实现JSONP跨域加载数据。

--
动画:

1. show/hide(1000/'slow')
1. slideUp/slideDown()
1. fadeIn/fadeOut
1. animate:

		var div = $('#test-animate');
		div.animate({
		    opacity: 0.25,
		    width: '256px',
		    height: '256px'
		}, 3000, function () {
		    console.log('动画已结束');
		    // 恢复至初始状态:
		    $(this).css('opacity', '1.0').css('width', '128px').css('height', '128px');
		});
1. 串行动画

		var div = $('#test-animates');
		// 动画效果：slideDown - 暂停 - 放大 - 暂停 - 缩小
		div.slideDown(2000)
		   .delay(1000)
		   .animate({
		       width: '256px',
		       height: '256px'
		   }, 2000)
		   .delay(1000)
		   .animate({
		       width: '128px',
		       height: '128px'
		   }, 2000);
		}



----
## 源码分析: 
1. 基本架构: 

	```javascript
	/*
		在浏览器中运行jq文件，window是存在的
		运行在nodejs中，是没有window的

		把window传进去是为了性能考虑的
	*/

	(function(global,factory){
		factory(global);
	})(window,function (window,noGlobal){
		//jQuery的源码	
		console.log("我是源码，我被执行了");
		//noGlobal的值为undefined
		//在非严格模式下，undefined值可以被改写
		var undefined = 123;
		var abc;
		console.log(abc ===  noGlobal );
		
		//分析整体架构
		var jQuery = function (){
			//return new 	jQuery();  //会循环调用
			return new jQuery.fn.init();
		};
		//jQuery.fn是jQuery.prototype的别名
		jQuery.fn = jQuery.prototype = {
			constructor:jQuery,
			each:function (){
				console.log("我是each");
			}
		}
		//可以定义另一个函数，作为构造函数
		var init = jQuery.fn.init = function (){
			
		}
		//让init原型和jQuery的原型共同引用一个对象
		init.prototype = jQuery.fn;
		window.jQuery = window.$ = jQuery;
	});
	//console.log( new $().css );
	//在jquery中用的时候，无new的实例化过程
	//这样调用each方法，调用的是init.prototype上的方法
	$().each();
	```
	
2. 链式调用的原理是每个方法返回的都是jquery对象


---
## 关于JQuery插件

我们想要**高亮显示某些DOM元素**，用jQuery可以这么实现：

`$('span.hl').css('backgroundColor','#fffceb').css('color', '#d85030');`
`$('p a.hl').css('backgroundColor','#fffceb').css('color', '#d85030');`

总是写重复代码可不好，万一以后还要修改字体就更麻烦了，能不能统一起来，写个highlight()方法？
`$('span.hl').highlight();`
`$('p a.hl').highlight();`
答案是肯定的。我们可以扩展jQuery来实现自定义方法。将来如果要修改高亮的逻辑，只需修改一处扩展代码。这种方式也称为**编写jQuery插件**。

#### 编写jQuery插件


- 给jQuery对象绑定一个新方法是通过扩展$.fn对象实现的。让我们来编写第一个扩展——highlight1()：

		$.fn.highlight1 = function () {
		    // this已绑定为当前jQuery对象:
		    this.css('backgroundColor', '#fffceb').css('color', '#d85030');
		    return this;
		}


- 但是这个版本并不完美。有的用户希望高亮的颜色能自己来指定，怎么办？

	我们可以给方法加个参数，让用户自己把参数用对象传进去。于是我们有了第二个版本的highlight2()：

		$.fn.highlight2 = function (options) {
		    // 要考虑到各种情况:
		    // options为undefined
		    // options只有部分key
		    var bgcolor = options && options.backgroundColor || '#fffceb';
		    var color = options && options.color || '#d85030';
		    this.css('backgroundColor', bgcolor).css('color', color);
		    return this;
		}

	对于默认值的处理，我们用了一个简单的&&和||短路操作符，总能得到一个有效的值。

	> 	另一种方法是使用jQuery提供的辅助方法`$.extend(target, obj1, obj2, ...)`，它把多个object对象的属性合并到第一个target对象中，遇到同名属性，总是使用靠后的对象的值，也就是越往后优先级越高：
	> 
	> 		// 把默认值和用户传入的options合并到对象{}中并返回:
	> 		var opts = $.extend({}, {
	> 		    backgroundColor: '#00a8e6',
	> 		    color: '#ffffff'
	> 		}, options);
- 紧接着用户对highlight2()提出了意见：每次调用都需要传入自定义的设置，能不能让我自己设定一个缺省值，以后的调用统一使用无参数的highlight2()？

	也就是说，我们设定的默认值应该能允许用户修改。

	那默认值放哪比较合适？放全局变量肯定不合适，最佳地点是`$.fn.highlight2`这个函数对象本身。

	于是最终版的highlight()终于诞生了：

		$.fn.highlight = function (options) {
		    // 合并默认值和用户设定值:
		    var opts = $.extend({}, $.fn.highlight.defaults, options);
		    this.css('backgroundColor', opts.backgroundColor).css('color', opts.color);
		    return this;
		}
		
		// 设定默认值:
		$.fn.highlight.defaults = {
		    color: '#d85030',
		    backgroundColor: '#fff8de'
		}
	这次用户终于满意了。用户使用时，只需一次性设定默认值：

		$.fn.highlight.defaults.color = '#fff';
		$.fn.highlight.defaults.backgroundColor = '#000';
	然后就可以非常简单地调用highlight()了。

--

**最终，我们得出编写一个jQuery插件的原则：**

1. 给$.fn绑定函数，实现插件的代码逻辑；
1. 插件函数最后要return this;以支持链式调用；
1. 插件函数要有默认值，绑定在`$.fn.<pluginName>.defaults`上；
1. 用户在调用时可传入设定值以便覆盖默认值。
1. 针对特定元素的扩展

---
我们知道jQuery对象的有些方法只能作用在特定DOM元素上，比如submit()方法只能针对form。如果我们编写的扩展**只能针对某些类型的DOM元素**，应该怎么写？

> 还记得jQuery的选择器支持filter()方法来过滤吗？我们可以借助这个方法来实现针对特定元素的扩展。

*举个例子，现在我们要给所有指向外链的超链接加上跳转提示(按下的时候谈一个框出来,问你是否要跳转)，怎么做？*

1. 先写出用户调用的代码：
	`$('#main a').external();`
2. 然后按照上面的方法编写一个external扩展：

		$.fn.external = function () {
		    // return返回的each()返回结果，支持链式调用:
		    return this.filter('a').each(function () {
		        // 注意: each()内部的回调函数的this绑定为DOM本身!
		        var a = $(this);
		        var url = a.attr('href');
		        if (url && (url.indexOf('http://')===0 || url.indexOf('https://')===0)) {
		            a.attr('href', '#0')
		             .removeAttr('target')
		             .append(' <i class="uk-icon-external-link"></i>')
		             .click(function () {
		                if(confirm('你确定要前往' + url + '？')) {
		                    window.open(url);
		                }
		            });
		        }
		    });
		}

对如下的HTML结构：

```html
<!-- HTML结构 -->
<div id="test-external">
    <p>如何学习<a href="http://jquery.com">jQuery</a>？</p>
    <p>首先，你要学习<a href="/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000">JavaScript</a>，并了解基本的<a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a>。</p>
</div>
	
```

实测外链效果：
		
	'use strict';
		
	$('#test-external a').external();

> 小结
> 
> 扩展jQuery对象的功能十分简单，但是我们要遵循jQuery的原则，编写的扩展方法能支持链式调用、具备默认值和过滤特定元素，使得扩展方法看上去和jQuery本身的方法没有什么区别。







--

#### 基于两个方法: 

1. $.extend([deep], target, object1, [objectN])
	- 写了target是正常功能,即把obj扩展到target里  
	- 不写target的话就是扩展到自己的命名空间里
	
	> 	自己封装的深复制: 
	> 	
	> 	```javascript
	> 	function extend(obj){
	> 		//先判断传入参数的类型是数组还是对象  [] {}
	> 		var target = obj.constructor === Array ? [] : {};
	> 	
	> 	
	> 		for( var attr in obj ){
	> 			//判断一下obj[attr]是否是对象类型的，如果是，把obj[attr]也赋值一份
	> 	
	> 			if(typeof obj[attr] === "object"){
	> 				//递归地复制找到的任何对象
	> 				target[attr] = extend(obj[attr]);
	> 			}else{
	> 				target[attr] = obj[attr];
	> 			}
	> 		}
	> 	
	> 		return target;
	> 	
	> 	}
	>	```


2. $().extend(obj)

#### 书写格式: 

- 匿名函数自执行,把jQuery传进去

	```javascript
	(function ($){
		$.fn.extend({
			drag1:function (){
				console.log("drag1");	
			},
			drag2:function (){
				console.log("drag2");	
			},
			a:10
		})

		$.extend({
			dialog1:function (){
				console.log("dialog1");	
			},
			dialog2:function (){
				console.log("dialog2");	
			}
		})
	})(jQuery);
	```
	
#### 一个插件样例(功能: 高亮一组jqDOM元素): 
声明:

```javascript
//闭包限定命名空间
(function ($) {
    $.fn.extend({
        "highLight": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function () {  //这里的this 就是 jQuery对象。这里return 为了支持链式调用
                //遍历所有的要高亮的dom,当调用 highLight()插件的是一个集合的时候。
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
                //根据参数来设置 dom的样式
                $this.css({
                    backgroundColor: opts.background,
                    color: opts.foreground
                });
                //格式化高亮文本
                var markup = $this.html();
                markup = $.fn.highLight.format(markup);
                $this.html(markup);
            });

        }
    });
    //默认参数
    var defaluts = {
        foreground: 'red',
        background: 'yellow'
    };
    //公共的格式化 方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
    $.fn.highLight.format = function (str) {
        return "<strong>" + str + "</strong>";
    }
    //私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }
})(window.jQuery);
```

调用

```javascript
//调用
        //调用者覆盖 插件暴露的共公方法
        $.fn.highLight.format = function (txt) {
            return "<em>" + txt + "</em>"
        }
        $(function () {
            $("p").highLight({ foreground: 'orange', background: '#ccc' }); //调用自定义 高亮插件
        });
```