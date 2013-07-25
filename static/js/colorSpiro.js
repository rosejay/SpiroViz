

// class ColorSpiro
var ColorSpiro = function(r1, r2, d, z){

	SpiroGraph.call(this, r1, r2, d, z);

	// data
	this.initData(0);

	// rotate
	this.angle = - Math.PI / 2;

	this.drawCLR = {
		color1: [255,255,12],
		color2: [255,112,9],
		color3: [255,107,31],
		color4: [255,124,148],
		color5: [236,65,57],
		color6: [255,58,217],
		color7: [160,94,204],
		color8: [51,59,220],
		color9: [0,123,86],
		color10: [136,238,102],
		color11: [96,231,237],
		color12: [78,65,74],
		color13: [255,107,31],
		color14: [255,124,148],
		color15: [0,0,0 ],
		color16: [255,58,217]
	}
	this.color= [200,200,200]
	this.initData(0);
	this.nodeColor = [];
	this.bgColor = [255,255,255];
	this.first = true;

	this.ctx.rotate(- Math.PI / 2);

	

}
ColorSpiro.prototype = Object.create(SpiroGraph.prototype)
ColorSpiro.prototype.constructor = ColorSpiro;
ColorSpiro.prototype.setNodeColor = function(num,item){
	this.nodeColor[num] = item;
}

ColorSpiro.prototype.drawStroke = function(num, distance, isFill){

	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.batchedLine(this.currentGear,distance);
		this.pushPoint(n);
	}
	this.drawOneStrokeWithSolidColor(num,isFill);

}

ColorSpiro.prototype.drawGradientStroke = function(num, distance){

	//this.nodeColor[num] = color;
	this.color = [0,0,0];
	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.angle = - Math.PI / 2 + distance * this.perGear;
		this.batchedLine(this.currentGear,distance);
		this.pushPoint(n);
	}
	this.drawOneStrokeWithColor(num);

}
ColorSpiro.prototype.drawOneStrokeWithColor = function(num) {

	// FILL
	this.ctx.beginPath();
	this.angle = 2*Math.PI / this.nodeNum * num;
	//this.ctx.rotate(this.angle);
	this.ctx.lineWidth = this.lineWidth*3;
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255/6;
	// fill gradient
	var lingrad = this.ctx.createLinearGradient(0,0,Math.cos(this.angle)*100,Math.sin(this.angle)*100);
    lingrad.addColorStop(0.4, "rgb("+this.bgColor[0]+","+this.bgColor[1]+","+this.bgColor[2]+")");
    lingrad.addColorStop(1, "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")");

    //this.ctx.rotate(- Math.PI / 2)
	this.ctx.moveTo(this.xPoint[0], this.yPoint[0]);
	for(var i = 0; i<this.xPoint.length; i++){
		this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
	}

	this.ctx.fillStyle = lingrad;
	this.ctx.fill();

	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255/4;
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.beginPath();
		//this.ctx.rotate(- Math.PI / 2)
		this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI) ;
		this.ctx.stroke();
	}
	

}

ColorSpiro.prototype.stroke = function(){

	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.rotate(this.angle)
	this.ctx.lineWidth = this.lineWidth;
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255;
	this.ctx.moveTo(this.prev_x, this.prev_y);
	this.ctx.lineTo(this.x1, this.y1);
	this.ctx.stroke();
	this.ctx.restore();

	this.prev_x = this.x1;
	this.prev_y = this.y1;
}


ColorSpiro.prototype.drawAllGradient = function(alpha){


	this.alpha = this.preAlpha = alpha ? alpha : 50;

	for(var i = 0; i<this.gearNum; i++){
		this.currentGear = i;
		this.initData(i);
		for(var j = 0; j<this.distanceNum[i]; j++){
			this.currentDistance = j;
			for(var k = 0; k<this.nodeNum; k++){
				for(var n = 0; n<this.steps; n++){
					this.theta = this.index[k] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
					this.batchedLine();
					this.pushPoint(n);
				}
				this.drawOneStroke(k);
			}

		}
	}

	this.currentGear = this.currentDistance = 0;


}

ColorSpiro.prototype.drawOneStroke = function(num) {
	
	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255/2;
	
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rotate(this.angle)
		this.ctx.moveTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI)*this.lineWidth;
		this.ctx.stroke();
		this.ctx.restore();
	}
}
ColorSpiro.prototype.drawOneStrokeWithSolidColor = function(num, isFill) {

	if(isFill){
		this.color = this.nodeColor[num];
	}
	else
		this.color = this.bgColor;

	// FILL
	this.ctx.beginPath();
	this.angle = 2*Math.PI / this.nodeNum * num;
	//this.ctx.rotate(this.angle);
	this.ctx.lineWidth = this.lineWidth;
	this.ctx.strokeStyle = "rgb("+this.nodeColor[num][0]+","+this.nodeColor[num][1]+","+this.nodeColor[num][2]+")";

	if(isFill)
		this.ctx.globalAlpha = this.alpha/255;
	else
		this.ctx.globalAlpha = 255;

	this.ctx.globalAlpha = this.alpha/255;

	this.ctx.moveTo(this.xPoint[0], this.yPoint[0]);
	for(var i = 0; i<this.xPoint.length; i++){
		this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
	}

	this.ctx.fillStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.fill();

	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.nodeColor[num][0]+","+this.nodeColor[num][1]+","+this.nodeColor[num][2]+")";
	this.ctx.globalAlpha = this.alpha/255;
	
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.beginPath();
		this.ctx.moveTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI);
		this.ctx.stroke();
	}

}


ColorSpiro.prototype.drawShift = function(alpha, shift){


	this.alpha = this.preAlpha = alpha ? alpha : 50;

	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);
		for(var j = 0; j<this.distanceNum[i]; j++){

			this.angle += shift * this.perGear;
			for(var k = 0; k<this.nodeNum; k++){
				
				for(var n = 0; n<this.steps; n++){
					this.theta = k * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
					this.batchedLine(i,j);
					//if(n!= 0)
					//	this.stroke();
					this.pushPoint(n);
				}
				this.drawOneStroke(k);
			}

		}
	}

	this.currentGear = this.currentDistance = 0;
}
