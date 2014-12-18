var canvas, FOV = 1;
var DrawingScreen = function(c){
    canvas = c;
}

DrawingScreen.prototype.drawShit = function(cD){

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var x = 0; x < cD.length; ++x) {
        if (cD[x] != -1) {
        var height = ((1 / cD[x]) * ((canvas.width / 2) / (FOV / 2)));
        var intensity = 3/cD[x];
      //      console.log(intensity + " " + height + " " + x);
        if(intensity>1)
            intensity=1;
        ctx.beginPath();
   //     ctx.strokeStyle = "rgb("+255*intensity+","+255*intensity+","+255*intensity+")";
        ctx.moveTo(x, 300 - (height / 2));
        ctx.lineTo(x, 300 + (height / 2));
        ctx.stroke();
    }
    }
}