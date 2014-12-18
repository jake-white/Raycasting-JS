var c, columnDistance, columnColor, w;
var FOV = 1;
var Tracer = function(canvas, world){
	c = canvas;
	w = world;
};
Tracer.prototype.traceShit = function() {
	columnDistance = new Array(c.width);
	columnColor = new Array(c.width);
	for (var i = 0; i < columnDistance.length; ++i) { // resetting columns
		columnDistance[i] = -1;
	}
	var a = w.getAngle();
	var pX = w.getStartingX();
	var pY = w.getStartingY();
	var inc = FOV / c.width;
	var column = 0;
	for (var currentAngle = a - (FOV / 2); currentAngle < a
	+ (FOV / 2); currentAngle += inc) {
		var hor = 0, vert = 0;
		var relX, relY, dX, dY;
		var actX = 0, actY = 0;
		var checkDir = 0, signX, signY;
		var workingAngle = currentAngle;
		if (workingAngle > 2 * Math.PI)
			workingAngle -= 2 * Math.PI;
		else if (workingAngle < 0)
			workingAngle += 2 * Math.PI;
		if(currentAngle < 0)
		console.log(workingAngle);
		/*
		 * now it is 0 to 2PI time to evaluate by quadrant STATUS:
		 *
		 * QUADI = FINISHED QUADII = FINISHED QUADIII = IN PROGRESS QUADIV =
		 * NOT STARTED
		 */
		var actualAngle = workingAngle; // for doing horizontal and
		// vertical

		if (workingAngle < Math.PI / 2) {
			// first, quadrant I
			actY = Math.floor(pY);
			relY = Math.abs(pY - actY);
			relX = relY * Math.tan(workingAngle);
			actX = pX + relX;
			dY = 1; // distance between Ys
			dX = ((dY + relY) * Math.tan(workingAngle)) - relX; // distance
																// between
																// Xs
			checkDir = -1; // check the block above, because of how the
			// coordinates are
			signX = 1;
			signY = -1;
		} else if (workingAngle < Math.PI) {
			// next, quadrant II
			workingAngle -= Math.PI / 2;
			actY = Math.ceil(pY);
			relY = actY - pY;
			relX = relY / Math.tan(workingAngle);
			actX = pX + relX;
			dY = 1;
			dX = (((relY + dY) / Math.tan(workingAngle)) - relX);
			checkDir = 0;
			signX = 1;
			signY = 1;
		} else if (workingAngle < 1.5 * Math.PI) {
			// next, quadrant III
			workingAngle -= Math.PI;
			actY = Math.ceil(pY);
			relY = actY - pY;
			relX = relY * Math.tan(workingAngle);
			actX = pX - relX;
			dY = 1;
			dX = ((Math.tan(workingAngle) * (dY + relY)) - relX);
			checkDir = 0;
			signX = -1;
			signY = 1;
		} else {
			// finally, quadrant IV
			workingAngle -= (Math.PI) * 1.5;
			actY = Math.floor(pY);
			relY = pY - actY;
			relX = relY / Math.tan(workingAngle);
			actX = pX - relX;
			dY = 1;
			dX = ((dY + relY) / Math.tan(workingAngle)) - relX;
			checkDir = -1;
			signX = -1;
			signY = -1;
		}

		// first, horizontal checks
		while (actY + checkDir < w.getHeight() && actY + checkDir >= 0
		&& actX < w.getWidth() && actX >= 0) {
			if (w.isFilled(Math.floor(actX), Math.floor(actY)
				+ checkDir)) { // checking for hits
				hor = Math.sqrt((relX * relX) + (relY * relY));
				// System.out.println("HOR HIT = " + hor + " RELX = " + relX
				// + " RELY = " + relY);
				break;
			}
			relY += dY;
			relX += dX;
			actX = pX + (signX * relX);
			actY = pY + (signY * relY);
		}

		if (actualAngle < Math.PI / 2) {
			// first, quadrant I
			actX = Math.ceil(pX);
			relX = actX - pX;
			relY = Math.abs(relX / Math.tan(workingAngle));
			actY = pY - relY;
			dX = 1; // distance between Xs
			dY = (((dX + relX) / Math.tan(workingAngle)) - relY); // distance
			// between
			// Ys
			checkDir = 0;
			signX = 1;
			signY = -1;
		} else if (actualAngle < Math.PI) {
			// next, quadrant II
			actX = Math.ceil(pX);
			relX = actX - pX;
			relY = relX * Math.tan(workingAngle);
			actY = pY + relY;
			dX = 1;
			dY = ((relX + dX) * (Math.tan(workingAngle)) - relY);
			checkDir = 0;
			signX = 1;
			signY = 1;
		} else if (actualAngle < 1.5 * Math.PI) {
			// next, quadrant III
			actX = Math.floor(pX);
			relX = pX - actX;
			relY = relX / Math.tan(workingAngle);
			actY = pY + relY;
			dX = 1;
			dY = ((dX + relX) / Math.tan(workingAngle)) - relY;
			checkDir = -1;
			signX = -1;
			signY = 1;
		} else {
			// finally, quadrant IV
			actX = Math.floor(pX);
			relX = pX - actX;
			relY = relX * Math.tan(workingAngle);
			actY = pY - relY;
			dX = 1;
			dY = ((dX + relX) * Math.tan(workingAngle)) - relY;
			checkDir = -1;
			signX = -1;
			signY = -1;
		}

		// next, vertical checks
		while (actY < w.getHeight() && actY > 0
		&& actX < w.getWidth() && actX > 0) {
			if (w.isFilled(Math.floor(actX) + checkDir,
					Math.floor(actY))) { // checking for hits
				vert = Math.sqrt((relX * relX) + (relY * relY));
				// System.out.println("VERT HIT = " + vert + " RELX = " +
				// relX + " RELY = " + relY);
				break;
			}
			relY += dY;
			relX += dX;
			actX = pX + (signX * relX);
			actY = pY + (signY * relY);

		}
		if ((hor <= vert || vert <= 0) && hor > 0) {
			columnDistance[column] = hor;
			// System.out.println("HOR SELECT");
		} else if (vert > 0) {
			columnDistance[column] = vert;
			// System.out.println("VERT SELECT");
		}
		// System.out.println("HOR = " + hor + " WHILE VERT = " + vert);
		if (columnDistance[column] > 0) {
			var fish = Math.cos((column * (FOV / c.width)) - (FOV / 2));
			// System.out.println(fish);
			// uses trig to fix the fisheye distortion (works well right
			// now!)
			columnDistance[column] *= fish;
		}

		/*
		 * floor casting starts here, all done with walls! going pixel-by-pixel
		 * hopefully it doesn't shit on the performance... here goes nothin
		 */
		if (column < c.width - 1)
			++column;
	}
}
Tracer.prototype.getColumnDistance = function(){return columnDistance;}
Tracer.prototype.getColumnColor = function(){return columnColor;}
var img, ImgD;
var startingX, startingY;
var a;
var World = function()
{
	a = 0;
	img = new Image();
	img.crossOrigin = 'anonymous';
	img.src = 'res/world.png';
	img.onload = function()
	{
		console.log("Map image loaded...");
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		ImgD = new Array(img.width);
		for (var i = 0; i < img.width; i++) {
			ImgD[i] = new Array(img.height);
		}
		for(var x = 0; x < img.width; ++x)
		{
			for(var y = 0; y < img.height; ++y)
			{
				ImgD[x][y] = ctx.getImageData(x, y, 1, 1);
			}
		}
		for(var x = 0; x < ImgD.length; ++x)
		{
			for(var y = 0; y < ImgD[0].length; ++y)
			{
				if(ctx.getImageData(x, y, 1, 1).data[0] == 255 && ctx.getImageData(x, y, 1, 1).data[1] == 0 && ctx.getImageData(x, y, 1, 1).data[2] == 0)
				{
					console.log("Found starting coordinate: " + x + ", " + y);
					startingX = x;
					startingY = y;
					console.log("Image parsing complete!");
					return;
				}
			}
		}
	}
};
World.prototype.getAngle = function() {
	return a;
}
World.prototype.setAngle = function(angle) {
	while(angle > 2*Math.PI) {
		angle -= 2 * Math.PI;
	}
	while(angle < -2*Math.PI) {
		angle += 2 * Math.PI;
	}
	a = angle;
}
World.prototype.getImageData = function(x, y)
{
	return ImgD[x][y];
};
	World.prototype.isFilled = function(x, y)
	{
		return !(ImgD[x][y].data[0] == 255 && ImgD[x][y].data[1] == 255 && ImgD[x][y].data[2] == 255);
	};
	World.prototype.getWidth = function()
	{
		return img.width;
	};
	World.prototype.getHeight = function()
	{
		return img.height;
	};
World.prototype.getStartingX = function()
{
	return startingX;
};
World.prototype.getStartingY = function()
{
	return startingY;
};

var Player = function(){};