"use strict";

//B开发
define("js/drag", [ "./range" ], function(require, exports, module) {
    function Drag(ele) {
        this.ele = ele;
        this.disX = 0;
        this.disY = 0;
        this.init();
    }
    Drag.prototype = {
        constructor: Drag,
        init: function init() {
            var _this = this;
            this.ele.onmousedown = function(ev) {
                _this.downFn(ev);
                document.onmousemove = function(ev) {
                    _this.moveFn(ev);
                };
                document.onmouseup = _this.upFn;
                ev.preventDefault();
            };
        },
        downFn: function downFn(ev) {
            this.disX = ev.clientX - this.ele.offsetLeft;
            this.disY = ev.clientY - this.ele.offsetTop;
        },
        moveFn: function moveFn(ev) {
            var left = ev.clientX - this.disX;
            var top = ev.clientY - this.disY;
            var maxLeft = document.documentElement.clientWidth - this.ele.offsetWidth;
            var maxTop = document.documentElement.clientHeight - this.ele.offsetHeight;
            var range = require("./range").range;
            left = range(left, 0, maxLeft);
            top = range(top, 0, maxTop);
            this.ele.style.left = left + "px";
            this.ele.style.top = top + "px";
        },
        upFn: function upFn() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };
    exports.Drag = Drag;
});