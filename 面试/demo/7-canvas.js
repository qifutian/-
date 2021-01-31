//获取canvas容器
var can = document.getElementById('canvas');
//创建一个画布绘制圆形
var ctx = can.getContext('2d');

var draw = function(x, y, r, start, end, color, type) {
    var unit = Math.PI / 180;
    ctx.beginPath();
    ctx.arc(x, y, r, start * unit, end * unit);
    ctx[type + 'Style'] = color;
    ctx.closePath();
    ctx[type]();
}

draw(100,75,50,0,360,'#f00','fill');