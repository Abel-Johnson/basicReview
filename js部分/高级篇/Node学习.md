## node事件循环

- 事件机制是用观察者的设计模式实现的
- 每个异步事件都生成一个事件观察者(回调函数)

### 事件驱动
服务器接收到异步请求,就把他关闭然后进行处理,然后去服务下一个web请求
当这个异步请求完成,他被放回处理队列,当他到达队列开头时,这个结果被返回给用户
![](http://www.runoob.com/wp-content/uploads/2015/09/event_loop.jpg)

nodeJS里所有的异步IO操作完成时都会发送一个事件到事件队列

没有error事件的处理函数,会导致退出程序并输出错误信息。

## Buffer(缓冲区,存放二进制数据)

- 处理TCP流或文件流时,必须使用二进制
- 每当需要处理io中流动的数据时,就有可能用到
- `var buf = new Buffer("www.runoob.com", "utf-8");`

### 方法:
- 写入: `buf.write(string[, offset[, length]][, encoding])`,返回实际写入的长度
- 读取: `buf.toString([encoding[, start[, end]]])` 返回指定编码的字符串
- 转JSON: `buf.toJSON()`返回`{ type: 'Buffer', data: [106, 111] }`
- 合并: `Buffer.concat(bfArr[,totalLength])`
- 比较: `buf.compare(otherBuf)` 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
- 拷贝: `buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])`
- 裁剪: `buf.slice([start[, end]])`
- 长度: `buf.length`

## 流stream
一个抽象接口,http的request对象就是一个Stream

**Stream 有四种流类型：**

1. Readable - 可读操作。
1. Writable - 可写操作。
1. Duplex - 可读可写操作.
1. Transform - 操作被写入数据，然后读出结果。

**所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：**

1. data - 当有数据可读时触发,回调函数有一个chunk是字符串。
1. end - 没有更多的数据可读时触发。
1. error - 在接收和写入过程中发生错误时触发。
1. finish - 所有数据已被写入到底层系统时触发。

从流中读取数据: 

```javascript
var readerStream = fs.createReadStream('./input.txt');
readerStream.setEncoding('UTF8');

readerStream.on('data',function(chunk) {
    data += chunk;
});
readerStream.on('end',function() {
    console.log(data);
});
readerStream.on('error', function(err) {
    console.log(err.stack);
});
```
从流中写入数据

```javascript
var writerStream = fs.createWriteStream('input.txt');
writerStream.write('我想写点东西xxxxxxx','utf-8');
writerStream.end();

writerStream.on('error', function(err) {
    console.log(err.stack);
});
writerStream.on('finish', function() {
    console.log('写入完成');
});
```
pipe: 
`readerStream.pipe(writerStream);`

链式流: 

- 压缩&解压
	
	```javascript
	var zlib = require('zlib');
	
	//压缩
	fs.createReadStream('./input.txt')
	    .pipe(zlib.createGzip())
	    .pipe(fs.createWriteStream('input.txt.gz'));
	    
	//解压
	fs.createReadStream('./input.txt.gz')
	    .pipe(zlib.createGunzip())
	    .pipe(fs.createWriteStream('input1.txt'));
	```


## 模块系统
export.xx = xxxx;
module.exports = xxx;

## 路由
我们要为路由提供请求的URL和其他需要的GET及POST参数，随后路由需要根据这些数据来执行相应的代码。我们需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的Node.JS模块，它们分别是url和querystring模块。

## 全局对象(global)

#### __filename/__dirname
#### 定时器
#### console,向标准输出流或标准错误流输出字符
#### procss
描述当前node进程状态的对象,提供一个与操作系统的简单接口,写本地命令行程序的时候会用到

- exit
- beforeExit
- uncaughtException
- signal

       
http://www.runoob.com/nodejs/nodejs-global-object.html

## util(实用工具--内置模块 )
*常见函数的集合*

### util.inherit(constructor, superConstructor)
两点注意: 

1. 只会继承原型上的属性和方法
2. 原型上的属性不会被console.log打印出来

### util.inspect(object,[showHidden显示隐藏信息],[depth(递归深度null(完整)/Num)],[colors(显示效果true/false)])
*将任意对象转换为字符串的方法，通常用于调试和错误输出*

### util.isArray(object)/isRegExp(object)/isDate(object)/isError(object)


## url

### url.parse(urlStr: string, parseQueryString?: boolean, slashesDenoteHost?: boolean): 
返回一个Url对象
##### .query(url对象的一个属性,提取出请求数据对象)
##### .pathname(路径提取)



## fs(file system)
`fs.open(path, flags:文件打开的行为[, mode:文件模式(权限)], callback:attr(err,fd))`
`fs.stat(path, callback:attr(err,stats))`获取文件信息
`fs.writeFile(filename, data:string/buffer[, options:{encoding, mode, flag}], callback(err))`
`fs.read(fd:通过 fs.open() 方法返回的文件描述符, buffer:数据写入的缓冲区(Buffer对象), offset(buffer写入位置偏移量), length(读取长度), position, callback:有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。)`
`fs.close(fd, callback(err))`
`fs.ftruncate(fd, len, callback)`从文件中截出来指定长度的内容(会修改原文件)
`fs.unlink(path, callback)`删除文件
`fs.mkdir(path:相对于项目地址[, mode], callback)`创建目录
`fs.readdir(path, callback(err, files[Arr]))`
`fs.rmdir(path, callback)`删除目录

## get/post请求
!!!`response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});`防止中文乱码

#### get: 解析url
var params = **url**.parse(request.url,true).query;---获取到包含请求数据键值对的参数对象
#### post: node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。

## TIPS
node中的相对地址(./)都是相对于项目地址而言的


---


## 完整的web应用: 

### 使用 Node 创建 Web 服务器
以下是演示一个最基本的 HTTP 服务器架构(使用8081端口)，创建 server.js 文件，代码如下所示：

```javascript
var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // 响应文件内容
         response.write(data.toString());		
      }
      //  发送响应数据
      response.end();
   });   
}).listen(8081);


// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/');
```


接下来我们在该目录下创建一个 index.htm 文件，代码如下：

```html
<html>
<head>
<title>Sample Page</title>
</head>
<body>
Hello World!
</body>
</html>
```

### 使用 Node 创建 Web 客户端
`client.js`

```javascript
var http = require('http');

// 用于请求的选项
var options = {
   host: 'localhost',
   port: '8081',
   path: '/index.htm'  
};

// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
}
// 向服务端发送请求
var req = http.request(options, callback);
req.end();
```

新开一个终端，执行 client.js 文件，输出结果如下：
$ node client.js

```html
<html>
<head>
<title>Sample Page</title>
</head>
<body>
Hello World!
</body>
</html>

```

执行 server.js 的控制台输出信息如下：
Server running at http://127.0.0.1:8081/
Request for /index.htm received.   # 客户端请求信息