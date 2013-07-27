

// class TwitterSpiro
var TwitterSpiro = function(r1, r2, d, z){

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
	this.myindex = 0;
}
TwitterSpiro.prototype = Object.create(SpiroGraph.prototype)
TwitterSpiro.prototype.constructor = TwitterSpiro;
TwitterSpiro.prototype.setNodeColor = function(num,item){
	this.nodeColor[num] = item;
}
TwitterSpiro.prototype.setType = function(item){
	this.type = item;
}
TwitterSpiro.prototype.setIndex = function(item){
	this.myindex = item;
}
TwitterSpiro.prototype.setIsPM = function(item){
	this.isPM = item;
}
TwitterSpiro.prototype.setShift = function(item){
	this.shift = item;
	this.angleMax = this.pointDistance[0].length * this.shift *　this.perGear;
}
TwitterSpiro.prototype.setStroke = function(item){
	this.isStroke = item;
}
TwitterSpiro.prototype.setStrokeFill = function(item){
	this.isStrokeFill = item;
}
TwitterSpiro.prototype.setGradientPoint = function(item){
	this.gradientPoint = item;
}
TwitterSpiro.prototype.setDay = function(item){
	this.day = item;
}
TwitterSpiro.prototype.setData = function(item){

	this.data = [];

	if(this.isPM)
		var index = 12*60;
	else
		var index = 0;

	for(var i = 0; i<60*12; i++){
		this.data[i] = item[i+index];
	}

}
TwitterSpiro.prototype.setTenDayData = function(item){

	this.data = [];
	var count = 0;
	var isCount = false;
	for(var i = 0; i<item.length; i++){

		this.data[count] = [];
		for(var j = 0; j < item[i].length/2; j++){
			this.data[count][j] = item[i][j];
		}

		count ++;
		this.data[count] = [];
		for(var j = item[i].length/2; j < item[i].length; j++){
			this.data[count][j - item[i].length/2] = item[i][j];
		}
		count ++;
		
	}
}

TwitterSpiro.prototype.setRate = function(item){
	this.rate = item;
}

