# Node学习

## 使用
加载模块: 
`require('模块路径')`
注意: 
- 路径以./开头---当前目录下
- 路径以/开头---根目录下
- 没有开头---核心模块/node_module下的模块

对外提供接口:
`'exports.xx=xxx'`/`module.exports=xxx`


## 模块属性
`__filename`
`__dirname`


## 全局对象
### process
*process对象是一个全局对象，可以在任何地方都能访问到他，通过这个对象提供的属性和方法，使我们可以对当前运行的程序的进程进行访问和控制*

argv: -------- Array，一组包含命令行参数的数组
execPath: -------- 开启当前进程的绝对路径
env: -------- 返回用户环境信息
version: -------- 返回node版本信息
versions: -------- 返回node以及node依赖包版本信息
pid: -------- 当前进程的pid
title: -------- 当前进程的显示名称(Getter/Setter)
arch: -------- 返回当前CPU处理器架构 arm/ia32/x64
platform: -------- 返回当前操作系统平台
cwd(): -------- 返回当前进程的工作目录
chdir(directory): -------- 改变当前进程的工作目录
memoryUsage(): -------- 返回node进程的内存使用情况，单位是byte
exit(code): -------- 退出
kill(pid): -------- 向进程发送信息
stdin、stdout：标准输入输出流（IO）: -------- stdin(标准输入流)和stdout(标准输出流)提供了操作输入数据和输出数据的方法，我们也通常称为IO操作

### buffer
*一个用于更好的操作二进制数据的类
我们在操作文件或者网络数据的时候，其实操作的就是二进制数据流，Node为我们提供了一个更加方便的去操作这种数据流的类 Buffer，他是一个全局的类*

new Buffer(size);
new Buffer(array);
new Buffer(string, [encoding]);
	
buf.length:

	- buffer的bytes大小
buf[index]:

	- 获取或者设置在指定index索引位置的8位字节内容
buf.write(string, [offset], [length], [encoding]):

	- 根据参数 offset 偏移量和指定的encoding编码方式，将参数 string 数据写入buffer
buf.toString([encoding], [start], [end]):

	- 根据 encoding参数（默认是 'utf8'）返回一个解码的 string 类型
buf.toJSON():

- 返回一个 JSON表示的Buffer实例。JSON.stringify将会默认调用来字符串序列化这个Buffer实例
	
buf.slice([start], [end]):

- 	返回一个新的buffer，这个buffer将会和老的buffer引用相同的内存地址，注意：修改这个新的buffer实例slice切片，也会改变原来的buffer
buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd]):

- 进行buffer的拷贝
	
Buffer.isEncoding(encoding):

	- 如果给定的编码 encoding 是有效的，返回 true，否则返回 false。
Buffer.isBuffer(obj):

	- 测试这个 obj 是否是一个 Buffer.
Buffer.byteLength(string, [encoding]):

	- 将会返回这个字符串真实byte长度。 encoding 编码默认是： 'utf8'
Buffer.concat(list, [totalLength]):

- 返回一个保存着将传入buffer数组中所有buffer对象拼接在一起的buffer对象


## 内置模块
### File System
该模块是核心模块，需要使用require导入后使用
该模块提供了操作文件的一些API

fs.open(path, flags, [mode], callback)
异步版的打开一个文件
fs.openSync(path, flags, [mode])
fs.open() 的同步版
fs.read(fd, buffer, offset, length, position, callback)
从指定的文档标识符fd读取文件数据。
fs.readSync(fd, buffer, offset, length, position)
fs.read 函数的同步版本。 返回bytesRead的个数。
fs.write(fd, buffer, offset, length[, position], callback)
通过文件标识fd，向指定的文件中写入buffer
fs.write(fd, data[, position[, encoding]], callback)
把data写入到文档中通过指定的fd,如果data不是buffer对象的实例则会把值强制转化成一个字符串。
fs.writeSync(fd, buffer, offset, length[, position])
fs.write() 的同步版本
fs.writeSync(fd, data[, position[, encoding]])
fs.write() 的同步版
fs.close(fd, callback)
关闭一个打开的文件
fs.closeSync(fd)
fs.close() 的同步版本
fs.writeFlie(filename, data, [options], callback)
异步的将数据写入一个文件,如果文件不存在则新建, 如果文件原先存在，会被替换。 data 可以是一个string，也可以是一个原生buffer。
fs.writeFileSync(filename, data, [options])
fs.writeFile的同步版本。注意：没有callback，也不需要

