

// class TwitterSpiro
var TwitterSpiro = function(r1, r2, d, z){

	SpiroGraph.call(this, r1, r2, d, z);

	// data
	this.initData(0);

	

	this.color= [200,200,200]
	this.initData(0);
	this.nodeColor = [];
	this.bgColor = [255,255,255];
	this.first = true;

	// rotate
	this.shift = 0;
	this.ctx.rotate(- Math.PI / 2);
	this.angle = 0;

	this.isStrokeFill = 1;

}
TwitterSpiro.prototype = Object.create(SpiroGraph.prototype)
TwitterSpiro.prototype.constructor = TwitterSpiro;
TwitterSpiro.prototype.setNodeColor = function(num,item){
	this.nodeColor[num] = item;
}

TwitterSpiro.prototype.setShift = function(item){
	this.shift = item;
}
TwitterSpiro.prototype.setStroke = function(item){
	this.isStroke = item;
}
TwitterSpiro.prototype.setStrokeFill = function(item){
	this.isStrokeFill = item;
}

TwitterSpiro.prototype.drawAll = function(alpha){

	this.alpha = this.preAlpha = alpha ? alpha : 50;

	for(var i = 0; i<this.gearNum; i++){
		this.initData(i);
		for(var j = 0; j<this.distanceNum[i]; j++){
			for(var k = 0; k<this.nodeNum; k++){
				
				this.angle = this.shift * this.perGear * j;
				for(var n = 0; n<this.steps; n++){
					this.theta = k * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
					this.batchedLine(i,j);
					this.pushPoint(n);
				}
				this.drawOneStroke(0);
			}
		}
	}
}



TwitterSpiro.prototype.drawGradientStroke = function(num, distance){

	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.angle = this.shift * this.perGear * distance;
		this.gradientAngle = 2*Math.PI / this.nodeNum * num;
		this.batchedLine(0,distance);
		this.pushPoint(n);
	}
	this.drawOneStroke(this.isStrokeFill);
}




TwitterSpiro.prototype.drawOneStroke = function(isFill) {
			
	// FILL	
	if(isFill){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rotate(this.angle);
		this.ctx.lineWidth = 0;
		this.ctx.globalAlpha = this.alpha/255/2;
		// fill gradient

		var midIndex = parseInt(this.xPoint.length/2);
		var midD = parseInt( Math.sqrt( Math.pow(this.xPoint[midIndex],2) + Math.pow(this.yPoint[midIndex],2) ));

		var lingrad = this.ctx.createLinearGradient(0,0,Math.cos(this.gradientAngle)*midD,Math.sin(this.gradientAngle)*midD);
	    lingrad.addColorStop(0, "rgba("+this.bgColor[0]+","+this.bgColor[1]+","+this.bgColor[2]+",0)");
	    lingrad.addColorStop(1, "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")");

		this.ctx.moveTo(this.xPoint[0], this.yPoint[0]);
		for(var i = 0; i<this.xPoint.length; i++){
			this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
		}

		this.ctx.fillStyle = lingrad;
		this.ctx.fill();
		this.ctx.restore();
	}
		
	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255;
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rotate(this.angle);
		this.ctx.moveTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);

		// if it has stroke style
		if(this.isStroke)
			this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI)*this.lineWidth;
		else
			this.ctx.lineWidth = this.lineWidth;

		this.ctx.stroke();
		this.ctx.restore();
	}
}



TwitterSpiro.prototype.drawOneStrokeWithSolidColor = function(num, isFill) {

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


TwitterSpiro.prototype.drawShift = function(alpha, shift){


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
