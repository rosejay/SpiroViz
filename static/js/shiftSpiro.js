

// class ShiftSpiro
var ShiftSpiro = function(r1, r2, d, z){

	SpiroGraph.call(this, r1, r2, d, z);

	// data
	this.initData(0);

	this.color = [0,0,0]
	this.initData(0);
	this.nodeColor = [];
	this.bgColor = [255,255,255];
	this.first = true;

	// rotate
	this.shift = 0;
	this.ctx.rotate(- Math.PI / 2);
	this.angle = 0;

	this.isStrokeFill = 1;

	var len = this.pointDistance[0].length;

	this.maxDistance = this.pointDistance[0][0];
	this.minDistance = this.pointDistance[0][len-1];
	this.diffDistance = this.maxDistance - this.minDistance;

	this.angleMax = this.pointDistance[0].length * this.shift *　this.perGear;
	this.gradientPoint = 0;
	this.type = 1;

}
ShiftSpiro.prototype = Object.create(SpiroGraph.prototype)
ShiftSpiro.prototype.constructor = ShiftSpiro;
ShiftSpiro.prototype.setNodeColor = function(num,item){
	this.nodeColor[num] = item;
}
ShiftSpiro.prototype.setType = function(item){
	this.type = item;
}
ShiftSpiro.prototype.setIsPM = function(item){
	this.isPM = item;
}
ShiftSpiro.prototype.setShift = function(item){
	this.shift = item;
	this.angleMax = this.pointDistance[0].length * this.shift *　this.perGear;
}
ShiftSpiro.prototype.setStroke = function(item){
	this.isStroke = item;
}
ShiftSpiro.prototype.setStrokeFill = function(item){
	this.isStrokeFill = item;
}
ShiftSpiro.prototype.setGradientPoint = function(item){
	this.gradientPoint = item;
}
ShiftSpiro.prototype.setData = function(item){

	this.data = [];

	if(this.isPM){
		var index = 12*60;
		var hourIndex = 12;
	}
	else{
		var index = 0;
		var hourIndex = 0;
	}
		

	this.hourData = [];
	for(var i = 0; i<12; i++)
		this.hourData[i] = 0;

	for(var i = 0; i<60*12; i++){
		this.data[i] = item[i+index];
		if(this.data[i].length)
			this.hourData[this.data[i][0].hour - hourIndex] += this.data[i].length;
	}



}
ShiftSpiro.prototype.setTenDayData = function(item){

	this.data = [];
	for(var i = 0; i<item.length; i++){
		for(var j = 0; j < item[i].length; j++){
			this.data[i*1440 + j] = item[i][j];
		}
	}
}


ShiftSpiro.prototype.setRate = function(item){
	this.rate = item;
}

ShiftSpiro.prototype.drawAll = function(alpha){

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
				this.drawOneStrokeNoFill();
			}
		}
	}
}

ShiftSpiro.prototype.drawMultipleStroke = function(num, times){

	for(var i = 0; i<times; i++){

		var distance = this.maxDistance - i*2;

		for(var n = 0; n<this.steps; n++){
			this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
			this.gradientAngle = 2*Math.PI / this.nodeNum * num;

			this.angle = parseInt((this.maxDistance - distance )/ this.diffDistance * this.distanceNum[0]) * this.shift * this.perGear ;
			this.batchedLineDistance(distance);
			this.pushPoint(n);
		}
		this.drawOneStroke(this.isStrokeFill);
	}
		
}
ShiftSpiro.prototype.drawDaysView = function(num, minute){

	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.gradientAngle = 2*Math.PI / this.nodeNum * num;

		if(this.diffDistance)
			var distance = minute / (60*24) * this.diffDistance + this.minDistance;
		else 
			var distance = this.minDistance;
		

		this.angle = parseInt((1-minute/60) * this.distanceNum[0]) * this.shift * this.perGear ;
		this.batchedLineDistance(distance);
		this.pushPoint(n);

	}
	this.drawOneStroke(this.isStrokeFill);
}