TwitterSpiro.prototype.drawAll = function(alpha){

	this.alpha = this.preAlpha = alpha  ? alpha  : 50;

	for(var i = 0; i<this.gearNum; i++){
		this.initData(i);
		for(var j = 0; j<this.distanceNum[i]; j++){

			for(var k = 0; k<this.nodeNum; k++){
				
				/*
				this.color = [131,205,230]



				if(this.index[k] <= this.nodeNum/4 ){
					this.color = [223,97,204];
				}
				else if(this.index[k] > this.nodeNum/4 && this.index[k] < this.nodeNum/2){
					this.color = [131,205,230];
				}
				else{
					this.color = [145,230,131];
				}


/*
				// for weather image
				if(this.index[k]>12 && this.index[k] < 18 ){
					this.color = [223,97,204];
				}
				else {
					this.color = [131,205,230];
				}
				

				if(this.index[k]>=8){
					this.alpha = (24 - this.index[k] + 8) * 255/30 + 50;
				}
				else
					this.alpha = (-this.index[k] +7) * 255/30 + 50;
*/
				
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

TwitterSpiro.prototype.drawMultipleStroke = function(num, times){

	for(var i = 0; i<times; i++){

		var distance = this.maxDistance - i*2;

		for(var n = 0; n<this.steps; n++){
			this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
			this.gradientAngle = 2*Math.PI / this.nodeNum * num;

			this.angle = parseInt((this.maxDistance - distance )/ this.diffDistance * this.distanceNum[0]) * this.shift * this.perGear ;
			this.batchedLineDistance(distance);
			this.pushPoint(n);
		}
		this.drawOneStroke();
	}
		
}
TwitterSpiro.prototype.drawDaysView = function(num, minute){

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
	this.drawOneStroke();
}

TwitterSpiro.prototype.drawGradientStroke = function(num, minute){

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
	this.drawOneStroke();
}

TwitterSpiro.prototype.drawGradientStrokeDay = function(num, minute){

	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.gradientAngle = 2*Math.PI / this.nodeNum * num;
		//console.log(this.nodeNum , num)
		if(this.diffDistance)
			var distance = minute / 720 * this.diffDistance + this.minDistance;
		else 
			var distance = this.minDistance;
		
		this.angle = parseInt((1-minute/720) * this.distanceNum[0]) * this.shift * this.perGear ;
		this.batchedLineDistance(distance);
		this.pushPoint(n);

	}
	this.drawOneStroke();
}


TwitterSpiro.prototype.batchedLineDistance = function(distance) {


	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[0]);
	var val2 = this.outerRadius - this.innerRadius[0];

	this.x1 = Math.cos((this.theta + this.startAngle)) * val2 + distance * Math.cos(val1);
	this.y1 = Math.sin((this.theta + this.startAngle)) * val2 + distance * Math.sin(val1);

	if(!this.prev_x){
		this.prev_x = this.x1;
		this.prev_y = this.y1;
	}

}
TwitterSpiro.prototype.draw = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;

	var lastI = -1;
	var i = 0;
	self.$canvas.css("transform", "rotate(30deg)")

	if( typeof(self.day) != "undefined" ){

		$("#textBox").css("width", "400px").css("right", "100px")

		var top = self.myindex * 500 + 100;
		$("#textBox").css("top", top) ;

		if(top +500 > winheight)
			$("body").animate({scrollTop:top - 100}, '200', 'swing', function() { });
	}
	else{

		$("#textBox").css("width", "200px")
		var top = parseInt(self.myindex/4 + 1) * 200;
		$("#textBox").css("top", top) ;

		if(top +200 > winheight)
			$("body").animate({scrollTop:top - 350}, '200', 'swing', function() { });
	}

	this.interval = setInterval(function(){

		if(i!=lastI){
			self.$canvas.css("transform", "rotate("+(-360/12*(i))+"deg)")
			lastI = i;
		}

		var length = self.data[count].length
		
		if(length){
			self.lineWidth = lineWidth *length;
			self.alpha = alpha * length;
			self.drawGradientStroke(self.data[count][0].hour%12, self.data[count][0].minute)
			self.updateTweets(count);
		}
		else{

			if( typeof(self.day) != "undefined" ){
				self.updateText(self.day, count);
			}
			else{
				self.updateText(parseInt(self.myindex/2), count);
			}
		}

		i = parseInt(count/60);
		self.updateHour(i)
		
		count ++;
		if(count >= 12*60){
			clearInterval(self.interval);
			$(".demoCanvas p.date:eq("+self.myindex+") span").html("");
			self.$canvas.css("transform", "rotate(-360deg)")
		}
			

	}, self.rate);
}

TwitterSpiro.prototype.updateText = function(day, count) {



	$("#textBox p").remove();
	if(this.isPM)
		var str = generateTimeStr(CHIDays[day][0], CHIDays[day][1], parseInt(count/60)+12, parseInt(count%60) )
	else
		var str = generateTimeStr(CHIDays[day][0], CHIDays[day][1], parseInt(count/60), parseInt(count%60) )

	$("#textBox #textTime").html(str);

	for(var j = 0; j<this.data[count].length; j++){
		var $p = $("<p>"+this.data[count][j].text+"</p>")
		$("#textBox").append($p);
	}
}
TwitterSpiro.prototype.updateTweets = function(count) {

	$("#textBox p").remove();
	$("#textBox #textTime").html(this.data[count][0].str);
	for(var j = 0; j<this.data[count].length; j++){
		var $p = $("<p>"+this.data[count][j].text+"</p>")
		$("#textBox").append($p);
	}
}		
TwitterSpiro.prototype.updateHour = function(i) {

	if(this.isPM)
		$(".demoCanvas p.date:eq("+this.myindex+") span").html(i+12)
	else
		$(".demoCanvas p.date:eq("+this.myindex+") span").html(i)
}

TwitterSpiro.prototype.drawTypeTwo = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;
	var totalNum = 12*60;

	$("#textBox").css("width", "400px").css("right", "100px")
	var top = self.myindex * 500 + 150;
	$("#textBox").css("top", top) ;

	if(top +500 > winheight)
		$("body").animate({scrollTop:top - 100}, '200', 'swing', function() { });

	this.interval = setInterval(function(){

		self.$canvas.css("transform", "rotate("+(-360/totalNum*count)+"deg)")

		var length = self.data[count].length
		if(length){
			self.lineWidth = lineWidth * length;
			self.alpha = 3 * length + alpha;
			if(self.isPM)
				var index = parseInt((self.data[count][0].time - totalNum)/totalNum * self.nodeNum)
			else
				var index = parseInt(self.data[count][0].time/totalNum * self.nodeNum)
			self.drawGradientStroke(index, 0);
			self.updateTweets(count);
		}
		else{
			self.updateText(self.day, count);

		}

		i = parseInt(count/60);
		self.updateHour(i)
		
		
		count ++;
		if(count >= totalNum){
			clearInterval(self.interval);
			self.$canvas.css("transform", "rotate(-360deg)")
		}

	}, self.rate);
}	

