;(function ($){

	function Drag(element,options){

		this.defaults = {
			left:null
		}

		this.element = element;  //被拖拽的元素 jq对象

		$.extend(true,this.defaults,options);
		
		this.init();	
	}

	Drag.prototype = {
		constructor:Drag,
		init(){
			//this => Drag创造的实例
			this.element.on("mousedown",this.downFn.bind(this));
		},
		downFn(ev){
			//this =>  拖拽的原生的元素
			//要把这个函数中的this指向实例
			/*this.disX = ev.pageX - $(this).offset().left;
			this.disY = ev.pageY - $(this).offset().top;*/

			this.disX = ev.pageX - this.element.offset().left;
			this.disY = ev.pageY - this.element.offset().top;

			$(document).on("mousemove.drag",this.moveFn.bind(this))
			$(document).on("mouseup.drag",this.upFn.bind(this))

		},
		moveFn(ev){
			this.element.css("left",ev.clientX-this.disX);
			this.element.css("top",ev.clientY-this.disY);

			//触发moving自定事件
			this.element.trigger("moving");
		},
		upFn(){
			$(document).off("mousemove.drag mouseup.drag");
		}
	}


	$.fn.drag = function (options){

		//this指向jq对象

		new Drag(this,options);
		
	}
		
})(jQuery)

/*
//this指向的是调用这个函数的jq对象
		var element = this;
		this.mousedown(function (ev){
			var disX = ev.pageX - $(this).offset().left;
			var disY = ev.pageY - $(this).offset().top;
			$(document).on("mousemove",function (ev){
				element.css("left",ev.clientX - disX);	
				element.css("top",ev.clientY - disY);	
			});

			$(document).on("mouseup",function (ev){
				$(document).off("mousemove mouseup");
			})

		});	
*/