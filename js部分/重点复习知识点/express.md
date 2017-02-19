# express学习

标签（空格分隔）： node

---

## express
Express 是一个简洁而灵活的 node.js Web应用框架,提供了一系列强大特性帮助你创建各种 Web 应用。

Express 框架核心特性：

>可以设置中间件来响应 HTTP 请求。
定义了路由表用于执行不同的 HTTP 请求动作。
可以通过向模板传递参数来动态渲染 HTML 页面。

安装**express**

> npm install express --save-dev

启动服务：

```
var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("ok"); 
})

app.listen(8888,function(){
    console.log("服务器启动成功");
});
```
这段代码的意思是：
> 1. 引入express模块，得到express函数
2. 执行函数，得到一个对象
3. 设置请求的路由执行的回到函数，路由为请求根目录
4. 设置监听端口为8888，也可以设置指定的ip
    ```
       app.listen(port,[host],callback); 
    ```

发送html文件：
需要用到**res.sendFile(文件)**，当文件中使用了静态文件时，需要使用中间件来设置静态目录。

> app.use(express.static('style'));

可以设置多个路径
> app.use(express.static('style'));
> app.use(express.static('js'));

在html文件中使用时，只需要加上路径就可以
> <link rel="stylesheet" href="style/index.css">

获取post的数据
路由
> 路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

在地址栏中写入对应的路径，当访问路径时，会在服务端执行对应路径的回调（很类似触发事件处理函数）。

定义路径的规范，参考：[http://www.expressjs.com.cn/guide/routing.html](http://www.expressjs.com.cn/guide/routing.html)


中间件
> 中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。
（很类似于事件的取消默认行为）
中间件的功能包括：

>执行任何代码。
 修改请求和响应对象。
终结请求-响应循环。
调用堆栈中的下一个中间件。
如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。