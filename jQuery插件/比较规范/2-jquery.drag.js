;(function ($){

	function Drag(){
			
	}



	$.fn.drag = function (){

		
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
	}
		
})(jQuery)