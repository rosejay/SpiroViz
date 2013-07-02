
// class Weather
var WeatherSpiro = function(index, r1, r2, d){

	SpiroGraph.call(this, index, r1, r2, d, r1*2 + 180);

	// parameters
	this.weatherCLR = {
		snow: [255,0,127],
		sleet: [255,0,127],
		rain: [255,0,127], //rain, thunderstorm, tornado, hail
		clearW: [0,170,255], //clear-day, clear-night
		wind: [0,170,255],
		fog: [26,94,128],
		cloudy: [26,94,128] //cloudy, partly-cloudy-day, partly-cloudy-night
	}
	this.weatherTxt = ["snow", "sleet", "rain", "clear", "wind", "fog", "cloudy"];
	this.isWeather = [];
	for(var i = 0; i<this.weatherTxt.length; i++){
		this.isWeather[i] = 0;
	}
	this.weatherColor = [];
	this.weatherAlpha = [];

	this.hour = date.hour;
	this.minute = date.minute;


	this.initData(0);
	this.hourNum = 24;
	this.hourNodeNum = parseInt(this.nodeNum / this.hourNum);

	this.setSpeed(1);
	this.setSteps(50);

	this.setData();
	//this.drawStrokeFromTo(0,1)
	//this.initTime();
	//this.drawAll();
	
}
WeatherSpiro.prototype = Object.create(SpiroGraph.prototype)
WeatherSpiro.prototype.constructor = WeatherSpiro;


WeatherSpiro.prototype.initTime = function(){

	this.processing.stroke(0,80);

	for(var i = 0; i<this.hourNum; i++){
		this.processing.pushMatrix();
		this.processing.rotate(Math.PI*2/this.hourNum * i);
		this.processing.line(0, 120, 0, 130);
		this.processing.popMatrix();
	}
}
WeatherSpiro.prototype.initLegend = function(){

	var num = this.weatherTxt.length;
	var div = 25;
	var startX = this.outerRadius + div*1.5;
	var startY = 0;

	// preset
	this.processing.noStroke();
	this.processing.textAlign(this.processing.LEFT, this.processing.CENTER);

	var count = 0;
	// loop
	for(var i = 0; i<num; i++){

		if(this.isWeather[i]){

			this.color = this.weatherCLR[this.weatherTxt[i]];
			// stroke color
			var x = startX;
			var y = startY + count*div;
			this.processing.fill(this.color[0], this.color[1], this.color[2]);
			this.processing.rect(x, y, 10, 10);

			this.processing.text(this.weatherTxt[i], x + 15, y + 5); 
			count ++;
		}
	}

	// end
	this.processing.noFill();

}
WeatherSpiro.prototype.setData = function(){

	var alphaDiv = 255/this.nodeNum;

	
	for(var i = 0; i<this.nodeNum * 2; i++){

		var tempIndex = (i+this.hour)%this.nodeNum;
		if(i == 0)
			this.weatherAlpha[i] = 255;
		else{
			if((tempIndex >=0 && tempIndex <8 ) || tempIndex > 18){
				alphaDiv = 255/2/this.nodeNum;
				if( (tempIndex - this.hour)>=0 ){
					this.weatherAlpha[i] = 255/2 - (tempIndex - this.hour)*alphaDiv;
				}
				else
					this.weatherAlpha[i] = 255/2 - (this.nodeNum - this.hour + tempIndex)*alphaDiv;
			}
			else{
				alphaDiv = 255/this.nodeNum;
				if( (tempIndex - this.hour)>=0 ){
					this.weatherAlpha[i] = 255 - (tempIndex - this.hour)*alphaDiv;
				}
				else
					this.weatherAlpha[i] = 255 - (this.nodeNum - this.hour + tempIndex)*alphaDiv;
			}
		}
			

		// set color according to weather icon
		var icon = weather.hourly[i].icon;
		
		switch(icon){
			case "snow":
				this.weatherColor[i] = this.weatherCLR.snow;
				this.isWeather[0] = 1;
				break;
			case "sleet":
				this.weatherColor[i] = this.weatherCLR.sleet;
				this.isWeather[1] = 1;
				break;
			case "rain":
			case "thunderstorm":
			case "tornado":
			case "hail":
				this.weatherColor[i] = this.weatherCLR.rain;
				this.isWeather[2] = 1;
				break;
			case "clear":
			case "clear-day":
			case "clear-night":
				this.weatherColor[i] = this.weatherCLR.clearW;
				this.isWeather[3] = 1;
				break;
			case "wind":
				this.weatherColor[i] = this.weatherCLR.wind;
				this.isWeather[4] = 1;
				break;
			case "fog":
				this.weatherColor[i] = this.weatherCLR.fog;
				this.isWeather[5] = 1;
				break;
			case "cloudy":
			case "partly-cloudy-day":
			case "partly-cloudy-night":
				this.weatherColor[i] = this.weatherCLR.cloudy;
				this.isWeather[6] = 1;
				break;
			default:
				this.weatherColor[i] = [0,0,0];
		}
		
	}
}	
WeatherSpiro.prototype.getAngle = function(){

	this.angle = ( -1/4 + this.hour / this.hourNum ) *2*Math.PI ;
}

