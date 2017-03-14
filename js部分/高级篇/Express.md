# Express
*Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。*

使用 Express 可以快速地搭建一个完整功能的网站。

#### Express 框架核心特性：

* 可以设置中间件来响应 HTTP 请求。
* 定义了路由表用于执行不同的 HTTP 请求动作。
* 可以通过向模板传递参数来动态渲染 HTML 页面。

#### 安装 Express 并将其保存到依赖列表中：
`$ npm install express --save`

*以下几个重要的模块是需要与 express 框架一起安装的：*
*(都是用来处理请求的---所谓的requestHandle)*
* body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。[zx亲测: post要用来给请求头加contentType]
* cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
* multer - node.js 中间件，用于处理 enctype="multipart/form-data"[zx亲测:上传文件时用]（设置表单的MIME编码）的表单数据。

(可以同时安装多个包: 
`$ npm i package1 --save package2 --save....`)


---
## 请求和响应
Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。

	app.get('/', function (req, res) {
	   // --
	})
#### request 和 response 对象的具体介绍：
**Request 对象** - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

* req.app：当callback为外部文件时，用req.app访问express的实例
* req.baseUrl：获取路由当前安装的URL路径
* req.query：获取URL的查询参数串(用于get)
* req.body / req.cookies：获得「请求主体」(用于post)/ Cookies
* req.fresh / req.stale：判断请求是否还「新鲜」
* req.hostname / req.ip：获取主机名和IP地址
* req.originalUrl：获取原始请求URL
* req.params：获取路由的parameters
* req.path：获取请求路径
* req.protocol：获取协议类型
* req.route：获取当前匹配的路由
* req.subdomains：获取子域名
* req.accepts()：检查可接受的请求的文档类型
* req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
* req.get()：获取指定的HTTP请求头
* req.is()：判断请求头Content-Type的MIME类型


**Response 对象** - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

* res.app：同req.app一样
* res.append()：追加指定HTTP头
* res.set()在res.append()后将重置之前设置的头
* res.cookie(name，value [，option])：设置Cookie
* opition: domain / expires / httpOnly / maxAge / path / secure / signed
* res.clearCookie()：清除Cookie
* res.download()：传送指定路径的文件
* res.get()：返回指定的HTTP头
* res.json()：传送JSON响应
* res.jsonp()：传送JSONP响应
* res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
* res.redirect()：设置响应的Location HTTP头，并且设置状态码302
* res.send()：传送HTTP响应
* res.sendFile(path [，options] [，fn])：传送指定**绝对**路径的文件 -会自动根据文件extension设定Content-Type
* res.set()：设置HTTP头，传入object可以一次设置多个头
* res.status()：设置HTTP状态码
* res.type()：设置Content-Type的MIME类型

## 路由

我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。
在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。

*创建 express_demo2.js 文件，代码如下所示：*

```javascript
var express = require('express');
var app = express();

//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})


//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})

```


## 静态文件

Express 提供了内置的中间件 `express.static` 来设置静态文件(如：图片， CSS, JavaScript 等)的存储路径。
步骤: 

1. `app.use(express.static('public---文件夹路径---相对于当前js文件,注意,不是当前项目,是js文件'))`
2. 把静态文件放到该文件夹下(比如images/logo.png)
3. http://127.0.0.1:8081/images/logo.png就可以访问到了


## GET方法

```javascript
app.get('/process_get', function(req,res) {
    var response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.send(JSON.stringify(response));
});
```

## POST方法
必不可少的一步:

```javascript
var bodyParser = require('body-parser');

//创建application/x-www-form-urlencoded编码解析
var urlencodeParser = bodyParser.urlencoded({extended:false});
```

```javascript
app.get('/process_post', function(req,res) {
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    res.send(JSON.stringify(response));
});
```


## 文件上传
准备: 

```javascript
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');


var urlencodeParser = bodyParser.urlencoded({extended:false});
var multerHandle = multer({dest: '/tmp/'}).array('img---[zx亲测: form里的name一致]');

var app = express();
app.use(multerHandle);
app.use(urlencodeParser);
app.use(express.static('../public'));
```

```javascript
app.post('/file_upload',function(req,res) {
    //文件信息: { fieldname: 'img',
        /*originalname: '76e4c5eab2478dbe27fe6a49074de4ab.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/tmp/',
        filename: '1b6c54a2dab44cbee03356e927b40337',
        path: '/tmp/1b6c54a2dab44cbee03356e927b40337',
        size: 86273 }*/
    console.log(req.files[0]);
    
    //目标位置文件路径
    var des_files = __dirname+'/'+req.files[0].originalname;

    //读取上传的文件
    fs.readFile(req.files[0].path, function(err, data) {
        fs.writeFile('../public/uploadPics/'+req.files[0].originalname,data,function(err) {
            if(err) {
                console.error(err);
            } else {
                var response = {
                    message: '上传成功',
                    filename: req.files[0].originalname
                }
            };
            res.send(JSON.stringify(response));
        });
    });
});
```

## 端口
```javascript
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

```