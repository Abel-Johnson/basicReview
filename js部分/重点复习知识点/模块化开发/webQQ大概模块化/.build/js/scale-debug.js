"use strict";

//C开发
define("js/scale-debug", [ "./range-debug" ], function(require, exports, module) {
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
            var range = require("./range-debug").range;
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