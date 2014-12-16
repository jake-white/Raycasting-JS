var c;
var Tracer = function(canvas){
	c = canvas;
}
Tracer.prototype.trace = function(){}
Tracer.prototype.getColumnDistance = function(){}
Tracer.prototype.getColumnColor = function(){}
var img;
var World = function(){
	img = new Image();
	img.crossOrigin="anonymous";
	img.src = 'world.png';
	img.onload = function()
	{
		var canvas = document.createElement("canvas");
		if (img.complete) {
			console.log("LOADED");
			canvas.width = img.width;
			canvas.height = img.height;
		}
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var ImgD = new Array(img.width);
		for (var i = 0; i < 10; i++) {
			ImgD[i] = new Array(img.height);
		}
		console.log(img.width + " by " + img.height);
		for(var x = 0; x < img.width; ++x)
		{
			console.log("FUCK YOU");
			for(var y = 0; y < img.height; ++y)
			{
				ImgD[x][y] = ctx.getImageData(x, y, 1, 1);
				console.log("yo");
			}
		}
	}
}