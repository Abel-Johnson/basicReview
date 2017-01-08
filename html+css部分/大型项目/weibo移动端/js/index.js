window.onload = function() {
	var person = document.getElementById("person")
	var rader = document.getElementById("rader");
	var Hbtns = document.getElementById("head").getElementsByTagName("a");
	var searchBox = document.getElementById("search_box");
	var fBtns = document.getElementById("foot").getElementsByTagName("a");
	var send = document.getElementsByClassName("plus")[0];
	var tanbox = document.getElementById("tanbox");
	var closeWrap = document.getElementById("closeWrap");
	var closeTB = document.getElementById("closeBtn");
	var sort = document.getElementById("sort");
	var now = new Date();
	var TBcontent = tanbox.getElementsByClassName("TBcontent")[0];
	var TBDate = tanbox.getElementsByClassName("date")[0];
	var TBDay = tanbox.getElementsByClassName("day")[0];
	var TBMonth = tanbox.getElementsByClassName("month")[0];
	var TBYear = tanbox.getElementsByClassName("year")[0];
	var editBtns = tanbox.getElementsByClassName("editBtn");
	var editBtn = head.getElementsByClassName("editBtn")[0];
	var menuItems = head.getElementsByClassName("menuItem")


	for(var i = 0; i < editBtns.length; i++) {
		editBtns[i].onclick = function() {
			for(var i = 0; i < editBtns.length; i++) {
				editBtns[i].style.transform = "";
			}
			this.style.transform = "scale(1.1)";
		}
	}

	for(var i = 0; i < Hbtns.length; i++) {
		Hbtns[i].onclick = function() {
			for(var i = 0; i < Hbtns.length; i++) {
				Hbtns[i].style.color = "";
			}
			this.style.color = "#ff8200";
		}
	}

	searchBox.onclick = function() {
		this.lastElementChild.value = "";
	}
	for(var i = 0; i < fBtns.length; i++) {
		if(i == 2) {
			continue;
		}
		fBtns[i].onclick = function() {
			for(var i = 0; i < fBtns.length; i++) {
				if(i == 2) {
					continue;
				}
				fBtns[i].className = ""
			}
			this.className = "active";
		}

	}
	send.onclick = function() {
		console.log(closeBtn);
		tanbox.style.display = "block";
		setTimeout(function() {
			closeWrap.style.left = 0;
		}, 100)
		setTimeout(function() {
			closeTB.style.transform = "rotate(0deg)"
		}, 500)
		setTimeout(function() {
			TBcontent.style.bottom = 0;
		}, 1100)
	}
	closeWrap.onclick = function() {
		setTimeout(function() {
			closeTB.style.transform = "rotate(-45deg)"
		}, 100)
		setTimeout(function() {
			TBcontent.style.bottom = "-100%";
		}, 300)
		setTimeout(function() {
			closeWrap.style.left = "-100%";
		}, 1100)

		setTimeout(function() {

			tanbox.style.display = "none";
		}, 2100)

	}

	console.log(now.getDay(), now.getDate(), now.getMonth(), now.getYear());

	TBDate.innerHTML = now.getDate();
	TBDay.innerHTML = toWeek(now.getDay());
	TBMonth.innerHTML = now.getMonth() + 1;
	TBYear.innerHTML = now.getYear() + 1900;

	function toWeek(num) {
		switch(num) {
			case 1:
				return "星期一";
			case 2:
				return "星期二";
			case 3:
				return "星期三";
			case 4:
				return "星期四";
			case 5:
				return "星期五";
			case 6:
				return "星期六";
			case 0:
				return "星期日";
		}
	}
	sort.isClosed = true;
	sort.ontouchstart = function() {
		stopEventBubble();
		this.className =  "active";
	}
	sort.onclick = function() {
		stopEventBubble();
		for (var i = 0; i < menuItems.length; i++) {
			if(menuItems[i].children[0].innerHTML == sort.firstElementChild.innerHTML){
				menuItems[i].style.backgroundColor= "#7a7a7a";
			menuItems[i].children[0].style.color = "#ffa500";
			}
			
		}
		this.nextElementSibling.style.display =this.isClosed? "block":"";
		this.isClosed = !this.isClosed;
	}
	sort.ontouchend = function() {
		this.className = "";

	}
	editBtn.ontouchstart = function() {
		stopEventBubble();
		this.style.backgroundColor = "#4D4D4D";
	}
	editBtn.ontouchend = function() {
		
		this.style.backgroundColor = "";
		sort.nextElementSibling.style.display ="";
		sort.isClosed = true;
	}
	for (var i = 0; i < menuItems.length; i++) {
//		menuItems[i].ontouchstart = function() {
//			this.style.backgroundColor= "black";
//			this.children[0].style.color = "#ffa500";
//		}
		menuItems[i].onclick = function() {
			
			for (var i = 0; i < menuItems.length; i++) {
				menuItems[i].style.backgroundColor= "";
				menuItems[i].children[0].style.color = "";
			}
			setTimeout(function() {
				
			sort.nextElementSibling.style.display ="";
			},100)
			sort.isClosed = true;
			sort.firstElementChild.innerHTML = this.children[0].innerHTML;
			this.style.backgroundColor= "#7a7a7a";
			this.children[0].style.color = "#ffa500";
		}
//		menuItems[i].ontouchend = function() {
//		}
	}
	function stopEventBubble(event) { //   (备用)阻止事件冒泡的函数，使用时要放在子元素的事件处理函数的第一行
				var e = event || window.event;
				if(e && e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}
			}
	document.onclick = function() {
		
		sort.nextElementSibling.style.display ="";
		sort.isClosed = true;
	}
}