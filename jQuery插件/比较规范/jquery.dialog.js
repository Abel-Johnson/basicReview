;(function ($){

	function Dialog(options){//一个构造函数,构造弹框实例
		//1. 先解决没传参数的处理
		options = options || {};
		//2. 然后解决传入了参数，但不是对象，那么抛出错误或者附一个空对象
		if( options.constructor !== Object ){
			//throw new Error("请传入对象");
			//return;
			options = {};
		}

		this.defaults = {
			title:"这是一个弹框",
			content:"这是内容",
			left:null,
			top:null
		}
		for( var attr in options ){
			console.log(attr);
			if( options.hasOwnProperty(attr) ){
				this.defaults[attr] = options[attr];
			}
		}



		this.init();

		

	}

	Dialog.prototype = {
		constructor:Dialog,
		init(){
			//弹框的结构放在body中
			this.diaDiv = this.createHtml();
			$("body").append(this.diaDiv);

			this.diaDiv = this.diaDiv.get(0);

			//document.body.appendChild(this.diaDiv);

			this.diaDiv.style.zIndex = 100;

			this.mask = this.createMask();
			document.body.appendChild(this.mask);
			this.mask.style.zIndex = 99;

			this.position();  //定位

			this.h3 = this.diaDiv.querySelector("h3");

		},
		position(){
			//判断能不能转成数字
			/*
				1. 没有传入left 和 top值 默认的为居中显示
				2. 传入了left 没有传入top，left为传入的值，top居中显示
				3. 没传left，传入了top,left居中，top按照传入的显示
				4. 同时传了left，和top，就在按照传入的left和top显示
			*/

			var isLeft = this.defaults.left !== null && !isNaN(Number(this.defaults.left));
			var isTop = this.defaults.top !== null && !isNaN(Number(this.defaults.top));

			var top = (document.documentElement.clientHeight - this.diaDiv.offsetHeight)/2;

			var left = (document.documentElement.clientWidth - this.diaDiv.offsetWidth)/2;

			if(isLeft && isTop){
				/*this.diaDiv.style.left = this.defaults.left + "px";
				this.diaDiv.style.top = this.defaults.top + "px";*/
				$(this.diaDiv).css("left",this.defaults.left);
				$(this.diaDiv).css("top",this.defaults.top);
			}else if( isLeft ){
				this.diaDiv.style.left = this.defaults.left + "px";
				this.diaDiv.style.top = top + "px";
			}else if( isTop ){
				this.diaDiv.style.left = left + "px";
				this.diaDiv.style.top = this.defaults.top + "px";
			}else{
				this.diaDiv.style.left = left+ "px";
				this.diaDiv.style.top = top + "px";
			}



		},
		//弹框的结构
		createHtml(){
			//var diaDiv = document.createElement("div");
			var diaDiv = $("<div></div>")
			diaDiv.addClass("full-pop");

			var diaHtml = `<h3>
				<p class="title">${this.defaults.title}</p>
				<a href="javascript:void(0);" class="close" title="关闭">×</a>
				</h3>
				<div class="content">
					${this.defaults.content}
				</div>
				<div class="pop-btns">
					<span class="error"></span>
					<a href="javascript:void(0)" class="confirm">确定</a>
					<a href="javascript:void(0)" class="cancel">取消</a>
				</div>`;

			diaDiv.html(diaHtml);

			return diaDiv;
		},
		createMask(){
			var mask = document.createElement("div");

			mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .5;position:fixed;left:0;top:0;z-index:99;";
			return mask;
		}
	}


	
	$.dialog = function (options){
		new Dialog(options);
	}

})(jQuery);