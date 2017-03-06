# Node学习

- 想退出node,连按两次^+c
- 升级node的方法:

	> 第一步，先查看本机node.js版本：
	>     $ node -v
	> 	
	> 第二步，清除node.js的cache：
	>    $ sudo npm cache clean -f
	> 	
	> 第三步，安装 n 工具，这个工具是专门用来管理node.js版本的，别怀疑这个工具的名字，是他是他就是他，他的名字就是 "n"
	>     $ sudo npm install -g n
	> 	
	> 第四步，安装最新版本的node.js
	>     $ sudo n stable
	> 	
	> 第五步，再次查看本机的node.js版本：
	>     $ node -v
	
- `node --use_strict calc.js`

## CommonJS的模块实现原理

**变量命名的冲突解决:**


*实现“模块”功能的奥妙就在于JavaScript是一种函数式编程语言，它支持闭包。如果我们把一段JavaScript代码用一个函数包装起来，这段代码的所有“全局”变量就变成了函数内部的局部变量。*

**模块输出的实现**

```javascript
// 准备module对象:
var module = {
    id: 'hello',
    exports: {}
};
var load = function (module) {
    // 读取的hello.js代码:
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }

    module.exports = greet;
    // hello.js代码结束
    return module.exports;
};
var exported = load(module);
// 保存module:
save(module, exported);


```

强烈建议使用module.exports = xxx的方式来输出模块变量，这样，你只需要记忆一种方法。

