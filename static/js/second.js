

// class TimeSpiro
var TimeSpiro = function(index, r1, r2, d){

	SpiroGraph.call(this, index, r1, r2, d);

	// data
	this.initData(0);

	// rotate
	this.angle = - Math.PI / 2;

	this.drawCLR = {
		color1: [233,43,115],
		color2: [0,0,0]
	}
	this.hour = date.hour;
	this.minute = date.minute;
	this.second = date.second;
	this.initData(0);

}
TimeSpiro.prototype = Object.create(SpiroGraph.prototype)
TimeSpiro.prototype.constructor = TimeSpiro;
TimeSpiro.prototype.setType = function(type){
	this.type = type;
}
TimeSpiro.prototype.setColor = function(color){
	this.color = color;
}
TimeSpiro.prototype.preDraw = function(alpha){

	this.alpha = alpha ? alpha : 255;

	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);

		for(var j = 0; j<this.distanceNum[i]; j++){
			
			for(var k = 0; k<this.nodeNum; k++){
				this.pointDistance[i][j] = Math.random() * 20 + 40;
				this.theta = (this.index[k] + 0.5) * this.anglePerNode;

				for(var n = 0; n<this.steps; n++){
					this.batchedLine(i,j);
				}
			}
		}
	}
}

TimeSpiro.prototype.drawAll = function(alpha){

	this.preAlpha = alpha;
	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);
		this.processing.pushMatrix();
		this.processing.strokeWeight(this.strokeWeight);
		this.processing.rotate(this.angle);

		for(var j = 0; j<this.distanceNum[i]; j++){

			var tempDistance = this.pointDistance[i][j];
			for(var k = 0; k<this.nodeNum; k++){

				var index = k + i*this.nodeNum;
				this.alpha = this.preAlpha;
				this.theta = this.index[k] * this.anglePerNode - this.anglePerNode/2;

				this.pointDistance[i][j] = tempDistance - 10 + Math.random() * 20;
				for(var n = 0; n<this.steps; n++){
					this.batchedLine(i,j);
				}
			}

			this.pointDistance[i][j] = tempDistance;
		}
		this.processing.popMatrix();
	}

}

TimeSpiro.prototype.redraw = function(){

	this.processing.background(255,0)
	this.processing.noStroke();
	this.drawAll(this.preAlpha);
	this.draw();
}

TimeSpiro.prototype.drawNum = function(index){

	
	this.alpha = 255;
	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);
		this.processing.pushMatrix();
		this.processing.strokeWeight(this.strokeWeight);
		this.processing.rotate(this.angle);

		for(var j = 0; j<this.distanceNum[i]; j++){

			var tempDistance = this.pointDistance[i][j];
			for(var k = 0; k<index; k++){

				this.alpha = this.preAlpha;
				this.theta = this.index[k] * this.anglePerNode - this.anglePerNode/2;
				console.log("d",index)
				//this.pointDistance[i][j] = tempDistance - 10 + Math.random() * 20;
				for(var n = 0; n<this.steps; n++){
					this.batchedLine(i,j);
				}
			}

			this.pointDistance[i][j] = tempDistance;
		}
		this.processing.popMatrix();
	}
	
}
TimeSpiro.prototype.draw = function(){

	var self = this;

	this.alpha = 255;
	var rate = this.speed * 1000 / this.steps;
	
	var currentTime = 0;
	switch(this.type){
		case "s":
			currentTime = this.second - 1;
			break;
		case "m":
			currentTime = this.minute - 1;
			break;
		case "h":
			currentTime = this.hour - 1;
			break;
		default:
			currentTime = this.second - 1;
	}

	this.drawNum(currentTime);
	var secondCount = (currentTime) * this.steps;

	this.interval = setInterval(function(){

		//self.redraw();
		//self.drawAll(self.preAlpha);
		secondCount ++;
		var i = parseInt(secondCount / self.steps);
		var j = secondCount % self.steps;
		
		if(i == self.nodeNum){
			clearInterval(self.interval);
			self.redraw();
		}

		//self.setAlpha(j, tempAlpha);
		self.theta = (self.index[i] + j/self.steps) * self.anglePerNode - self.anglePerNode/2; 
		self.processing.pushMatrix();
		self.processing.rotate(self.angle);
		

		self.batchedLine(0,0);
		self.processing.popMatrix();

	}, rate);
	
	

}









