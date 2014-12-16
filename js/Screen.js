//Screen controls the canvas
var canvas;
var Screen = function(c){
	canvas = c;
}
Screen.prototype.draw = function(columnDistance, columnColor)
{
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.stroke();
}