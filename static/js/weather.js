
// class Weather
var WeatherSpiro = function(index, r1, r2, d){

	SpiroGraph.call(this, index, r1, r2, d, r1*2 + 180);

	// parameters
	this.weatherCLR = {
		snow: [210,246,255],
		sleet: [52,199,223],
		rain: [23,150,234], //rain, thunderstorm, tornado, hail
		clearW: [255,115,51], //clear-day, clear-night
		wind: [255,240,171],
		fog: [170,170,170],
		cloudy: [255,229,95] //cloudy, partly-cloudy-day, partly-cloudy-night
	}
	this.weatherTxt = ["snow", "sleet", "rain", "clear", "wind", "fog", "cloudy"];
	this.isWeather = [];
	for(var i = 0; i<this.weatherTxt.length; i++){
		this.isWeather[i] = 0;
	}
	this.weatherColor = [];
	this.weatherAlpha = [];
	this.hourNum = 24;
	this.setSpeed(1);
	this.setSteps(50);

	this.initData(0);
	this.setData();

	this.initTime();
	//this.drawAll();
	
	this.drawStrokeFromTo(10,11);
	this.initLegend();
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

	
	for(var i = 0; i<this.nodeNum; i++){

		var tempI = this.index[i]
		this.weatherAlpha[i] = parseInt(this.nodeNum-i) *alphaDiv;

		if(i == 0){
			var index = 0;
		}
		else if(i%2 == 0){
			var index = parseInt(i/5);
		}
		else {
			var index = parseInt(i/5);
			
		}
		if(index > 23)
			index = 23;

		// set color according to weather icon
		var icon = weather.hourly[index].icon;
		
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

WeatherSpiro.prototype.redraw = function(){

	this.processing.fill(255);
	this.processing.noStroke();
	this.processing.ellipse(0, 0, this.outerRadius*2, this.outerRadius*2);
	this.processing.noFill();
	this.drawStrokeFromTo(10,11);
}
WeatherSpiro.prototype.drawStrokeFromTo = function(start, end){

	var self = this;
	// draw background
	this.drawAll();

	// draw current stroke
	var hour = date.hour;
	var minute = date.minute;
	var rate = this.speed * 1000 / this.steps;

	
	this.theta = this.anglePerNode/2 + this.anglePerNode*self.index[start];
	this.alpha = 255;
	this.color = this.weatherColor[this.index[start]];

	var count = 0;
	this.interval = setInterval(function(){

		count ++;
		var i = Math.floor(count / 50 + start);
		self.color = self.weatherColor[i];
		self.processing.pushMatrix();
		self.processing.rotate(self.angle);
		self.processing.strokeWeight(1);
		self.batchedLine();
		self.processing.popMatrix();

		if(count % 50 == 0){
			self.theta = self.index[i] * self.anglePerNode + self.anglePerNode/2;

			if(count == (end - start) * 50){
				clearInterval(self.interval);
				self.redraw();
			}
		}
		
	}, rate);
}



WeatherSpiro.prototype.drawAll = function(){

	var hour = date.hour;
	var minute = date.minute;

	this.angle = (hour%this.hourNum + minute / 60)/this.hourNum*2*Math.PI + this.anglePerNode/2;
	this.processing.pushMatrix();
	this.processing.strokeWeight(0.4);
	this.processing.rotate(this.angle);

	for(var i = 0;i<this.nodeNum; i++){

		this.alpha = this.weatherAlpha[i];
		this.color = this.weatherColor[i];
		this.theta = this.index[i] * this.anglePerNode + this.anglePerNode/2;
		for(var j = 0; j<this.steps; j++){
			this.batchedLine();
		}
	}
	this.processing.popMatrix();

}