fs.appendFile(filename, data, [options], callback)
异步的将数据添加到一个文件的尾部，如果文件不存在，会创建一个新的文件。 data 可以是一个string，也可以是原生buffer。
fs.appendFileSync(filename, data, [options])
fs.appendFile的同步版本。

fs.readFile(filename, [options], callback)
异步读取一个文件的全部内容
fs.readFileSync(filename, [options])
fs.readFile的同步版本

fs.exists(path, callback)
检查指定路径的文件或者目录是否存在
fs.existsSync(path)
fs.exists的同步版本

fs.unlink(path, callback)
删除一个文件
fs.unlinkSync(path)
fs.unlink() 的同步版本

fs.rename(oldPath, newPath, callback)
重命名
fs.renameSync(oldPath, newPath)
fs.rename() 的同步版本

fs.stat(path, callback)
读取文件信息
fs.statSync(path, callback)
fs.stat() 的同步版本

fs.watch(filename, [options], [listener])
观察指定路径的改变，filename 路径可以是文件或者目录

fs.mkdir(path, [mode], callback)
创建文件夹
fs.mkdirSync(path, [mode])
fs.mkdir的同步版本

fs.readdir(path, callback)
读取文件夹
fs.readdirSync(path)
fs.readdir同步版本

fs.rmdir(path, callback)
删除文件夹
fs.rmdirSync(path)
fs.rmdir的同步版本

### http

var http = require('http');
var server = http.createServer([requestListener])
创建并返回一个HTTP服务器对象
requestListener : 监听到客户端连接的回调函数
server.listen(port, [hostname], [backlog], [callback])
监听客户端连接请求，只有当调用了listen方法以后，服务器才开始工作
port : 监听的端口
hostname : 主机名（IP/域名)
backlog : 连接等待队列的最大长度
callback : 调用listen方法并成功开启监听以后，会触发一个listening事件，callback将作为该事件的执行函数

listening事件：当server调用listen方法并成功开始监听以后触发的事件
error事件 : 当服务开启失败的时候触发的事件
参数err : 具体的错误对象
request事件 : 当有客户端发送请求到该主机和端口的请求的时候触发
参数request : http.IncomingMessage的一个实例，通过他我们可以获取到这次请求的一些信息，比如头信息，数据等
参数response : http.ServerResponse的一个实例，通过他我们可以向该次请求的客户端输出返回响应

参数request对象 - http.IncomingMessage
httpVersion : 使用的http协议的版本
headers : 请求头信息中的数据
url : 请求的地址
method : 请求方式
参数response对象 - http.ServerResponse
write(chunk, [encoding]) : 发送一个数据块到响应正文中
end([chunk], [encoding]) : 当所有的正文和头信息发送完成以后调用该方法告诉服务器数据已经全部发送完成了，这个方法在每次完成信息发送以后必须调用，并且是最后调用
statusCode : 该属性用来设置返回的状态码
setHeader(name, value) : 设置返回头信息
writeHead(statusCode, [reasonPhrase], [headers])
这个方法只能在当前请求中使用一次，并且必须在response.end()之前调用

### url
require('url')
.parse(request.url) : 对url格式的字符串进行解析，返回一个对象
根据不同的url进行处理，返回不一样的数据

使用fs模块实现nodejs代码和html的分离

get请求的数据处理
post请求的数据处理
post发送的数据会被写入缓冲区中，需要通过resquest的data事件和end事件来进行数据拼接处理
querystring模块
parse() : 将一个 query string 反序列化为一个对象