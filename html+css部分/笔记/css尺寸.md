# css尺寸
---

### *jQuery下:*  

`$().offset()`  
会返回一个对象,包含left和top的两个键值对,两个值是相对于**可视窗口**左侧和顶部的偏移距离*(新版jq有pageX和pageY)*

`$().position()`  
会返回一个对象,包含left和top的两个键值对,两个值是相对于**定位父级**左侧和顶部的偏移距离

### *原生下*

window.innerHeight(innerWidth): 浏览器窗口内部高度(宽度)
window.outerHeight(outerWidth): 浏览器窗口整个高度(宽度)

clientWidth/clientHeight 元素内部尺寸,(c + p)
clientTop/clientLeft 元素上/左 边框的宽度

offsetWidth/offsetHeight 元素整体尺寸,(c + p + b)
