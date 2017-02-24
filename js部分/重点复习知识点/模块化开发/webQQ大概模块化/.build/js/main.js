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