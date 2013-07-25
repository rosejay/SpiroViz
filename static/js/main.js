
// class myDate
var myDate = function( year, month, day, hour, minute, second ){

	this.year = year;
	this.month = month;
	this.day = day;
	this.hour = hour;
	this.minute = minute;
	this.second = second;
	this.str = year + "-" + month + "-" + day + "-" + hour + "-" + minute + "-" + second;
}
myDate.prototype.init = function(){

	var d = new Date();

	this.year = d.getFullYear();
	this.month = d.getMonth() + 1;
	this.day = d.getDate();
	this.hour = d.getHours();
	this.minute = d.getMinutes();
	this.second = d.getSeconds();
	this.str = this.year + "-" + this.month + "-" + this.day + "-" + this.hour + "-" + this.minute + "-" + this.second;
}



// class Weather
var Weather = function( ){

	this.hourly = [];
	this.daily = [];
	this.data = [];

	this.lat = 48.7;
	this.lng = 2.13;
}

Weather.prototype.get = function(){

	var self = this;
	$.get("http://localhost:8888/get/weather", { lat: this.lat,lng: this.lng }, function(res){
		
		if(res.data){
			self.data = res.data.currently;
			self.hourly = res.data.hourly.data;
			self.daily = res.data.daily.data;
			//console.log(self.data)
			self.convertData();
			drawProcessing();

			


		}
		
	});
}
Weather.prototype.convertData = function(){

	// currently
	this.data.temperature = this.getCelsius(this.data.temperature);
	this.data.time = this.getMyDate(this.data.time);
	this.data.str = this.data.time.str + " " + this.data.temperature + " " + this.data.summary;
	console.log(this.data.str);

	// daily
	for(var i = 0; i<this.daily.length; i++){
		this.daily[i].temperatureMax = this.getCelsius(this.daily[i].temperatureMax);
		this.daily[i].temperatureMin = this.getCelsius(this.daily[i].temperatureMin);
		this.daily[i].time = this.getMyDate(this.daily[i].time);
		this.daily[i].str = this.daily[i].time.str + " max: " + this.daily[i].temperatureMax + " min: " + this.daily[i].temperatureMin + " " + this.daily[i].summary;
		console.log(this.daily[i].str);
	}

	//hourly
	for(i = 0; i<this.hourly.length; i++){
		this.hourly[i].temperature = this.getCelsius(this.hourly[i].temperature);
		this.hourly[i].time = this.getMyDate(this.hourly[i].time);
		this.hourly[i].str = this.hourly[i].time.str + " " + this.hourly[i].temperature + " " + this.hourly[i].summary;
		console.log(this.hourly[i].icon);
	}
}
Weather.prototype.getCelsius = function(f){
	return Math.round((f-32) * 5 / 9);
}
Weather.prototype.getMyDate = function(d){
	
	var date = new Date(d * 1000);
	var obj = new myDate( date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() )
	return obj;
}


/*
window.setInterval(function(){

	date.init();
	weather.get();

},10000);
*/


var date = new myDate();
date.init();

var weather = new Weather();
weather.get();
console.log("ddhkj")



/*
var url = "https://spreadsheets.google.com/feeds/list/0AsJhxk_CJVFIdFU1ZXlKcmhwd2JVRW5McU5BdWRsR1E/od6/public/values?alt=json";
$.getJSON(url, function(data) {
	var items = [];
		console.log(data)
	$.each(data, function(key, val) {
	items.push('<li id="' + key + '">' + val + '</li>');
	});

	$('<ul/>', {
		'class': 'my-new-list',
		html: items.join('')
	}).appendTo('body');
});
*/
  


