
var BusSchedule = function(hour, minute, number, station){
	this.hour = parseInt(hour);
	this.minute = parseInt(minute);
	this.number = number;
	this.station = station;
	this.time = getTimeByHourMinute(this.hour, this.minute);
	this.diff = 0;
}

var BusData = function(){
	this.data = []
}







var schedule = [];
var busData = new BusData();
var url = "https://spreadsheets.google.com/feeds/list/0AsJhxk_CJVFIdFU1ZXlKcmhwd2JVRW5McU5BdWRsR1E/od6/public/values?alt=json";
$.getJSON(url, function(data) {


	var items = [];
	$.each(data.feed.entry, function(key, val) {
		var arr = val.gsx$time.$t.split(":");
		schedule[key] = new BusSchedule(arr[0], arr[1], val.gsx$bus.$t, val.gsx$station.$t); 
	});
	schedule.sort(function(a, b){return a.time-b.time});
});


function getTimeByHourMinute(hour, minute){
	return (hour * 60 + minute);
}







