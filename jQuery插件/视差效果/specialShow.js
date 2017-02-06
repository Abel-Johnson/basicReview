/**
 * 名称: jQuery视差化DOM对象插件
 * 功能: 捆绑在jQuery原型里,通过实例来调用


 * @authors Your Name (you@example.org)
 * @date    2017-02-06 13:33:25
 * @version $Id$
 */

(function($) {
	$.fn.extend(
		{
			"specialShow": function() {
				var wrapper = $(".wrap")
				wrapper.css('perspective', '1000px');
				var that = $(this);
				wrapper.on('mousemove', function(ev) {
					var offset = that.offset();//元素在当前视口的相对偏移 对象
					
					//event.pageX获取光标位置相对于文档边界的距离,与clientX的区别就是:一个是相对于浏览器窗口的距离,另一个是相对于文档的距离,文档的概念参照做滚动条时的理解
	//				ev.pageX
					
					//要计算得出鼠标滑动相对于中心的距离,然后通过一定系数计算出旋转角度
					var x = ev.pageX-offset.left;
					var y = ev.pageY-offset.top;
					console.log(x,y);
					
					//中点距离容器左边和顶部的距离(长宽的一半)
					var centerX = that.outerWidth()/2
					var centerY = that.outerHeight()/2
						
					var rateRotateX = (x - centerX)/centerX;
					var rateRotateY = (y - centerY)/centerY;
					
					var n = 10//规定一个系数,换算移动距离到旋转角度
					
					var degX = rateRotateX*n+'deg';
					var degY = -rateRotateY*n+'deg';
					console.log(degX,degY);🀀🀀🀖🀍

					that.css('transform','rotateX('+(degY)+') rotateY('+degX+')')
				})
				
				wrapper.on('mouseleave', function(ev) {
					that.css('transform','');
				})

			}
		}
	)
})(jQuery)
