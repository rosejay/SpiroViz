

// class SpiroMove
var SpiroMove = function(x, y, radius_1, radius_2, point_distance){

	var self = this;

    this.center_x = x;
    this.center_y = y;
    this.r1 = radius_1;
    this.r2 = radius_2;
    this.h = point_distance;

    this.width = x*2;
    this.height = y*2;

	this.x = 0; 
	this.y = 0;
	this.prev_x = 0; 
	this.prev_y = 0;
	this.iter = 0;
	this.first = true;

	this.interval;


	// canvas
	this.$canvas = $("<canvas id='canvas"+this.index+"'></canvas>");
	$("body").append(this.$canvas);
	
	this.$canvas.attr("width", this.width).attr("height", this.height);

	this.processing;
	this.processingInstance = new Processing(this.$canvas[0], initProcessing);
	this.strokeWeight = 0.4;

	function initProcessing(processing){

		processing.size(self.width, self.height);
		processing.background(255,0);
		processing.smooth();
		processing.loop();
		processing.frameRate(30);
		processing.strokeWeight(self.strokeWeight);
		self.processing = processing;
	}

}

SpiroMove.prototype.draw = function(index) {

	var r1 = 100;
	var incr = 0.05;
	var self = this;

	this.interval = setInterval(function(){

		r1 += incr;
		if(r1 > 140)
			r1 = 100;

		self.processing.background(255,0);
		if(index == 0){
			self.init(self.center_x, self.center_y, r1, 78, 53); 
		}
		else if(index == 1){
			self.init(self.center_x, self.center_y, 75, r1, 64); 
		}
		else if(index == 2){
			self.init(self.center_x, self.center_y, 75, 64, r1); 
		}
		
		self.drawIterations(2000, incr);

	}, 30);

		

}
SpiroMove.prototype.init = function(x, y, radius_1, radius_2, point_distance) {
	
	this.center_x = x;
	this.center_y = y;
	this.r1 = radius_1;
	this.r2 = radius_2;
	this.h = point_distance;
	this.first = true;
}
SpiroMove.prototype.drawIterations = function(iter, incr) {
    
    var rads = 0.0;
	for(var i=0; i<iter; ++i) {
		this.processing.stroke((Math.sin(Math.PI*(i/iter+1))+1)*255);
		this.drawPoint(rads);
		rads+=incr;
	}
}

SpiroMove.prototype.drawPoint = function(rads) {

	this.x = this.center_x + (this.r1-this.r2)*Math.cos(rads)+this.h*Math.cos((this.r1-this.r2)/this.r2*rads);
	this.y = this.center_y + (this.r1-this.r2)*Math.sin(rads)+this.h*Math.sin((this.r1-this.r2)/this.r2*rads);

	if(this.first) {
		this.first = false;
	}
	else {
		this.processing.line(this.prev_x, this.prev_y, this.x, this.y);
	}

	this.prev_x = this.x;
	this.prev_y = this.y;
}

