# canvas学习笔记

1. `<canvas id="tutorial" width="150" height="150"></canvas>`
	2. 没有设置宽高,默认300px * 150px
	3. css设置要和标签设置保持一致,要不然会出现扭曲
	4. WebGL (Web Graphics Library) 是一个用以渲染交互式3D和2D图形的无需插件且兼容下一代浏览器的 JavaScript API。WebGL 引用的JavaScript API遵守OpenGL ES2.0规范，通过HTML5中 \<canvas> 元素实现功能。`var ctx = canvas.getContext('webgl');`(主要实现3D绘图)
2. `var ctx = canvas.getContext('2d');`获取渲染上下文对象
	1.	分为2d渲染上下文以及3d上下文(着重2d)

3. 绘制形状: 
	1. 矩形: `cxt.fillRect(0,0,150,75)`
		- 从**(0,0)点**开始, 绘制一个**150x75**的矩形
	2. 线条: 步骤
		1. `cxt.moveTo(0,0);`//绘制线条起点
		2. `cxt.lineTo(10,10);`
		3. `cxt.lineTo(100,10);`
		4. `cxt.stroke();`
	3. 圆形
		1. `cxt.beginPath();`
		2. `cxt.arc(x,y(圆心坐标),半径,起点弧度,终点弧度,是否逆时针(默认false))`
		> 说明:  
		>
		> 1. 角度都是以右端为起点,顺时针计算  
		> 2. 坐标是以canvas基准点为准,可以通过ctx.translate(x, y)移动此基点
		
		3. `cxt.closePath();`
		4. `cxt.fillStyle = "#fff000"`
		5. 	`ctx.fill();`//圆形里是必须的
	4. 渐变
		1. var grd = cxt.createLinearGradient(0,0,175,50);
		2. grd.addColorStop(0,"#f00");grd.addColorStop(1,"#00f");
		3. cxt.fillStyle = grd;
		4. cxt.fillRect(0,0,175,50)
	5. 放一幅画
		1. var img = new Image();
		2. img.src = "flower.png"
		3. cxt.drawImage(img,0,0)
	6. 路径
		// 利用Path绘制复杂路径:
		1. var path=new Path2D();
		1. path.arc(75, 75, 50, 0, Math.PI*2, true);
		1. path.moveTo(100,75);
		1. path.arc(75, 75, 35, 0, Math.PI, true);
		1. path.moveTo(65, 65);
		1. path.arc(60, 65, 5, 0, Math.PI*2, true);
		1. path.moveTo(95, 65);
		1. path.arc(90, 65, 5, 0, Math.PI*2, true);
		1. ctx.strokeStyle = '#0000ff';
		1. ctx.stroke(path);
	7. 文字
		1. ctx.clearRect(0, 0, canvas.width, canvas.height);
		1. ctx.shadowOffsetX = 2;
		1. ctx.shadowOffsetY = 2;
		1. ctx.shadowBlur = 2;
		1. ctx.shadowColor = '#666666';
		1. ctx.font = '24px Arial';
		1. ctx.fillStyle = '#333333';
		1. ctx.fillText('带阴影的文字', 20, 40);

	
4. 填充颜色: 
	`cxt.fillStyle = "#fff000" `
5. 描边:
	cxt.strokeStyle = "red";  
	**ctx.beginPath();**  
	ctx.moveTo(100, 100);  
	ctx.lineTo(300, 100);  
	ctx.lineTo(300, 200);  
	ctx.lineTo(100, 200);  
	**ctx.closePath();**  
	//描边  
	ctx.stroke();   

---
另外: 
HTML5支持内联SVG,  
代码如下:

```html
<!DOCTYPE html>
<html>
<body>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="190">
  <polygon points="100,10 40,180 190,60 10,60 160,180"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
</svg>

</body>
</html>
```