TwitterSpiro.prototype.draw2 = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;

	var totalNum = 12*60;
	this.interval = setInterval(function(){

		self.$canvas.css("transform", "rotate("+(-360/totalNum*count)+"deg)")

		var length = self.data[count].length
		if(length){
			self.lineWidth = lineWidth * length;
			self.alpha = 10 * length + alpha;
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

TwitterSpiro.prototype.draw3 = function() {

	var self = this;
	var count = 0;
	var lineWidth = this.lineWidth;
	var alpha = this.alpha;

	var lastI = -1;
	var i = 0;
	var j = 0;
	this.rate = 20000 / 20 / 12 / 60/5;
	self.$canvas.css("transform", "rotate(-18deg)")

	this.interval = setInterval(function(){

		if(i!=lastI){
			self.$canvas.css("transform", "rotate("+(-360/20*(i))+"deg)")
			lastI = i;
		}
		var length = self.data[i][j].length
		if(length){
			self.lineWidth = lineWidth * length;
			self.alpha = alpha * length;
			var time = self.data[i][j][0].time
			if(i%2)
				time -= 720

			self.drawGradientStrokeDay(i, time)
		}

		i = parseInt(count/12/60);
		j = count%720
		count ++;
		if(count >= 24*60 * 10){
			clearInterval(self.interval);
			self.$canvas.css("transform", "rotate(-360deg)")
		}
			

	}, self.rate);
}



TwitterSpiro.prototype.drawOneStroke = function() {
			
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
			this.ctx.globalAlpha = this.preAlpha/255;
			var lingrad = this.ctx.createLinearGradient(
								Math.cos(this.gradientAngle)*this.innerRadius[0],
								Math.sin(this.gradientAngle)*this.innerRadius[0],
								Math.cos(this.gradientAngle)*midD,
								Math.sin(this.gradientAngle)*midD);
			lingrad.addColorStop(0, "rgba("+this.bgColor[0]+","+this.bgColor[1]+","+this.bgColor[2]+",0)");
		    lingrad.addColorStop(1, "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+(this.preAlpha/255)+")");
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

		

	for(var i = 0; i<this.xPoint.length-1; i++){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rotate(this.angle);
		this.ctx.moveTo(this.xPoint[i], this.yPoint[i]);
		this.ctx.lineTo(this.xPoint[i+1], this.yPoint[i+1]);

		// if it has stroke style
		if(this.isStroke){
			var temp =  (1-Math.abs(Math.sin((i/this.xPoint.length-1/2)*Math.PI)))
			this.ctx.lineWidth = temp*this.lineWidth

			if(this.type == 1)
				this.ctx.globalAlpha = this.alpha/255/2 * temp
			else if(this.type == 2)
				this.ctx.globalAlpha = this.alpha/255/4 * temp


		}	
		else{
			this.ctx.lineWidth = this.lineWidth;


			if(this.type == 1)
				this.ctx.globalAlpha = this.alpha/255/2 
			else if(this.type == 2)
				this.ctx.globalAlpha = this.alpha/255/4 

		}
			
		//console.log(i,Math.sin(i/this.xPoint.length*Math.PI)*this.lineWidth)
		this.ctx.stroke();
		this.ctx.restore();
	}
}

TwitterSpiro.prototype.drawOneStrokeNoFill = function() {
	
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
		if(this.isStroke){
			var temp =  (1-Math.abs(Math.sin((i/this.xPoint.length-1/2)*Math.PI)))
			this.ctx.lineWidth = temp*this.lineWidth;

			if(this.type == 1)
				this.ctx.globalAlpha = this.alpha/255/2 * temp
			else if(this.type == 2)
				this.ctx.globalAlpha = this.alpha/255/4 * temp

		}
		else{
			this.ctx.lineWidth = this.lineWidth;


			if(this.type == 1)
				this.ctx.globalAlpha = this.alpha/255/4
			else if(this.type == 2)
				this.ctx.globalAlpha = this.alpha/255/4 


		}
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


TwitterSpiro.prototype.drawStroke = function(num, distance, isFill){

	for(var n = 0; n<this.steps; n++){
		this.theta = this.index[num] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
		this.batchedLine(this.currentGear,distance);
		this.pushPoint(n);
	}
	this.drawOneStrokeWithSolidColor(num,isFill);

}
