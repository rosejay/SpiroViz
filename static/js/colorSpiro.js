

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
	this.color= [0,0,0]
	this.initData(0);
	this.nodeColor = [];
	this.bgColor = [255,255,255];
	this.first = true;
}
ColorSpiro.prototype = Object.create(SpiroGraph.prototype)
ColorSpiro.prototype.constructor = ColorSpiro;
ColorSpiro.prototype.setNodeColor = function(num,item){
	this.nodeColor[num] = item;
}

ColorSpiro.prototype.drawStroke = function(num, distance, isFill){

	//this.nodeColor[num] = color;
	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.batchedLine(this.currentGear,distance);
		this.pushPoint(n);
	}
	this.drawOneStrokeWithSolidColor(num,isFill);

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
	
	this.color = [0,0,0]
	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255/2;
	
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.beginPath();
		this.ctx.moveTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI)*this.lineWidth;
		this.ctx.stroke();
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
	this.ctx.lineWidth = this.lineWidth*3;
	this.ctx.strokeStyle = "rgb("+this.nodeColor[num][0]+","+this.nodeColor[num][1]+","+this.nodeColor[num][2]+")";
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
	this.ctx.globalAlpha = this.alpha/255/2;
	
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.beginPath();
		this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI);
		this.ctx.stroke();
	}

}
