/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-19 22:25:59
 * @version $Id$
 */


// 生成图标结构:

	var icoContainer = document.getElementsByClassName('ico-container')[0];
	var totalN = 12;
	var eachCol = 5;

	str = '';
	for (var i = 0; i < totalN; i++) {
		str += '<li style="left: '+(100*Math.floor(i/eachCol))+'px; top: '+(100*Math.floor(i%eachCol))+'px">'+ i +'</li>'
	}
	icoContainer.innerHTML = str;
	var icos = icoContainer.getElementsByTagName('li')


//画框:
document.onmousedown = function () {
	// return false;
	event.preventDefault();
}
document.oncontextmenu = function () {
	// return false;
	event.preventDefault();
}
document.onmousedown = function (ev) {
	var box = document.createElement('div');
	box.className = "choose";
	var cx = ev.clientX;
	var cy = ev.clientY;
	

	document.onmousemove = function (ev) {
		var w = Math.abs(ev.clientX - cx);
		var h = Math.abs(ev.clientY - cy);
 		if (!(w>30&&h>30)) return;

 		for (var i = 0; i < icos.length; i++) {
 			
 			icos[i].style.background =knock(box,icos[i])? 'green':'';
 			
 		}
 		
		desktop.appendChild(box);
		box.style.left = Math.min(ev.clientX,cx)-5 + 'px';
		box.style.top = Math.min(ev.clientY,cy) -5+ 'px';
		box.style.width = Math.abs(ev.clientX - cx)- 10+'px';
		box.style.height = Math.abs(ev.clientY - cy)-10+'px';
	}
	document.onmouseup = function () {
		document.onmousemove = null;
		document.onmouseup = null;
		
		if (desktop.getElementsByClassName('choose')[0])
		 desktop.removeChild(box);

	}
}

function gbc(o) {
	return o.getBoundingClientRect()
};
function knock(a,t) {
	if (gbc(a).left < gbc(t).right && gbc(a).right > gbc(t).left && gbc(a).bottom > gbc(t).top && gbc(a).top < gbc(t).bottom) {
		return true;
	}
}

