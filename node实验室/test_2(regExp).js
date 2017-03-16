//统计字符出现情况
var str1 = 'afbbbsdbdsddsasaasdabdsabdsadb';
//一串数字转成千分符
var str2 = '1234543535223' 
//字符串转驼峰
var str3 = 'hello-world-haha';

var fn1 = function (str) {
    var obj = {};
    // for (var i = 0; i < str.length; i++) {
    //     var v = obj[str[i]];
    //     if(v) {
    //         obj[str[i]]++;
    //     } else {
    //         obj[str[i]] = 1;
    //     }
    // }
    // return obj;

    // 用正则: 
    var strX = str.split('').sort().join('');
    var reg = /([a-z])\1*/g;
    // return strX.match(reg);
    strX.replace(reg,function ($0,$1) {
        // return $1+':'+$0.length+"\n";
        obj[$1] = $0.length;
    })
    return obj;
};

var fn2 = function (str) {
    // var arr = [];
    // var d = str.length%3;
    // if(d) {
    //     arr.push(str.substr(0,d));
    //     str = str.substr(d);
    // }
    // for (var i = 0; i < str.length; i++) {
    //     if(!(i%3)) {
    //         arr.push(str.substr(i, 3));
    //     }
    // }
    // return arr.join(',');

    //正则方法
    // 量词后面加 '?' 可以开启懒惰模式(默认贪婪模式);
    // 分组括号的开头写?:可以阻止捕获该组的分组信息
    // 前向声明(?=),反前向声明(?!)
    // /a(?=b)/g,只有后边跟了b的a才会被匹配到
    // /a(?!b)/g,只有后边没有跟b的a才会被匹配到



}
var fn3 = function (str) {
    // var arr = str.split('-');
    // for ( var i = 0; i < arr.length; i++ ) {
    //     var item = arr[i];
    //     arr[i] = item.charAt(0).toUpperCase()+item.slice(1);
    // }
    // return arr.join('-');

    //正则方法
    var reg = /-([a-z])/g
    return str.replace(reg, function($0, $1){
        return $1.toUpperCase();
    });
}

console.log(fn1(str1));
console.log(fn2(str2));
console.log(fn3(str3));



