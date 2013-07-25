

// class TimeSpiro
var TimeSpiro = function(index, r1, r2, d, z){

	SpiroGraph.call(this, index, r1, r2, d, z);

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
	this.preAlpha = 50;
	this.first = true;
}
TimeSpiro.prototype = Object.create(SpiroGraph.prototype)
TimeSpiro.prototype.constructor = TimeSpiro;
TimeSpiro.prototype.setType = function(type){
	this.type = type;
}
TimeSpiro.prototype.setColor = function(color){
	this.drawCLR["color1"] = color;
	this.color = color;
}
TimeSpiro.prototype.getTheta = function(color){
	
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


TimeSpiro.prototype.redraw = function(){
	
	this.ctx.clearRect ( -this.width/2, -this.height/2, this.width, this.height); 
	this.drawAll(this.preAlpha);
	this.drawContinue();
}

TimeSpiro.prototype.drawNum = function(s,m,h){

	if(s&&m&&h){
		var index = h;
		var index2 = m;
	}
	else if(s&&m&&!h){
		var index = m;
		var index2 = s;
	}
	else if(s&&!m&&!h){
		var index = s;
		var index2 = 0;
	}

	this.alpha = 255;
	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);

		for(var j = 0; j<this.distanceNum[i]; j++){

			var tempDistance = this.pointDistance[i][j];
			for(var k = 0; k<index; k++){
				
				for(var n = 0; n<this.steps; n++){
					this.theta = k * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
					this.batchedLine(i,j);
					if(n!=0)
						this.stroke();
				}
			}

			this.pointDistance[i][j] = tempDistance;
			if(index2){
				
				for(var n = 0; n<index2; n++){
					this.theta = k * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
					this.batchedLine(i,j);

					if(n!=0)
						this.stroke();
				}
			}
		}
		
			
	}
	
}
TimeSpiro.prototype.drawContinue = function(){

	var self = this;
	this.alpha = 255;
	var rate = this.speed * 1000 / this.steps;
	if(this.first){
		this.first = false;
		switch(this.type){
			case "s":
				this.drawNum(this.second );
				var count = (this.second ) * this.steps;
				break;
			case "m":
				this.drawNum(this.second, this.minute );
				var count = parseInt((this.minute + this.second/60) * this.steps );
				break;
			case "h":
				this.drawNum(this.second, this.minute, this.hour );
				var count = parseInt((this.hour + this.minute/60) * this.steps );
				break;
		}

	}
	else 
		count = 0;
		

	var lastI = -1;
	//var distance = this.pointDistance[0][0];

	this.interval = setInterval(function(){

		count ++;
		var i = parseInt(count / self.steps);
		var j = count % self.steps;

		if(i == self.nodeNum){
			clearInterval(self.interval);
			self.redraw();
		}

		if(i!= lastI){
			lastI = i;
			//self.pointDistance[0][0] = Math.random() * 10 + distance;
			/*
			self.color = [parseInt(self.drawCLR["color1"][0] + Math.random()*100 - 50), 
						  parseInt(self.drawCLR["color1"][1] + Math.random()*100 - 50), 
						  parseInt(self.drawCLR["color1"][2] + Math.random()*100 - 50)]
			*/
		}
		//self.setAlpha(j, tempAlpha);
		//self.theta = (self.index[i] + j/self.steps) * self.anglePerNode - self.anglePerNode/2; 
		self.theta = (i + j/self.steps) * self.anglePerNode - self.anglePerNode/2; 
		
		self.batchedLine(0,0);
		if(j!=0)
			self.stroke();
	}, rate);
	
	

}









