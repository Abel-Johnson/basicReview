# 闭包在for循环中的应用

```javascript
var divs = document.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++) {
	tab(i);
//				divs[i].onclick = function(){
//					alert(i);
//				}
}
function tab(n){
	divs[n].onclick = function(){
		alert(n);
	}
}
```