ShiftSpiro.prototype.drawGradientStroke = function(num, minute){

	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.gradientAngle = 2*Math.PI / this.nodeNum * num;
		//console.log(this.nodeNum , num)
		if(this.diffDistance)
			var distance = minute / 60 * this.diffDistance + this.minDistance;
		else 
			var distance = this.minDistance;
		

		this.angle = parseInt((1-minute/60) * this.distanceNum[0]) * this.shift * this.perGear ;
		this.batchedLineDistance(distance);
		this.pushPoint(n);

	}
	this.drawOneStroke(this.isStrokeFill);
}

ShiftSpiro.prototype.batchedLineDistance = function(distance) {


	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[0]);
	var val2 = this.outerRadius - this.innerRadius[0];

	this.x1 = Math.cos((this.theta + this.startAngle)) * val2 + distance * Math.cos(val1);
	this.y1 = Math.sin((this.theta + this.startAngle)) * val2 + distance * Math.sin(val1);

	if(!this.prev_x){
		this.prev_x = this.x1;
		this.prev_y = this.y1;
	}

}
ShiftSpiro.prototype.draw = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;

	var lastI = -1;
	var i = 0;
	self.$canvas.css("transform", "rotate(20deg)")
	console.log(self.rate)
	this.interval = setInterval(function(){

		if(i!=lastI){
			self.$canvas.css("transform", "rotate("+(-360/12*(i))+"deg)")
			lastI = i;
		}

		var length = self.data[count].length
		
		if(length){
			self.lineWidth = lineWidth * length;
			self.alpha = alpha * length;
			self.drawGradientStroke(self.data[count][0].hour%12, self.data[count][0].minute)
		}

		i = parseInt(count/60)
		

		count ++;
		if(count >= 12*60){
			clearInterval(self.interval);
			self.$canvas.css("transform", "rotate(-360deg)")
		}
			

	}, self.rate);
}



ShiftSpiro.prototype.drawTypeTwo = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;
	var totalNum = 12*60;
	this.interval = setInterval(function(){

		self.$canvas.css("transform", "rotate("+(-360/totalNum*count)+"deg)")

		console.log((-360/totalNum*count))
		var length = self.data[count].length
		if(length){
			self.lineWidth = lineWidth * length;
			self.alpha = 3 * length + 20;
			if(self.isPM)
				var index = parseInt((self.data[count][0].time - totalNum)/totalNum * self.nodeNum)
			else
				var index = parseInt(self.data[count][0].time/totalNum * self.nodeNum)
			self.drawGradientStroke(index, 0);
		}

		count ++;
		if(count >= totalNum){
			clearInterval(self.interval);
			self.$canvas.css("transform", "rotate(-360deg)")
		}

	}, self.rate);
}

ShiftSpiro.prototype.draw3 = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;

	var lastI = -1;
	var i = 0;
	self.$canvas.css("transform", "rotate(20deg)")
	var hourIndex = 0;
	this.interval = setInterval(function(){

		if(i!=lastI){
			self.$canvas.css("transform", "rotate("+(-360/12*(i))+"deg)")
			lastI = i;
			hourIndex = 0;
		}

		var length = self.data[count].length
		
		if(length){

			self.lineWidth = lineWidth * length;
			//self.alpha = alpha * length;
			for(var k = 0; k<length; k++)
				self.drawGradientStroke(self.data[count][0].hour%12, 60 - (k+hourIndex)/4)

			hourIndex += length;
		}

		i = parseInt(count/60)

		count ++;
		if(count >= 12*60){
			clearInterval(self.interval);
			self.$canvas.css("transform", "rotate(-360deg)")
		}
			

	}, self.rate);
}

ShiftSpiro.prototype.draw4 = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;

	var totalNum = 24*60*10;
	self.rate = 1;
	var i = 0;
	this.interval = setInterval(function(){

		i = parseInt(count/1440);
		self.$canvas.css("transform", "rotate("+(-360/totalNum*count)+"deg)")

		var length = self.data[count].length
		if(length){
			self.lineWidth = lineWidth * length;
			self.alpha = 3 * length + 10;
			var index = parseInt((self.data[count][0].time + i*1440 )/totalNum * self.nodeNum)
			self.drawGradientStroke(index, 0);

			var tempIndex = self.currentIndex - index;
			$("#textBox p").remove();
			$("#textBox #textTime").html(self.data[count][0].str);
			for(var j = 0; j<self.data[count].length; j++){
				var $p = $("<p>"+self.data[count][j].text+"</p>")
				$("#textBox").append($p);
			}
		}
		else{
			$("#textBox p").remove();
			var str = generateTimeStr(CHIDays[i][0], CHIDays[i][1], parseInt(count%1440/60), parseInt(count%1440%60) )
			$("#textBox #textTime").html(str);

		}
		count ++;

			

		if(count >= totalNum){
			clearInterval(self.interval);
			self.$canvas.css("transform", "rotate(-360deg)")
		}
	}, self.rate);
}


