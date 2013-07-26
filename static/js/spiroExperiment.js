

// class SpiroGraph
var SpiroGraph = function(array){

	var self = this;

	// init r1 r2 d
	this.outerRadius = array[0];
	this.innerRadius = array[1];
	this.pointDistance = array[2];

	// init other attributes
	this.color = array[3];
	this.maxAlpha = array[4];
	this.lineWidth = array[5];
	this.speed = array[6];
	this.animation = array[8];

	// inner drawing attributes
	this.theta = 0;
	this.steps = 60;
	this.alpha = this.maxAlpha;

	// rotate
	this.angle = - Math.PI / 2;

	// starting point
	this.perGear = Math.PI * 2 / this.outerRadius;
	this.startGear = 0;
	this.startAngle = this.perGear * this.startGear;
	
	// position
	this.positionX = 0;
	this.positionY = 0;

	// interval
	this.interval;

	// init
	this.initData();
}

SpiroGraph.prototype.updateAttr = function(array){

	this.stopDraw();
	// init r1 r2 d
	this.outerRadius = array[0];
	this.innerRadius = array[1];
	this.pointDistance = array[2];

	// init other attributes
	this.color = array[3];
	this.maxAlpha = this.alpha = array[4];
	this.lineWidth = array[5];
	this.speed = array[6];
	this.animation = array[8];

	// init
	this.initData();
}

SpiroGraph.prototype.initCanvas = function(){

	if(this.parent){

		// add canvas
		this.$canvas = $("<canvas></canvas>");
		this.parent.append(this.$canvas);

		this.$canvas.attr("width", this.width).attr("height", this.height);
		this.ctx = this.$canvas[0].getContext("2d");
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.translate(this.center, this.center);
	}
}

SpiroGraph.prototype.initData = function(){

	this.gcdNum = this.gcd(this.outerRadius,this.innerRadius);
	this.nodeNum = this.outerRadius / this.gcdNum; // the number of nodes in this spirograph
	this.loopAngle = this.innerRadius / this.gcdNum * 2; // * Math.PI
	this.anglePerNode = this.loopAngle * Math.PI / this.nodeNum;
	this.angleDiv = this.anglePerNode / this.steps;

	this.index = [];  // to draw spirograph one node by one node
	var temp = (this.outerRadius - this.innerRadius) / this.gcdNum;
	for(var i = 0; i<this.nodeNum; i++){
		if(i * temp % this.nodeNum != 0)
			this.index[this.nodeNum - i * temp % this.nodeNum] = i;
		else
			this.index[0] = 0;
	}

	this.drawData = [];
	this.totalSteps = this.nodeNum * this.steps;
	this.totalAngle = this.loopAngle * Math.PI;

	for(var i = 0; i<this.nodeNum; i++){
		this.drawData[i] = [];
		for(var j = 0; j<this.steps; j++){

			this.theta = (i * this.steps + j) / this.totalSteps * this.totalAngle - this.anglePerNode/2;
			this.batchedLine();
			this.drawData[i][j] = new MyDrawData(this.x1, this.y1);
		}
	}

	this.data = this.drawData;
}



