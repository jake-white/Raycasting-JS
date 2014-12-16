var canvas;
var DrawingScreen = function(c){
    canvas = c;
}

DrawingScreen.prototype.drawShit = function(cD){
    var ctx = canvas.getContext("2d");
    console.log(cD.length);
    for(var x = 0; x < cD.length; ++x)
    {
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(cD[x])
        ctx.stroke();
    }
}