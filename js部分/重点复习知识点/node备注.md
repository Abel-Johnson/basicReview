# node备注

标签（空格分隔）： nodejs

---

安装完成后,开打命令窗口，**cmd**,输入：
> node -v

运行js文件
> node 文件.js

在node中，模块：
1. 文件模块

一个文件就是一个模块，模块的定义和使用遵循**CommonJS**
> 全局函数require加载模块
> exports或moudel.exports暴露模块的接口

使用文件模块：
> require(相对路径+文件名)

2. 目录模块
   放在**node_moudels**文件夹下，在目录模块中，需要有一个**package.json**,在文件中写入：
> {
    main:"入口js文件"
}

使用目录模块
> require("目录名")

## npm
下载更新上传模块，需要用到模块管理器，**npm**，在安转好node后就安装好了npm
> npm -v

安装模块
> npm install 模块名
１.　本地安装 只能在安装的目录下使用
２.　全局安装　在命令行中使用安装后的模块提供的命令
      npm install -g 模块名 
卸载模块

> npm uninstall 模块名

更新模块

> npm update 模块名

安装模块，会在安装模块的目录下创建一个文件夹"node_moudels"


##命令行的命令
列出目录下所有的文件和文件夹
＞　ｌｓ

进入到目录下
＞　ｃｄ　目录


### webpack
打包工具，把多个js文件打包成一个js文件
安装webpack
> npm install -g webpack


