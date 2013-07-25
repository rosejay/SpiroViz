

// class StrokeSpiro
var StrokeSpiro = function(index, r1, r2, d, z){

	SpiroGraph.call(this, index, r1, r2, d, z);

	// rotate
	this.angle = - Math.PI / 2;

	// data
	this.initData(0);

	this.drawCLR = {
		color1: [0,144,255],
		color2: [255,0,66],
		color3: [255,96,135]
	}

	this.smallLineWidth = 3;
	this.bigLineWidth = 5;
	this.onColor = [0,0,0];
	this.offColor = [150,150,150];

	this.alphaMax = 150;
	this.alphaList = []
	for(var i = 0; i<20; i++){
		this.alphaList[i] = this.getAlpha(i);
	}
}
StrokeSpiro.prototype = Object.create(SpiroGraph.prototype)
StrokeSpiro.prototype.constructor = StrokeSpiro;
StrokeSpiro.prototype.getAlpha = function(item){

	if(item < 5)
		return Math.sin((item+10)/30 * Math.PI) * this.alphaMax - 80;

	return Math.sin((item+10)/30 * Math.PI) * this.alphaMax;

}
StrokeSpiro.prototype.setBus = function(item){
	this.bus = item;
	if(this.bus == "9"){
		this.onColor = this.drawCLR["color1"];
	}
	else if(this.bus == "91"){
		this.onColor = this.drawCLR["color2"];
	}
	else if(this.bus == "91.1"){
		this.onColor = this.drawCLR["color3"];
	}
}



StrokeSpiro.prototype.drawBG = function(){

	var self = this;
	var rate = this.speed * 1000 / this.steps;
	this.r1 = this.outerRadius;
	var count = 0;
	this.ctx.rotate(this.angle);
	this.updateBusData();

	this.interval = setInterval(function(){

		if(self.bus == "9")
			self.outerRadius = - Math.abs(Math.sin(count)-1) *3 + self.r1;
		else
			self.outerRadius = Math.abs(Math.sin(count)-1) * 5 + self.r1;
		self.redraw();
		self.drawAllGradient(100);
		
		if(count > Math.PI){
			count = 0;
			self.updateBusData();
			console.log("d")
		}

		count += 0.05;

	}, rate)
}

StrokeSpiro.prototype.updateBusData = function(){

	// get current time
	date.init(); 

	var hour = date.hour;
	var minute = date.minute;
	var time = getTimeByHourMinute(hour, minute);
	busData = [];
	for(var i = 0; i<schedule.length; i++){

		var diff = schedule[i].time - time;
		if(diff >= 0 && diff < 20){
			schedule[i].diff = diff;

			for(var j = busData.length; j< diff; j++){
				busData[j] = 0;
			}	
			busData[diff] = schedule[i];
		}
	}
	for(var i = busData.length; i<20; i++){
		busData[i] = 0;
	}
}



StrokeSpiro.prototype.drawAllGradient = function(){

	for(var k = 0; k<this.nodeNum; k++){

		for(var n = 0; n<this.steps; n++){
			this.theta = this.index[k] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
			this.batchedLine();
			this.pushPoint(n);
		}

		// set color
		if(busData[k]){

			var arr1 = this.bus.split(".");
			var arr2 = busData[k].number.split(".")
			if (arr1[0] == arr2[0]){
				this.color = this.onColor;
				this.alpha = this.alphaMax;
				this.lineWidth = this.bigLineWidth;
			}
			else {
				this.color = this.offColor;
				this.alpha = this.alphaList[k];
				this.lineWidth = this.smallLineWidth;
			}
				
		}
		else{
			this.color = this.offColor;
			this.alpha = this.alphaList[k];
			this.lineWidth = this.smallLineWidth;
		}
			
		this.drawOneStroke(k);
	}

}

StrokeSpiro.prototype.drawOneStroke = function(num) {
	
	// STROKE
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.globalAlpha = this.alphaList[num]/255;
	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.beginPath();
		
		this.ctx.moveTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);
		this.ctx.lineWidth = Math.sin(i/this.xPoint.length*Math.PI)*this.lineWidth;
		this.ctx.stroke();
	}
}

