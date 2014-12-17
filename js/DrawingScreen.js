var canvas, FOV = 1;
var DrawingScreen = function(c){
    canvas = c;
}

DrawingScreen.prototype.drawShit = function(cD){

    var ctx = canvas.getContext("2d");
    for(var x = 0; x < cD.length; ++x) {
        var intensity = 3 / cD[x];
        if(intensity>1)
        intensity=1;
        ctx.strokeStyle = "rgb(" + 255*intensity+","+ 255 * intensity+","+ 255* intensity+")";
        if (cD[x] > 0) {
        var height = ((1 / cD[x]) * ((canvas.width / 2) / (FOV / 2)));
        ctx.beginPath();
        ctx.moveTo(x, 300 - (height / 2));
        ctx.lineTo(x, 300 + (height / 2));
        ctx.stroke();
    }
    }
}