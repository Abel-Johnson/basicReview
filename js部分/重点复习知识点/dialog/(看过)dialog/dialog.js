{//面向对象写
	function Drag(options){
		//必填并且必须是一个对象
		if( typeof options === "undefined" || options.constructor !== Object ){
			//抛出错误
			throw new Error("传入的参数错误，必须是对象");
			return;
		}

		//不能直操作传进来的对象
		this.defaults = {
			targetEle:null,
			moveEle:null
		}

		for( var attr in options ){
			if(options.hasOwnProperty(attr)){
				this.defaults[attr] = options[attr];
			}
		}

		//拖拽的目标
		//this.element是移动的目标
		if( this.defaults.moveEle ){
			this.element = this.defaults.moveEle;
		}else{
			this.element = this.defaults.targetEle;
		}

		
		this.init();
	}

	Drag.prototype = {
		constructor: Drag,
		init(){
			//要把一个函数的this改变为指定的值，并且不调用函数
			this.defaults.targetEle.onmousedown = this.downFn.bind(this);
		},
		downFn(ev){
			//this => 实例
			this.disX = ev.clientX - this.element.offsetLeft;
			this.disY = ev.clientY - this.element.offsetTop;

			document.onmousemove = this.moveFn.bind(this);
			document.onmouseup = this.upFn;

			ev.preventDefault();
		},
		limit(){
			if( this.x < 0 ){
				this.x = 0;
			}
			if( this.x > document.documentElement.clientWidth - this.element.offsetWidth ){
				this.x = document.documentElement.clientWidth - this.element.offsetWidth;
			}
			if( this.y < 0 ){
				this.y = 0;
			}
			if( this.y > document.documentElement.clientHeight - this.element.offsetHeight ){
				this.y = document.documentElement.clientHeight - this.element.offsetHeight;
			}
		},
		moveFn(ev){

			//限制的两个运算后的值

			this.x = ev.clientX - this.disX;
			this.y = ev.clientY - this.disY;

			this.limit();

			this.element.style.left = this.x + "px";
			this.element.style.top = this.y + "px";
		},
		upFn(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}
function dialog(option){
	option = option || {};
	var defaults = {
		title:"这是一个弹框",
		content:"我是弹框",
		okFn:function(){/*
			1. return undefined 关闭
			2. return false  关闭
			3. return true   不关闭
		*/}
	};		
	for( var attr in option ){
		defaults[attr] = option[attr];
	}

	//封装弹框
	//弹框的结构，appendChild到body中
	var diaDiv = document.createElement("div");
	diaDiv.className = "full-pop";
	var diaHtml = `<h3>
		<p class="title">${defaults.title}</p>
		<a href="javascript:void(0);" class="close" title="关闭">×</a>
	</h3>
	<div class="content">
		${defaults.content}
	</div>
	<div class="pop-btns">
		<span class="error"></span>
		<a href="javascript:void(0)" class="confirm">确定</a>
		<a href="javascript:void(0)" class="cancel">取消</a>
	</div>`;
	diaDiv.innerHTML = diaHtml;
	document.body.appendChild(diaDiv);
	diaDiv.style.zIndex = 100;
	//居中显示
	diaDiv.style.left = (document.documentElement.clientWidth - diaDiv.offsetWidth)/2 + "px";
	diaDiv.style.top = (document.documentElement.clientHeight - diaDiv.offsetHeight)/2 + "px";
	window.addEventListener("resize",function (){
		diaDiv.style.left = (document.documentElement.clientWidth - diaDiv.offsetWidth)/2 + "px";
		diaDiv.style.top = (document.documentElement.clientHeight - diaDiv.offsetHeight)/2 + "px";
	},false);
	//遮罩
	var mask = document.createElement("div");
	mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .5;position:fixed;left:0;top:0;z-index:99;";
	document.body.appendChild(mask);


	

	//给确定取消关闭添加点击处理
	var close = diaDiv.querySelector(".close");
	var ok = diaDiv.querySelector(".confirm");
	var cancel = diaDiv.querySelector(".cancel");

	close.addEventListener("click",function (){
		document.body.removeChild(diaDiv);
		document.body.removeChild(mask);
	},false)
	ok.addEventListener("click",function (){

		var bl = defaults.okFn(); 
		/*
			1. return undefined 关闭
			2. return false  关闭
			3. return true   不关闭
		*/
		if( !bl ){
			document.body.removeChild(diaDiv);
			document.body.removeChild(mask);
		}

		
	},false)
	cancel.addEventListener("click",function (){
		document.body.removeChild(diaDiv);
		document.body.removeChild(mask);
	},false)
}