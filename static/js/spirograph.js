

// class SpiroGraph
var SpiroGraph = function(index, r1, r2, d, z, w){

	this.zoom = z ? z : 1;
	var self = this;
	this.outerRadius = r1*this.zoom;
	this.innerRadius = r2;
	this.gearNum = r2.length;

	for(var i = 0; i<this.innerRadius.length; i++){
		this.innerRadius[i] *= this.zoom;
	}

	this.index = index;
	// canvas
	this.$canvas = $("<canvas id='canvas"+this.index+"'></canvas>");
	this.$box = $("<div></div>");
	this.$box.append(this.$canvas);
	$("body").append(this.$box);

	this.width = this.height = w ? w : this.outerRadius*2;
	this.center = w ? w/2 : this.outerRadius;
	this.$canvas.attr("width", this.width).attr("height", this.height);

	this.processing;
	this.processingInstance = new Processing(this.$canvas[0], initProcessing);
	this.strokeWeight = 0.4;

	function initProcessing(processing){

		processing.size(self.width, self.height);
		processing.background(255,0);
		processing.noLoop();
		processing.frameRate(30);
		processing.strokeWeight(0.4);
		processing.translate(self.center, self.center);
		self.processing = processing;

	}
	this.pointDistance = [];
	this.distanceNum = [];
	this.totalSpiroNum = 0;
	for(var i = 0; i<this.gearNum; i++){
		this.pointDistance[i] = [];
		for(var j = 0; j<d[i].length; j++)
			this.pointDistance[i][j] = this.innerRadius[i] - d[i][j]*3*this.zoom;
		this.distanceNum[i] = j;
		this.totalSpiroNum += j;
	}

	this.theta = 0;
	this.speed = 0.1;  // seconds to draw one node
	this.steps = 50;

	this.currentGear = 0;
	this.currentDistance = 0;

	this.perGear = Math.PI * 2 / r1;
	this.startGear = 0;
	this.startAngle = this.perGear * this.startGear;

	this.nodeNum = [];
	this.loopAngle = [];
	
	this.alpha = 255;
	this.color = [0,0,0];
	this.drawCLR = {
		green: [128,181,52],
		blue: [64,159,184],
		red: [242,59,79]
	}
	
	this.positionX = 0;
	this.positionY = 0;
	this.interval;

}
SpiroGraph.prototype.initData = function(index){

	this.gcdNum = this.gcd(this.outerRadius,this.innerRadius[index]);
	this.nodeNum = this.outerRadius / this.gcd(this.outerRadius,this.innerRadius[index]);
	this.loopAngle = this.innerRadius[index] / this.gcd(this.outerRadius,this.innerRadius[index]) * 2; // * Math.PI
	this.anglePerNode = this.loopAngle * Math.PI / this.nodeNum;
	this.angleDiv = this.anglePerNode / this.steps;

	this.index = [];
	var temp = (this.outerRadius - this.innerRadius[index]) / this.gcdNum;
	for(var i = 0; i<this.nodeNum; i++){
		if(i * temp % this.nodeNum != 0)
			this.index[this.nodeNum - i * temp % this.nodeNum] = i;
		else
			this.index[0] = 0;
	}
}
SpiroGraph.prototype.setSpeed = function(item){
	this.speed = item; // seconds to draw one node
}
SpiroGraph.prototype.setPosition = function(x,y){
	this.positionX = x;
	this.positionY = y;
	this.$box.css("left",x-this.width/2).css("top",y-this.height/2);
}
SpiroGraph.prototype.setSteps = function(item){
	this.steps = item; 
}
SpiroGraph.prototype.setAlpha = function(index, total){
	
	// alpha
	var tempDiv = Math.floor(total / this.steps * 2);
	this.alpha = total - Math.abs(index - this.steps/2)*tempDiv;
}

SpiroGraph.prototype.drawNode = function(num, distance){


	this.alpha = 255;
	this.initData(this.currentGear);
	this.theta = (this.index[num] + 0.5) * this.anglePerNode;
	
	for(var j = 0; j<this.steps; j++){
		this.setAlpha(j, 255);
		this.batchedLine(this.currentGear,distance);
	}
	
}

/* 
 * Returns the GCD of the given integers. Each input must be non-negative.
 */
SpiroGraph.prototype.gcd = function(x,y){

	while (y != 0) {
		var z = x % y;
		x = y;
		y = z;
	}
	return x;
}


SpiroGraph.prototype.preDraw = function(alpha){


	this.alpha = alpha ? alpha : 255;


	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);

		if(i == 0)
			this.color = this.drawCLR.green;
		else if(i == 1)
			this.color = this.drawCLR.blue;
		else if(i == 2)
			this.color = this.drawCLR.red;

		for(var j = 0; j<this.distanceNum[i]; j++){
			this.theta = 0;
			for(var k = 0; k<this.nodeNum; k++){
				for(var n = 0; n<this.steps; n++){
					this.batchedLine(i,j);
				}
			}
				
		}
	}
}

SpiroGraph.prototype.draw = function(){
	this.alpha = 255;
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
				self.initData(self.currentGear);

				if(self.currentGear == 0)
					self.color = self.drawCLR.green;
				else if(self.currentGear == 1)
					self.color = self.drawCLR.blue;
				else if(self.currentGear == 2)
					self.color = self.drawCLR.red;

			}
			self.theta = 0;

			// end
			if(self.currentGear > self.gearNum){
				clearInterval(self.interval);
			}
		}
		
		self.batchedLine();
	}, rate);


}
SpiroGraph.prototype.batchedLine = function(i,j) {

	this.processing.stroke(this.color[0], this.color[1], this.color[2], this.alpha);

	var i = i ? i : this.currentGear;
	var j = j ? j : this.currentDistance

	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[i]);
	var val2 = this.outerRadius - this.innerRadius[i];

	var x1 = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.cos(val1);
	var y1 = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.sin(val1);

	this.theta += this.angleDiv;
	val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[i]);
	val2 = this.outerRadius - this.innerRadius[i];
	x2 = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.cos(val1);
	y2 = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.sin(val1);
	
	this.processing.line(x1, y1, x2, y2);
}



