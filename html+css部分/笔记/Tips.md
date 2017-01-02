## 一句话tips
* 强制不换行: `white-space: nowrap`
* 空格大小 =  **宋体** 字体下字体大小的一半





## 关于字体的复合样式
 > 必填项有: **font-size**和**font-family**,例如:`style="font: 20px '微软雅黑';"`
 ----
 > 注: mac上的chrome如果要使用微软雅黑的话,要写成: `font-family: 'Microsoft Yahei'`
 
 ![图解](imgs/font复合样式图解.png) 
 
 
## 关于背景background的复合样式
*background复合样式写法是没有顺序要求的
			但是，建议人为分类。
			颜色 -> 图片 -> 重复 -> 位置(/大小 裁剪 基点) -> 滚动*
			
```css
background: [background-color] [background-image] [background-repeat]
            [background-attachment] [background-position] / [ background-size]
            [background-origin] [background-clip];
```
实例:

```css
.example {
  background: aquamarine url(img.png)
              no-repeat
              scroll
              center center / 50%
              content-box content-box;
}
```