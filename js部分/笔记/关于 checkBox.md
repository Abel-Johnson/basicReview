# 关于 checkBox
**有两个意向**

1. `<input type="checkbox" checked/>`  
	//只要有这个行间属性(不管是什么值),就会是一个框选的效果
	
2. DOM对象的checked属性:  
	var cb = document.getElementById("cb");  
	`cb.checked` //这个属性表征选框的当前状态,到底有没有选中  
	也可以通过修改这个属性,来达到不点击选框就勾选的效果