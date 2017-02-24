"use strict";

//B开发,完善拖拽,写一个限制范围的模块
define("js/range-debug", [], function(require, exports, module) {
    function range(value, min, max) {
        value < min && (value = min);
        value > max && (value = max);
        return value;
    }
    exports.range = range;
});