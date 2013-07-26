

// class SpiroGraph
var SpiroGraph = function(r1, r2, d, z){

	var self = this;

	// init r1 r2
	this.zoom = z ? z : 1;
	this.outerRadius = parseInt(r1*this.zoom);
	this.innerRadius = r2;
	this.gearNum = r2.length;

	for(var i = 0; i<this.innerRadius.length; i++){
		this.innerRadius[i] *= this.zoom;
		this.innerRadius[i] = parseInt(this.innerRadius[i]);
	}

	// set d
	this.pointDistance = [];
	this.distanceNum = [];
	this.totalSpiroNum = 0;
	for(var i = 0; i<this.gearNum; i++){
		this.pointDistance[i] = [];
		for(var j = 0; j<d[i].length; j++)
			//this.pointDistance[i][j] = this.innerRadius[i] - d[i][j]*3*this.zoom;
			this.pointDistance[i][j] = parseInt(d[i][j]*this.zoom);
		this.distanceNum[i] = j;
		this.totalSpiroNum += j;
	}

	// add canvas
	this.$canvas = $("<canvas></canvas>");
	//this.$box = $("<div></div>");
	//this.$box.append(this.$canvas);
	$(".demoCanvas").append(this.$canvas);

	this.width = this.height = this.outerRadius*5;
	this.center = this.width/2;

	// drawing style
	this.lineWidth = 0.4;


	this.$canvas.attr("width", this.width).attr("height", this.height);
	this.ctx = this.$canvas[0].getContext("2d");
	this.ctx.fillStyle="rgb(0,0,0)";
	this.ctx.globalAlpha = 0;
	this.ctx.fillRect(0,0,this.width,this.height);
	this.ctx.fill();
	this.ctx.lineWidth = this.lineWidth;
	this.ctx.translate(this.center, this.center);


	
	this.theta = 0;
	this.speed = 0.1;  // seconds to draw one node
	this.steps = 60;

	this.currentGear = 0;
	this.currentDistance = 0;

	this.perGear = Math.PI * 2 / this.outerRadius;
	this.startGear = 0;
	this.startAngle = this.perGear * this.startGear;

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

	this.shift = 0;
}

SpiroGraph.prototype.stopDrawing = function(){
	window.clearInterval(this.interval);
}

SpiroGraph.prototype.initData = function(index){

	this.gcdNum = this.gcd(this.outerRadius,this.innerRadius[index]);

	this.nodeNum = this.outerRadius / this.gcdNum; // the number of nodes in this spirograph
	this.loopAngle = this.innerRadius[index] / this.gcdNum * 2; // * Math.PI
	this.anglePerNode = this.loopAngle * Math.PI / this.nodeNum;
	this.angleDiv = this.anglePerNode / this.steps;

	this.index = [];  // to draw spirograph one node by one node
	var temp = (this.outerRadius - this.innerRadius[index]) / this.gcdNum;
	for(var i = 0; i<this.nodeNum; i++){
		if(i * temp % this.nodeNum != 0)
			this.index[this.nodeNum - i * temp % this.nodeNum] = i;
		else
			this.index[0] = 0;
	}
}




SpiroGraph.prototype.setStartAngle = function(item){

	this.startGear = item;
	this.angle += this.perGear * this.startGear;
}
SpiroGraph.prototype.setPosition = function(x,y){
	this.positionX = x;
	this.positionY = y;
	this.$canvas.css("left",x-this.width/2).css("top",y-this.height/2);
}
SpiroGraph.prototype.setSpeed = function(item){
	this.speed = item; // seconds to draw one node
}
SpiroGraph.prototype.setSteps = function(item){
	this.steps = item; 
}
SpiroGraph.prototype.setAlpha = function(item){
	this.alpha = item;
	this.preAlpha = item;
}
SpiroGraph.prototype.setShift = function(item){
	this.shift = item; 
}
SpiroGraph.prototype.setColor = function(item){
	this.color = item;
}
SpiroGraph.prototype.setFillColor = function(item){
	this.fillColor = item;
}
SpiroGraph.prototype.setLineWidth = function(item){
	this.lineWidth = item;
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

SpiroGraph.prototype.redraw = function(){
	this.ctx.clearRect ( -this.width/2, -this.height/2, this.width, this.height); 
}
SpiroGraph.prototype.drawAll = function(alpha){


	this.alpha = this.preAlpha = alpha ? alpha : 50;
	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);

		



		for(var j = 0; j<this.distanceNum[i]; j++){

			var tempDistance = this.pointDistance[i][j];
			//this.lineWidth += 0.2;
			//this.alpha +=20;
			//this.color = [131,205,230]

			for(var k = 0; k<this.nodeNum; k++){
				
				//this.pointDistance[i][j] = tempDistance - 10 + Math.random() * 20;



				for(var n = 0; n<this.steps; n++){
					this.theta = k * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
					this.angle = this.shift * j * this.perGear;
					this.batchedLine(i,j);
					if(n!= 0 && this.prev_x)
						this.stroke();
				}
			}
			this.prev_x = 0;
			this.prev_y = 0;
			this.pointDistance[i][j] = tempDistance;
		}
	}

	this.currentGear = this.currentDistance = 0;
}




SpiroGraph.prototype.draw = function(){
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
				self.initData(self.currentGear);

			}
			self.theta = 0;

			// end
			if(self.currentGear >= self.gearNum){
				clearInterval(self.interval);
			}
		}

		self.theta += self.angleDiv;
		self.batchedLine();
		if(self.prev_x)
			self.stroke();
	}, rate);


}

SpiroGraph.prototype.stroke = function(){

	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.rotate(this.angle);
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






SpiroGraph.prototype.pushPoint = function(n) {

	if(n == 0){
		this.xPoint = [];
		this.yPoint = [];
	}
	this.xPoint.push(this.x1);
	this.yPoint.push(this.y1);

}

SpiroGraph.prototype.batchedLine = function(i,j) {


	var i = i ? i : this.currentGear;
	var j = j ? j : this.currentDistance;

	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[i]);
	var val2 = this.outerRadius - this.innerRadius[i];

	this.x1 = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.cos(val1);
	this.y1 = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.sin(val1);

	if(!this.prev_x){
		this.prev_x = this.x1;
		this.prev_y = this.y1;
	}

}