ShiftSpiro.prototype.drawOneStroke = function(isFill) {
			
	// FILL	
	if(this.isStrokeFill){

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rotate(this.angle);
		this.ctx.lineWidth = 0;
		
		// fill gradient

		var midIndex = parseInt(this.xPoint.length/2);
		var midD = parseInt( Math.sqrt( Math.pow(this.xPoint[midIndex],2) + Math.pow(this.yPoint[midIndex],2) ));

		if(this.type == 1){
			this.ctx.globalAlpha = this.alpha/255;
			var lingrad = this.ctx.createLinearGradient(
								0,0,
								Math.cos(this.gradientAngle)*midD,
								Math.sin(this.gradientAngle)*midD);
			lingrad.addColorStop(0, "rgba("+this.bgColor[0]+","+this.bgColor[1]+","+this.bgColor[2]+",0)");
		    lingrad.addColorStop(1, "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+(this.alpha/255)+")");
			/*
			this.ctx.globalAlpha = this.preAlpha/255;
			var lingrad = this.ctx.createLinearGradient(
								Math.cos(this.gradientAngle)*this.innerRadius[0],
								Math.sin(this.gradientAngle)*this.innerRadius[0],
								Math.cos(this.gradientAngle)*midD,
								Math.sin(this.gradientAngle)*midD);
			lingrad.addColorStop(0, "rgba("+this.bgColor[0]+","+this.bgColor[1]+","+this.bgColor[2]+",0)");
		    lingrad.addColorStop(1, "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+(this.preAlpha/255)+")");
		    */
		}
			

		else if(this.type == 2){
			this.ctx.globalAlpha = this.alpha/255;
			var lingrad = this.ctx.createLinearGradient(0,0,
								Math.cos(this.gradientAngle)*midD,
								Math.sin(this.gradientAngle)*midD);
			lingrad.addColorStop(0, "rgba("+this.bgColor[0]+","+this.bgColor[1]+","+this.bgColor[2]+",0)");
		    lingrad.addColorStop(1, "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+(this.alpha/255)+")");
		}
			

		    

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

	if(this.type == 1)
		this.ctx.globalAlpha = this.alpha/255;
	else if(this.type == 2)
		this.ctx.globalAlpha = this.alpha/255/2;

	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rotate(this.angle);
		this.ctx.moveTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);

		// if it has stroke style
		if(this.isStroke){
			this.ctx.lineWidth = (1-Math.abs(Math.sin((i/this.xPoint.length-1/2)*Math.PI)))*this.lineWidth;
			if(i>=0 && i<5)
				this.ctx.lineWidth = 0;
		}
		else
			this.ctx.lineWidth = this.lineWidth;
		//console.log(i,Math.sin(i/this.xPoint.length*Math.PI)*this.lineWidth)
		this.ctx.stroke();
		this.ctx.restore();
	}
}

ShiftSpiro.prototype.drawOneStrokeNoFill = function() {
	
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
		this.ctx.lineWidth = 0;
		//console.log(i,Math.sin(i/this.xPoint.length*Math.PI)*this.lineWidth)
		this.ctx.stroke();
		this.ctx.restore();
	}
}


ShiftSpiro.prototype.drawOneStrokeWithSolidColor = function(num, isFill) {

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
		this.ctx.globalAlpha = 1;

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


ShiftSpiro.prototype.drawStroke = function(num, distance, isFill){

	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.batchedLine(this.currentGear,distance);
		this.pushPoint(n);
	}
	this.drawOneStrokeWithSolidColor(num,isFill);

}
