
// class Weather
var WeatherSpiro = function(index, r1, r2, d, z){

	SpiroGraph.call(this, index, r1, r2, d, z);

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

}
WeatherSpiro.prototype = Object.create(SpiroGraph.prototype)
WeatherSpiro.prototype.constructor = WeatherSpiro;
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



WeatherSpiro.prototype.drawSpecial = function(){

	var self = this;
	// draw current stroke
	var rate = this.speed * 1000 / this.steps;

	this.initData(0);
	this.getAngle(0);

	var count = 0;
	var total = this.steps * this.totalSpiroNum;
	console.log(this.steps, total)
	this.currentDistance = 0;
	this.currentGear = 0;

	this.interval = setInterval(function(){

		count ++;
		var i = Math.floor(count / self.steps );
		var j = count % self.steps;

		if(self.currentGear)
			self.ctx.lineWidth = self.lineWidth / 2;

		for(var k = 0; k<self.nodeNum; k++){

			self.theta = (self.index[k]- 1/2) * self.anglePerNode + j * self.angleDiv;
			self.alpha = self.weatherAlpha[k] / (self.distanceNum[self.currentGear] ) * (self.currentDistance+1);
			self.color = self.weatherColor[k + self.currentGear * self.nodeNum];
			self.batchedLineWeather();
		}

		if(count % self.steps == 0){
			self.currentDistance ++;

			if(count == total){
				clearInterval(self.interval);
				self.redraw();
				self.drawSpecial();
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




WeatherSpiro.prototype.drawAll = function(item, total){

	var item = item? item : 0;
	var total = total? total : 1;

	for(var i = 0; i<this.gearNum; i++){

		this.initData(i);
		this.getAngle(i);
		this.currentGear = i;
		for(var j = 0; j<this.distanceNum[i]; j++){
			this.currentDistance = j;
			for(var k = 0; k<this.nodeNum; k++){

				var index = k + i*this.nodeNum;
				this.alpha = this.weatherAlpha[index] / this.distanceNum[i] * (j+1) * (total - item) / total;
				this.color = this.weatherColor[index];
				for(var n = 0; n<this.steps; n++){

					this.theta = this.index[k] * this.anglePerNode - this.anglePerNode/2 + n*this.angleDiv;
					this.batchedLine(i,j);
					if(this.prev_x)
						this.stroke();
				}
			}
		}
	}
}
WeatherSpiro.prototype.stroke = function(){

	
}

WeatherSpiro.prototype.batchedLineWeather = function(i,j) {


	var i = i ? i : this.currentGear;
	var j = j ? j : this.currentDistance;

	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[i]);
	var val2 = this.outerRadius - this.innerRadius[i];

	this.prev_x = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.cos(val1);
	this.prev_y = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.sin(val1);

	this.theta += this.angleDiv;

	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[i]);
	var val2 = this.outerRadius - this.innerRadius[i];

	this.x1 = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.cos(val1);
	this.y1 = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.sin(val1);

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
}