SpiroGraph.prototype.setParent = function(item){
	this.parent = item;
}
SpiroGraph.prototype.setWidth = function(item){
	this.width = item;
	this.height = item;
	this.center = item/2;
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
SpiroGraph.prototype.setColor = function(color){
	this.color = color;
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


SpiroGraph.prototype.stopDraw = function(){
	clearInterval(this.interval);
	this.redraw();
}


SpiroGraph.prototype.setAlpha = function(index, total){
	
	// alpha
	var tempDiv = Math.floor(total / this.steps * 2);
	this.alpha = total - Math.abs(index - this.steps/2)*tempDiv;
}

SpiroGraph.prototype.drawNode = function(num){

	this.alpha = 255;
	this.theta = (this.index[num] + 0.5) * this.anglePerNode;
	
	for(var j = 0; j<this.steps; j++){
		this.setAlpha(j, 255);
		this.batchedLine();
	}
	
}

SpiroGraph.prototype.redraw = function(){
	this.ctx.clearRect ( -this.width/2, -this.height/2, this.width, this.height); 
}

SpiroGraph.prototype.drawAll = function(){

	this.redraw();
	this.strokeShape(this.totalSteps);
}

SpiroGraph.prototype.draw = function(){

	var self = this;
	var rate = this.speed * 1000 / this.steps;

	this.stopDraw();

	if(this.animation == 0){

		this.stopDraw();
		this.drawAll();
	}
	else if(this.animation == 1){

		var count = 0;
		this.data = this.drawData;

		this.interval = setInterval(function(){
			
			self.strokeShape(count)
			count++;
			// end
			if(count > self.totalSteps){
				self.stopDraw();
				self.draw();
			}
		}, rate);

	}
	else if(this.animation == 2){

		var count = 0;

		this.data = [];
		for(var i = 0; i<this.nodeNum; i++){
			var index = this.index[i];
			this.data[i] = this.drawData[index]
		}

		this.interval = setInterval(function(){
			
			self.strokeShape(count)
			count++;
			// end
			if(count > self.totalSteps){
				self.stopDraw();
				self.draw();
			}
		}, rate);



	}
	else if(this.animation == 3){

		var count = 0;

		this.data = [];
		for(var i = 0; i<this.nodeNum; i++){
			if(i == 0)
				var index = this.index[0];
			else{
				var index = this.index[this.nodeNum - i];
			}

			
			this.data[i] = this.drawData[index]
		}

		this.interval = setInterval(function(){
			
			self.strokeShape(count)
			count++;
			// end
			if(count > self.totalSteps){
				self.stopDraw();
				self.draw();
			}
		}, rate);

	}




}

SpiroGraph.prototype.stroke = function(){

	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.rotate(this.angle);
	this.ctx.lineWidth = this.lineWidth;
	this.ctx.strokeStyle = this.color;
	this.ctx.globalAlpha = this.alpha/100;
	this.ctx.moveTo(this.prev_x, this.prev_y);
	this.ctx.lineTo(this.x1, this.y1);
	this.ctx.stroke();
	this.ctx.restore();

	this.prev_x = this.x1;
	this.prev_y = this.y1;
}


SpiroGraph.prototype.strokeShape = function(index){


	this.redraw();

	this.ctx.save();
	this.ctx.rotate(this.angle);
	this.ctx.lineWidth = this.lineWidth;
	this.ctx.strokeStyle = this.color;
	this.ctx.globalAlpha = this.alpha/100;

	if(this.animation == 0 || this.animation == 1){
		
		this.ctx.beginPath();
		this.ctx.moveTo(this.data[0][0].x, this.data[0][0].y);

		var i=0,j=0;
		for(var n = 0; n<index; n++){

			i = parseInt(n / this.steps);
			j = n % this.steps;

			this.ctx.lineTo(this.data[i][j].x, this.data[i][j].y);
			if(n == this.totalSteps - 1)
				this.ctx.lineTo(this.data[0][0].x, this.data[0][0].y);
		}
		this.ctx.stroke();
	}
	else if(this.animation == 2 || this.animation == 3){

		var i=0,j=0;
		for(var n = 0; n<index; n++){

			i = parseInt(n / this.steps);
			j = n % this.steps;

			if(j == 0){
				this.ctx.beginPath();
				this.ctx.moveTo(this.data[i][j].x, this.data[i][j].y);
			}

			this.ctx.lineTo(this.data[i][j].x, this.data[i][j].y);
			
			if(j == this.steps - 1)
				this.ctx.stroke();
		}
		if (j != this.steps - 1)
			this.ctx.stroke();


	}
		

	// draw current point
	if(index != this.totalSteps){
		
		this.ctx.beginPath();
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = [0,0,0];
		this.ctx.globalAlpha = 1;
		this.ctx.arc(this.data[i][j].x, this.data[i][j].y, 5, 0, Math.PI*2);
		this.ctx.stroke();
	}
		

	this.ctx.restore();

}



SpiroGraph.prototype.drawOneStroke = function(num) {
	
	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255/2;
	
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.beginPath();
		this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI);
		this.ctx.stroke();
	}
}

SpiroGraph.prototype.drawOneStrokeWithColor = function(num) {

	// FILL
	this.ctx.beginPath();
	this.angle = 2*Math.PI / this.nodeNum * num;
	//this.ctx.rotate(this.angle);
	this.ctx.lineWidth = this.lineWidth*3;
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255/3;
	// fill gradient
	var lingrad = this.ctx.createLinearGradient(0,0,Math.cos(this.angle)*100,Math.sin(this.angle)*100);
    lingrad.addColorStop(0, '#fff');
    lingrad.addColorStop(1, "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")");

	this.ctx.moveTo(this.xPoint[0], this.yPoint[0]);
	for(var i = 0; i<this.xPoint.length; i++){
		this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
	}

	this.ctx.fillStyle = lingrad;
	this.ctx.fill();


	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alpha/255/2;
	
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.beginPath();
		this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI);
		this.ctx.stroke();
	}

}
SpiroGraph.prototype.pushPoint = function(n) {

	if(n == 0){
		this.xPoint = [];
		this.yPoint = [];
	}
	this.xPoint.push(this.x1);
	this.yPoint.push(this.y1);
}

SpiroGraph.prototype.batchedLine = function() {

	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius);
	var val2 = this.outerRadius - this.innerRadius;

	this.x1 = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance * Math.cos(val1);
	this.y1 = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance * Math.sin(val1);

	if(!this.prev_x){
		this.prev_x = this.x1;
		this.prev_y = this.y1;

	}

}



