# NPM

* `$ npm install express -g` 会把包下载安装到node安装目录下的`node_module`文件夹里,以便全局调用
* `$ npm install express ` 会把包安装在当前项目文件夹里的`node_module`里
* `$ npm install express --save-dev`//会把包写到package.json 的devDependencies里面(开发模式)
* `$ npm install express --save` //会把包写到package.json 的dependencies里

可以同时安装多个包: 
`$ npm i package1 --save package2 --save....`
