
// class ActivitySpiro
var ActivitySpiro = function(index, r1, r2, d, z){

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
ActivitySpiro.prototype = Object.create(SpiroGraph.prototype)
ActivitySpiro.prototype.constructor = ActivitySpiro;


ActivitySpiro.prototype.draw = function(){

	this.radius = 10;   
	this.centerX = -100;
	this.centerY = 0;
	this.centerTheta = 0;

	this.alpha = 55;
	var self = this;
	var rate = this.speed * 1000 / this.steps;

	this.currentGear = 0;
	this.currentDistance = 0;
	this.theta = 0;
	this.initData(this.currentGear);
	this.interval = setInterval(function(){
		
		if(self.theta > (self.loopAngle ) * Math.PI){
			self.currentDistance ++;

			// start new gear
			if(self.currentDistance>=self.distanceNum[self.currentGear]){
				self.currentGear ++;
				self.currentDistance = 0;

			}
			// end
			if(self.currentGear >= self.gearNum){
				self.currentGear = 0;
				self.currentDistance = 0;

				self.centerY += 30;
			}
			
			self.theta = 0;
			self.initData(self.currentGear);
		}
		self.theta += self.angleDiv;
		self.radius += 0.01
			
		//self.centerTheta += 0.05/360 * Math.PI * 2;
		//self.centerX = (self.radius * Math.cos(self.centerTheta));
		//self.centerY = (self.radius * Math.sin(self.centerTheta));


		if(!self.centerpreX){
			self.centerpreX = self.centerX;
			self.centerpreY = self.centerY;
		}
		else{
			self.ctx.save();
			self.ctx.beginPath();
			self.ctx.lineWidth = self.lineWidth;
			self.ctx.strokeStyle = "rgb("+self.color[0]+","+self.color[1]+","+self.color[2]+")";
			self.ctx.globalAlpha = 1;
			self.ctx.moveTo(self.centerpreX, self.centerpreY);
			self.ctx.lineTo(self.centerX, self.centerY);
			self.ctx.stroke();
			self.ctx.restore();
			self.centerpreX = self.centerX;
			self.centerpreY = self.centerY;
			console.log(self.centerY)
		}
			
		self.batchedLine();
		if(self.prev_x)
			self.stroke();
	}, rate);


}


		
  
