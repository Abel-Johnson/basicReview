# H5音频视频audio/video

```html
<audio/video 
	controls //控制进度条(控件)
	src='
		mp3/acc/ogg
		MP4/vp8/ogv(IE不支持这个格式)...
		' 
	autoplay
	loop
	//js属性⤵️
	currentTime
	duration(媒体总时间(只读))
	volume(音量0~1)
	muted(是否静音)
	autobuffer: 开始是否缓冲加载,自动播放的话就忽略该属性
	
	下面都是只读的
	paused
	ended
	error
	currentSrc
	
></audio/video>


```

source标签:

```html
<video controls>
	<sourse src=".ogv"></sourse>
	<sourse src=".mp4"></sourse>//上面格式不支持的话就用MP4
</video>
```


一些方法: 
play()
pause()
load()重新加载媒体(在改完src以后要写这个才能生效)