WeatherSpiro.prototype.redraw = function(){

	this.processing.fill(255);
	this.processing.noStroke();
	this.processing.ellipse(0, 0, this.outerRadius*2, this.outerRadius*2);
	this.processing.noFill();
}
WeatherSpiro.prototype.drawStrokeFromTo = function(start, end){

	var self = this;
	// draw background
	this.drawAll();

	// draw current stroke
	var rate = this.speed * 1000 / this.steps;

	this.initData(0);
	this.angle = -(19 - this.hour)/this.hourNum*2*Math.PI ;

	this.theta = this.anglePerNode/2 + this.anglePerNode*self.index[start];
	this.alpha = 255;
	this.color = this.weatherColor[this.index[start]];

	var count = 0;
	this.interval = setInterval(function(){

		count ++;
		var j = Math.floor(count / 50);
		var i = Math.floor(count / 50 / self.distanceNum[0] + start);
		self.color = self.weatherColor[i];
		self.processing.pushMatrix();
		self.processing.rotate(self.angle);

		self.batchedLine(i,j);
		self.processing.popMatrix();

		if(count % 50 == 0){
			self.theta = self.index[i] * self.anglePerNode + self.anglePerNode/2;

			if(count == (end - start) * 50 * self.distanceNum[0]){
				clearInterval(self.interval);
				self.redraw();
			}
		}
		
	}, rate);
}

WeatherSpiro.prototype.drawSpecial = function(){

	var self = this;
	// draw background
	//this.drawAll();

	// draw current stroke
	var rate = this.speed * 1000 / this.steps;

	this.initData(0);
	this.getAngle(0);


	var count = 0;
	var total = this.steps * this.totalSpiroNum;
	this.currentDistance = 0;
	this.currentGear = 0;

	this.interval = setInterval(function(){

		count ++;
		var i = Math.floor(count / self.steps );
		
		self.processing.pushMatrix();
		self.processing.rotate(self.angle);
		if(self.currentGear)
			self.processing.strokeWeight(self.strokeWeight / 2)

		for(var j = 0; j<self.nodeNum; j++){

			var index = j + self.currentGear * self.nodeNum;

			self.theta = self.index[j] * self.anglePerNode - self.anglePerNode/2 + count%self.steps * self.angleDiv;
			self.alpha = self.weatherAlpha[j] / (self.distanceNum[self.currentGear] ) * (self.currentDistance+1);
			self.color = self.weatherColor[index];

			self.batchedLine();
		}
		self.processing.popMatrix();

		if(count % self.steps == 0){
			self.currentDistance ++;

			if(count == total){
				clearInterval(self.interval);
				//self.redraw();
				//self.drawSpecial();
				self.fadeOut();
			}

			if(self.currentDistance >= self.distanceNum[self.currentGear]){
				self.currentGear ++;
				self.initData(self.currentGear);
				self.getAngle(self.currentGear);
				self.currentDistance = 0;
			}
			
		}
		
	}, rate);

}

WeatherSpiro.prototype.fadeOut = function(){

	
	this.redraw();
	this.drawSpecial();
}



WeatherSpiro.prototype.drawAllFade = function(){

	var self = this;

	// draw current stroke



	var count = 0;
	this.interval = setInterval(function(){
		alert("d")
		count ++;
		self.drawAll(count, 10)
		if(count == 10){
			clearInterval(self.interval)
		}
	}, 1000);

}



WeatherSpiro.prototype.drawAll = function(item, total){

	var item = item? item : 0;
	var total = total? total : 1;

	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);
		this.getAngle(i);
		this.processing.pushMatrix();
		this.processing.strokeWeight(this.strokeWeight);
		this.processing.rotate(this.angle);

		for(var j = 0; j<this.distanceNum[i]; j++){

			for(var k = 0; k<this.nodeNum; k++){

				var index = k + i*this.nodeNum;
				this.alpha = this.weatherAlpha[index] / this.distanceNum[i] * (j+1) * (total - item) / total;
				this.theta = this.index[k] * this.anglePerNode - this.anglePerNode/2;
				this.color = this.weatherColor[index];

				for(var n = 0; n<this.steps; n++){
					this.batchedLine(i,j);
				}
			}
				
		}
		this.processing.popMatrix();
	}

}
