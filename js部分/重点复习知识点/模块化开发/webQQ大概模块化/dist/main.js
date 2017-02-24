"use strict";

//A开发
define("js/main", [ "./drag", "./range", "./scale" ], function(require, exports, module) {
    var btn = document.getElementById("btn");
    var dialog = document.getElementById("dialog");
    var dragD = document.getElementById("dragD");
    var div3 = document.getElementById("div3");
    //1. 加拖拽
    new (require("./drag").Drag)(div3);
    //2. 按按钮出弹框
    btn.onclick = function() {
        dialog.style.display = "block";
    };
    //3.拖拽小黄块改变弹窗大小
    new (require("./scale").Scale)(dragD, dialog);
});

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

"use strict";

//C开发
define("js/scale", [ "./range" ], function(require, exports, module) {
    function Scale(obj, target) {
        this.target = target;
        this.obj = obj;
        this.downX = 0;
        this.downY = 0;
        this.downH = 0;
        this.downW = 0;
        this.init();
    }
    Scale.prototype = {
        constructor: Scale,
        init: function init() {
            var _this = this;
            this.obj.onmousedown = function(ev) {
                _this.objDown(ev);
                document.onmousemove = function(ev) {
                    _this.objMove(ev);
                };
                document.onmouseup = _this.objUp;
            };
        },
        objDown: function objDown(ev) {
            this.downH = this.target.offsetHeight;
            this.downW = this.target.offsetWidth;
            this.downX = ev.clientX;
            this.downY = ev.clientY;
        },
        objMove: function objMove(ev) {
            var w = this.downW + ev.clientX - this.downX;
            var h = this.downH + ev.clientY - this.downY;
            // var winW = document.documentElement.clientWidth;
            // var winH = document.documentElement.clientHeight;
            var range = require("./range").range;
            w = range(w, 0, 400);
            h = range(h, 0, 400);
            this.target.style.width = w + "px";
            this.target.style.height = h + "px";
        },
        objUp: function objUp() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };
    exports.Scale = Scale;
});

"use strict";

//B开发,完善拖拽,写一个限制范围的模块
define("js/range", [], function(require, exports, module) {
    function range(value, min, max) {
        value < min && (value = min);
        value > max && (value = max);
        return value;
    }
    exports.range = range;
});
