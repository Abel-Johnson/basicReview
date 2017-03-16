function versionCompare(v1, v2) {
    var v1Arr = v1.split('.');
    var v2Arr = v2.split('.');

    var len = Math.max(v1Arr.length, v2Arr.length);
    for (var i = 0; i < len; i++) {
        
        var v1 = formatV(v1Arr[i]);
        var v2 = formatV(v2Arr[i]);

        if(v1>v2) {
            return 'v1 is higher';
        } else if(v1<v2) {
            return 'v2 is higher'
        } 
    }
    return 'v1 is same with v2';

    function formatV(num) {
        if(!num) {
            return 0;
        } 
        var res = parseInt(num);
        if(isNaN(res)) {
            throw (num + '错误!该值不是数字!');
        }
        return res;
    }
}

console.log(versionCompare('1.2.3', '1.3.6.7'))

console.log(versionCompare('1.5.0', '1.1.3'));
console.log(versionCompare('10.1', '1.1'));
console.log(versionCompare('100', '1'));
console.log(versionCompare('01', '1'));
console.log(versionCompare('1.0.0.0', '1.0.0'));

//异常
console.log(versionCompare('asda', '1'));