
var winwidth = window.innerWidth,	// windows width
	winheight = window.innerHeight;	// windows height


// init CHI data
var CHIData = [];
var CHITimeData = [];
var CHIDays = [[3,26],[3,27],[3,28],[3,29],[3,30],[4,1],[4,2],[4,3],[4,4],[4,5]];
var CHIDaysNum = CHIDays.length;
for(var i = 0; i<CHIDaysNum; i++){
	CHITimeData[i] = [];
	CHIData[i] = [];
	for(var j = 0; j<24*60; j++)
		CHITimeData[i][j] = [];
}



var MyCHIData = function( id, name, text, month, day, hour, minute, second){

	this.userid = id;
	this.username = name;
	this.text = text;
	this.month = month;
	this.day = day;
	this.hour = hour;
	this.minute = minute;
	this.time = this.hour * 60 + this.minute;  
	this.str = "";



	if(this.month == 3)
		this.str += "April"
	else if(this.month == 4)
		this.str += "May"

	var h = this.hour;
	if(h<10)
		h = "0" + h.toString();

	var m = this.minute;
	if(m<10)
		m = "0" + m.toString();

	this.str += " " + this.day + " " + h + ":" + m; 




}
var MyDrawData = function( x,y,color, radius, index, data){

	this.x = x;
	this.y = y;
	this.color = color;
	this.radius = radius;
	this.index = index;
	this.data = data;
}
MyDrawData.prototype.setXY = function(x, y){
	this.x = x;
	this.y = y;
}


// get CHI data
$.getJSON('js/chi2013.json', function(data) {

	var items = [];
	var hasId = [];
	var idCount = 0;
	var myTime = []
	var totalNum = data.length;
	$.each(data, function(key, val) {

		if(key == totalNum - 1){
			//drawProcessing();
			//drawDaysView();
			drawDemo3();
		}

		if( ! hasId[val.from_user_id_str]){
			hasId[val.from_user_id_str] = 1
			idCount++;
		}
		else{
			hasId[val.from_user_id_str] ++;
		}

		var d = new Date(val.created_at);
		var myMonth = d.getMonth();
		var myDate = d.getDate();

		for(var i = 0; i<CHIDaysNum; i++){
			if(myMonth == CHIDays[i][0] && myDate == CHIDays[i][1]){

				var len = CHIData[i].length;
				CHIData[i][len] = new MyCHIData(val.from_user_id, val.from_user_name, val.text, 
												myMonth, myDate, d.getHours(), d.getMinutes());

				CHITimeData[i][parseInt(CHIData[i][len].time)].push(CHIData[i][len]);
				break;
			}

		}
	})

	

});

/*
	var weather = new TwitterSpiro(96,[52],[[45,42,39,36,33]],2);
	weather.setPosition(200,700);
	weather.setAlpha(200);
	weather.setSteps(100);
	weather.drawAll();
*/	


/*
	//general start
	var spiro3 = new SpiroGraph(105,[30],[[0]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(250,250)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(105,[30],[[10]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(500,250)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[30],[[20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(750,250)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(105,[30],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(1000,250)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[30],[[50]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(1250,250)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[0],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(250,1100)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[30],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(500,1100)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(105,[40],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(750,1100)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[51],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(1000,1100)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(105,[61],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(250,2400)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[70],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(500,2400)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[105],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(750,2400)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[120],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(1000,2400)
	spiro3.drawAll();



	var spiro3 = new SpiroGraph(105,[10],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(2000,1100)
	spiro3.drawAll();




	var spiro3 = new SpiroGraph(105,[30],[[20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(250,700)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[30],[[-20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(470,700)
	spiro3.drawAll();

	var spiro2 = new SpiroGraph(105,[-30],[[20]],1);
	spiro2.setLineWidth(3);
	spiro2.setPosition(750,700)
	spiro2.drawAll();

	var spiro2 = new SpiroGraph(-105,[30],[[20]],1);
	spiro2.setLineWidth(3);
	spiro2.setPosition(1000,700)
	spiro2.drawAll();




	var spiro3 = new SpiroGraph(75,[30],[[20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(250,1500)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(85,[30],[[20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(500,1500)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[60],[[40]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(750,1500)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(110,[30],[[20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(1000,1500)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(120,[30],[[20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(1250,1500)
	spiro3.drawAll();




	var spiro3 = new SpiroGraph(96,[56],[[20]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(250,2000)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(96,[60],[[30]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(450,2000)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[100],[[40]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(650,2000)
	spiro3.drawAll();

	var spiro3 = new SpiroGraph(105,[12],[[7]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(850,2000)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[75],[[50]],1);
	spiro3.setLineWidth(3);
	spiro3.setPosition(1050,2000)
	spiro3.drawAll();

*/
/*
	var weather = new TwitterSpiro(96,[63],[[50,45,40,35]],2);
	weather.setPosition(200,700);
	weather.setAlpha(250);
	weather.setStroke(1);
	weather.setSteps(100);
	weather.drawAll();

	var weather = new TwitterSpiro(96,[63],[[50,45,40,35]],2);
	weather.setPosition(600,700);
	weather.setAlpha(250);
	weather.setSteps(100);
	weather.drawAll();

	var spiro2 = new SpiroGraph(105,[30,45,60],[[27,24,21],[27,24,21],[27,24,21]],2);
	spiro2.setLineWidth(2);
	spiro2.setAlpha(250);
	spiro2.setPosition(1400,250)
	spiro2.drawAll();


	var spiro2 = new SpiroGraph(105,[150],[[136]],1);
	spiro2.setLineWidth(1);
	spiro2.setAlpha(150);
	spiro2.setPosition(250,700)
	spiro2.drawAll(50);


	var spiro2 = new SpiroGraph(105,[195],[[120]],1);
	spiro2.setLineWidth(1);
	spiro2.setAlpha(200);
	spiro2.setPosition(230,670)
	spiro2.drawAll(50);
	

	var spiro2 = new SpiroGraph(105,[150],[[136]],1);
	spiro2.setLineWidth(1);
	spiro2.setAlpha(150);
	spiro2.setPosition(210,640)
	spiro2.drawAll(50);



	var spiro3 = new TwitterSpiro(105,[52],[[40]],2);
	spiro3.setLineWidth(2);
	spiro3.setAlpha(100);
	spiro3.setPosition(1000,250);
	spiro3.drawAll();


	var spiro3 = new TwitterSpiro(105,[52],[[40]],2);
	spiro3.setLineWidth(3);
	spiro3.setAlpha(100);
	spiro3.setStroke(1)
	spiro3.setPosition(600,250);
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(96,[84],[[66,63,60,57,54,51,48,45,42]],2);
	spiro3.setLineWidth(2);
	spiro3.setAlpha(250);
	spiro3.setShift(3);
	spiro3.setPosition(200,250)
	spiro3.drawAll();


	var spiro2 = new SpiroGraph(105,[30],[[27,24,21]],2);
	spiro2.setLineWidth(1);
	spiro2.setAlpha(250);
	spiro2.setPosition(1400,1400)
	spiro2.drawAll();

	var spiro2 = new SpiroGraph(105,[45],[[27,24,21]],2);
	spiro2.setLineWidth(1);
	spiro2.setAlpha(250);
	spiro2.setPosition(1410,1410)
	spiro2.drawAll();

	var spiro2 = new SpiroGraph(105,[60],[[27,24,21]],2);
	spiro2.setLineWidth(1);
	spiro2.setAlpha(250);
	spiro2.setPosition(1420,1420)
	spiro2.drawAll();

*/


	/*

	// patterns start
	var spiro2 = new SpiroGraph(105,[75],[[85]],1);
	spiro2.setLineWidth(2);
	spiro2.setPosition(150,250)
	spiro2.drawAll();


	var spiro3 = new SpiroGraph(105,[75],[[50]],1);
	spiro3.setLineWidth(2);
	spiro3.setPosition(400,250)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[75],[[30]],1);
	spiro3.setLineWidth(2);
	spiro3.setPosition(650,250)
	spiro3.drawAll();

	


	var spiro3 = new SpiroGraph(48,[29],[[100]],1);
	spiro3.setLineWidth(2);
	spiro3.setPosition(950,250)
	spiro3.drawAll();


	


	var spiro3 = new SpiroGraph(105,[100],[[66]],1);
	spiro3.setLineWidth(2);
	spiro3.setPosition(150,600)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(105,[52],[[66]],1);
	spiro3.setLineWidth(2);
	spiro3.setPosition(400,600)
	spiro3.drawAll();


	var spiro3 = new SpiroGraph(96,[30],[[15]],1);
	spiro3.setLineWidth(2);
	spiro3.setPosition(650,600)
	spiro3.drawAll();



	var spiro3 = new SpiroGraph(105,[-30],[[-30]],1);
	spiro3.setLineWidth(2);
	spiro3.setPosition(950,600)
	spiro3.drawAll();




/*
	
	// add canvas
	var $canvas = $("<canvas></canvas>");
	//this.$box = $("<div></div>");
	//this.$box.append(this.$canvas);
	$("body").append($canvas);

	var width = height = 300;
	lineWidth = 4;
	var points = [[150,150],[100,150],[50,150],[50,100],[50,50], [50,0]]


	$canvas.attr("width", this.width).attr("height", this.height);
	var ctx = $canvas[0].getContext("2d");
	this.ctx.lineWidth = 4;
	this.ctx.strokeStyle = "rgb(0,0,0)"
	
	ctx.translate(150,150);

	var i = 0;
	var dis = 10;
	var angle = 0;
	var data=points
	var interval = setInterval(function(){

		
		var x = data[i][0];
		var y = data[i][1];
	
		for(var j = 0; j<points.length; j++){
			data[j] = [data[j][0] - x, data[j][1] - y];
		}

		ctx.arc(0,0,20,0,Math.PI*2)
		console.log(data[0])
		ctx.clearRect (-150,-150,300,300); 
		for(var j = 0; j<i ; j++){
			ctx.beginPath();
			ctx.arc(data[i][0], data[i][1],20,0,Math.PI*2)
			if(j == 0)
				ctx.strokeStyle = "rgb(255,0,0)"
			else
				ctx.strokeStyle = "rgb(0,0,0)"
			ctx.moveTo(data[j][0], data[j][1])
			ctx.lineTo(data[j+1][0], data[j+1][1])
			ctx.stroke();
		}
		
		i++;
		if(i>=points.length){
			i = 0;
			angle = 0;
		}
		
			
	},1000);

	*/
/*
	// add canvas
	var $canvas = $("<canvas></canvas>");
	//this.$box = $("<div></div>");
	//this.$box.append(this.$canvas);
	$("body").append($canvas);

	var width = height = 300;
	lineWidth = 4;
	var points = [[150,150],[100,150],[50,150],[50,100],[50,50], [50,0]]


	$canvas.attr("width", this.width).attr("height", this.height);
	var ctx = $canvas[0].getContext("2d");
	this.ctx.lineWidth = 4;
	this.ctx.strokeStyle = "rgb(0,0,0)"
	
	ctx.translate(150,150);


	for(var i = 0; i<points.length-1; i++){

			ctx.beginPath();
			ctx.strokeStyle = "rgb(0,0,0)"
			ctx.moveTo(points[i][0], points[i][1])
			ctx.lineTo(points[i+1][0], points[i+1][1])
			ctx.stroke();
	}


	var i = 0;
	var dis = 10;
	var angle = 0;
	var data=points
	var interval = setInterval(function(){
		i=10
		ctx.translate(i,i)
		var r = parseInt(Math.random()*255)
		var g = parseInt(Math.random()*255)
		var b = parseInt(Math.random()*255)

		ctxstrokeStyle = "rgb("+r+","+g+","+b+")"
			
	},100);
		

*/

function drawDaysView(){

/*
	var temp = new TwitterSpiro(180,[105],[[95,18]],1)
	temp.$canvas.css("zoom", 1);
	temp.setLineWidth(0.2);
	temp.setStroke(1)
	temp.drawAll();
	temp.setGradientPoint(0.6);
	temp.setAlpha(10);

	var i = 0;
	var count = 0;

	var inter = setInterval(function(){


		if(CHIData[i][count]){
			var arr = CHIData[i][count].split(":");
			arr[0] = parseInt(arr[0])
			arr[1] = parseInt(arr[1])
			var minute = arr[0] * 60 + arr[1];
			temp.drawDaysView(i,minute);
		}

		count++;
		// end
		if(count == CHIData[i].length){
			count = 0;
			i++;
			if(i == 10)
				clearInterval(inter);
		}

	},10)
*/
/*

	var temp = new ContinueSpiro(105,[52],[[40]],3)
	temp.setData(CHIData);
	temp.setPosition(200,200);
	temp.setLineWidth(1);
	temp.setRadius(3);
	temp.setAlpha(40);
	temp.draw();

	var temp2 = new ContinueSpiro(210,[85],[[130]],1)
	temp2.setData(CHIData);
	temp2.setPosition(1200,500);
	temp2.setLineWidth(1);
	temp2.setRadius(4);
	temp2.setAlpha(40);
	temp2.draw();

	var temp = new ContinueSpiro(105,[52],[[40]],1)
	temp.setData(CHIData);
	temp.setPosition(300,1200);
	temp.setLineWidth(1);
	temp.setRadius(2);
	temp.setAlpha(30);
	temp.draw2();

	*/

	//var temp2 = new ContinueSpiro(105,[52],[[40]],3)
	var temp2 = new ContinueSpiro(210,[85],[[130]],1)
	
	temp2.setColor(3);
	temp2.setData([CHITimeData[3]]);
	temp2.setSpeed(1);
	temp2.setPosition(400,360);
	temp2.setLineWidth(2);
	temp2.setRadius(2);
	temp2.setAlpha(50);
	temp2.draw2();
}

var temp;
var globalInter;
function drawDemo1(){

	// ten spirographs begin


	var $h3 = $("<h3>#CHI2013</h3>")
	$(".demoCanvas").append($h3);

	var xDiff = 200;
	
	var i = 0;
	var j = 0;
	var count = 0;
	var temp;

	var timeForOneGraph = 12;
	var rate = timeForOneGraph * 1000;

	// first graph
	temp = new TwitterSpiro(96,[40],[[30,27,24,21,18,15,12,9,6,3,0,-3]],1)
	temp.$canvas.css("zoom", 1);
	temp.setLineWidth(0.6);
	temp.setType(1);
	temp.setRate(timeForOneGraph/temp.nodeNum/60*1000);
	temp.setIsPM(j);
	var i = 0;
	temp.setData(CHITimeData[i]);
	var x = 200 * ( (i%2)*2+ j + 1 ) ;
	var y = 200 * parseInt(i/2 + 1) + 50;
	temp.setPosition(x, y);
	temp.drawAll(10);
	temp.setAlpha(15);
	temp.setStroke(1);
	temp.setIndex(0);
	temp.draw();


	var monthText = "";
	if(CHIDays[i][0] == 3)
		monthText = "April"
	else if(CHIDays[i][0] == 4)
		monthText = "May"

	var dateText = CHIDays[i][1]
	if(j)
		var amPmText = "pm"
	else
		var amPmText = "am"

	var $p = $("<p class='date'>" +monthText+" "+dateText+ ", <span></span> "+amPmText+"</p>")
	$p.css("left", x - 100).css("top", y-10)
	$(".demoCanvas").append($p)


	j++;
	globalInter = setInterval(function(){

		temp = new TwitterSpiro(96,[40],[[30,27,24,21,18,15,12,9,6,3,0,-3]],1)
		temp.$canvas.css("zoom", 1);
		temp.setLineWidth(0.6);
		temp.setType(1);
		temp.setRate(timeForOneGraph/temp.nodeNum/60*1000);
		temp.setIsPM(j);
		temp.setData(CHITimeData[i]);
		var x = 200 * ( (i%2)*2+ j + 1 ) ;
		var y = 200 * parseInt(i/2 + 1) + 50;
		temp.setPosition(x, y);
		temp.drawAll(10);
		temp.setAlpha(15);
		temp.setStroke(1);
		temp.setIndex(i*2+j);
		temp.draw();


		var monthText = "";
		if(CHIDays[i][0] == 3)
			monthText = "April"
		else if(CHIDays[i][0] == 4)
			monthText = "May"

		var dateText = CHIDays[i][1]
		if(j)
			var amPmText = "pm"
		else
			var amPmText = "am"

		var $p = $("<p class='date'>" +monthText+" "+dateText+ ", <span></span> "+amPmText+"</p>")
		$p.css("left", x - 100).css("top", y-10)
		$(".demoCanvas").append($p)


		
		// i,j
		j++;
		if(j == 2){
			j = 0;
			//clearInterval(inter);
			i++;
			if(i == 10)
				clearInterval(globalInter);
		}
	},rate);

}

function drawDemo2(){

	// template middle
	// on one spirograph

	addTextBox();
	var timeForOneGraph = 12;
	var rate = timeForOneGraph * 1000;

	// first graph
	//temp = new TwitterSpiro(100,[35],[[30,27,24,21,18,15,12,9,6,3,0]],5)
	//temp = new ShiftSpiro(120,[70],[[55,50,45,40,35,30,25,20]],2)
	
	temp = new ShiftSpiro(499,[338],[[170]])

	temp.$canvas.css("zoom", 1).addClass("fast");
	temp.setStrokeFill(0)

	temp.setLineWidth(0.4);
	temp.setTenDayData(CHITimeData);
	temp.setPosition(350,350);
	temp.drawAll(10);
	temp.setAlpha(13);
	temp.draw4();

}

function drawDemo3(){

	/* for one single day
	
	var temp = new ContinueSpiro(210,[85],[[130]],1)
	temp.setColor(3);
	temp.setData([CHITimeData[3]]);
	temp.setSpeed(1);

	*/
	addTextBox();

	temp = new ContinueSpiro(210,[85],[[130]],1)
	temp.setData(CHITimeData);
	temp.setSpeed(10);
	temp.setPosition(350,360);
	temp.setLineWidth(2);
	temp.setRadius(2);
	temp.setAlpha(50);
	temp.draw2();
}

function drawDemo4(){

	/* for one single day
	
	var temp = new ContinueSpiro(210,[85],[[130]],1)
	temp.setColor(3);
	temp.setData([CHITimeData[3]]);
	temp.setSpeed(1);

	*/
	addTextBox();

	temp = new ContinueSpiro(105,[52],[[40]],3)
	temp.setData(CHITimeData);
	temp.setSpeed(10);
	temp.setPosition(350,400);
	temp.setLineWidth(2);
	temp.setRadius(2);
	temp.setAlpha(50);
	temp.draw2();
}




function addTextBox(){

	var $html = $("<div id='textBox'><h2>#CHI2013</h2><h5 id='textTime'></h5></div>")
	$(".demoCanvas").append($html);

}
function restart(){

	$(".demoCanvas").html("");
	temp.stopDrawing();
	clearInterval(globalInter);
}

$(".section.demo ul li").click(function(){
	
	$(".section.demo ul li").removeClass("sel");
	$(this).addClass("sel");

	var i = parseInt($(this).attr("index"));
	restart();
	switch(i){
		case 1:
		drawDemo1();
		break;
		case 2:
		drawDemo2();
		break;
		case 3:
		drawDemo3();
		break;
		case 4:
		drawDemo4();
		break;
	}

})

function drawProcessing(){


/*
	// template middle
	// on one spirograph

	var timeForOneGraph = 12;
	var rate = timeForOneGraph * 1000;

	// first graph
	//temp = new TwitterSpiro(100,[35],[[30,27,24,21,18,15,12,9,6,3,0]],5)
	//temp = new ShiftSpiro(120,[70],[[55,50,45,40,35,30,25,20]],2)
	
	temp = new ShiftSpiro(499,[338],[[170]])

	temp.$canvas.css("zoom", 1);
	temp.setStrokeFill(0)

	temp.setLineWidth(0.4);
	temp.setTenDayData(CHITimeData);
	temp.setPosition(500,400);
	temp.drawAll(10);
	temp.setAlpha(13);
	temp.draw4();
*/



	

		

	/*
	
	// type 3 begin

	var timeForOneGraph = 12;
	var rate = timeForOneGraph * 1000;

	temp = new ShiftSpiro(120,[70],[[55,50,45,40,35,30,25,20]],2)
	temp.$canvas.css("zoom", 1);
	temp.setLineWidth(0.6);
	temp.setType(1);
	temp.setStrokeFill(0)
	temp.setShift(1);
	temp.setRate(timeForOneGraph/temp.nodeNum/60*1000);
	temp.setIsPM(0);
	temp.setData(CHITimeData[3]);
	temp.setPosition(250,230);
	temp.drawAll(10);
	temp.setAlpha(20);
	temp.setStroke(1);
	//temp.draw();

	var monthText = "";
	if(CHIDays[3][0] == 3)
		monthText = "April"
	else if(CHIDays[3][0] == 4)
		monthText = "May"

	var dateText = CHIDays[3][1]
	if(temp.isPM)
		var amPmText = "PM"
	else
		var amPmText = "AM"

	var $p = $("<p class='date'>" +monthText+" "+dateText+ " "+amPmText+"</p>")
	$p.css("left", 150).css("top", 450)
	$("body").append($p)


	var timeForOneGraph = 12;
	var rate = timeForOneGraph * 1000;

	temp2 = new ShiftSpiro(120,[70],[[55,50,45,40,35,30,25,20]],2)
	temp2.$canvas.css("zoom", 1);
	temp2.setLineWidth(0.6);
	temp2.setType(1);
	temp2.setStrokeFill(0)
	temp2.setShift(1);
	temp2.setRate(timeForOneGraph/temp2.nodeNum/60*1000);
	temp2.setIsPM(1);
	temp2.setData(CHITimeData[3]);
	temp2.setPosition(750,230);
	temp2.drawAll(10);
	temp2.setAlpha(20);
	temp2.setStroke(1);
	//temp2.draw();

	var monthText = "";
	if(CHIDays[3][0] == 3)
		monthText = "April"
	else if(CHIDays[3][0] == 4)
		monthText = "May"

	var dateText = CHIDays[3][1]
	if(temp.isPM)
		var amPmText = "PM"
	else
		var amPmText = "AM"

	var $p = $("<p class='date'>" +monthText+" "+dateText+ " "+amPmText+"</p>")
	$p.css("left", 650).css("top", 450)
	$("body").append($p)


	temp.draw();
	var c = 0
	var inter = setInterval(function(){
		temp2.draw();
		c++
		if(c)
			clearInterval(inter)
	},12000);

	// type 3 end

/*
	// type 2 begin
	temp = new ShiftSpiro(199,[118],[[85]])
	temp.$canvas.css("zoom", 1);
	temp.setLineWidth(0.6);
	temp.setType(2);
	temp.setRate(10);
	temp.setIsPM(0);
	temp.setData(CHITimeData[3]);
	
	temp.setPosition(200,200);
	temp.drawAll(10);
	temp.setAlpha(40);
	temp.setStroke(1);

	var monthText = "";
	if(CHIDays[3][0] == 3)
		monthText = "April"
	else if(CHIDays[3][0] == 4)
		monthText = "May"

	var dateText = CHIDays[3][1]
	if(temp.isPM)
		var amPmText = "PM"
	else
		var amPmText = "AM"

	var $p = $("<p class='date'>" +monthText+" "+dateText+ " "+amPmText+"</p>")
	$p.css("left", 100).css("top", 380)
	$("body").append($p)
	
	temp2 = new ShiftSpiro(199,[118],[[85]])
	temp2.$canvas.css("zoom", 1);
	temp2.setLineWidth(0.6);
	temp2.setType(2);
	temp2.setRate(10);
	temp2.setIsPM(1);
	temp2.setData(CHITimeData[3]);
	
	temp2.setPosition(600,200);
	temp2.drawAll(10);
	temp2.setAlpha(40);
	temp2.setStroke(1);

	var monthText = "";
	if(CHIDays[3][0] == 3)
		monthText = "April"
	else if(CHIDays[3][0] == 4)
		monthText = "May"

	var dateText = CHIDays[3][1]
	if(temp.isPM)
		var amPmText = "PM"
	else
		var amPmText = "AM"

	var $p = $("<p class='date'>" +monthText+" "+dateText+ " "+amPmText+"</p>")
	$p.css("left", 500).css("top", 380)
	$("body").append($p)

	temp.draw2();

	var c = 0
	var inter = setInterval(function(){

		temp2.draw2();
		c++
		if(c)
			clearInterval(inter)
	},7200);
	
	// type 2 end



/*
	var temp3 = new TwitterSpiro(240,[170],[[100,95,90,85,80,75,70,65,60,55,50,45,40,35,30]],1)
	//var temp3 = new TwitterSpiro(96,[84],[[77,75,73,71,69,67,65,63,61,59,57,55,53,51]],2)
	temp3.setLineWidth(0.6);
	temp3.setPosition(1050,250);
	temp3.setShift(1);
	temp3.setStroke(1);
	temp3.setStrokeFill(0);
	temp3.drawAll(20);

	temp3.setAlpha(100);

	var hourData = []
	for(var i = 0; i<24; i++)
		hourData[i] = 0;

	for(var i = 0; i<drawingData.length; i++){

		var arr = drawingData[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])

		hourData[arr[0]] ++;
	}

	for(var i = 0; i<24; i++){
		temp3.drawMultipleStroke(i,hourData[i]);
	}

/*


	var temp11 = new TwitterSpiro(199,[66],[[110]])
	temp11.setLineWidth(0.4);
	temp11.setPosition(250,650);
	temp11.setStroke(1);
	temp11.drawAll(20);
	temp11.setAlpha(40);

	for(var i = 0; i<drawingData.length; i++){

		var arr = drawingData[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		var index = parseInt((arr[0] * 60 + arr[1])/(60*24) * temp11.outerRadius);
		temp11.drawGradientStroke(index,0);
	}

	var temp12 = new TwitterSpiro(199,[76],[[90]])
	temp12.setLineWidth(0.4);
	temp12.setPosition(250,650);
	temp12.setStroke(1);
	temp12.drawAll(20);
	temp12.setAlpha(40);
	for(var i = 0; i<drawingData.length; i++){
		var arr = drawingData[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		var index = parseInt((arr[0] * 60 + arr[1])/(60*24) * temp12.outerRadius);
		temp12.drawGradientStroke(index,0);
	}

	var temp13 = new TwitterSpiro(199,[86],[[70]])
	temp13.setLineWidth(0.4);
	temp13.setPosition(250,650);
	temp13.setStroke(1);
	temp13.drawAll(20);
	temp13.setAlpha(40);
	for(var i = 0; i<drawingData.length; i++){
		var arr = drawingData[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		var index = parseInt((arr[0] * 60 + arr[1])/(60*24) * temp13.outerRadius);
		temp13.drawGradientStroke(index,0);
	}

/*
	var temp14 = new TwitterSpiro(199,[118],[[85]],0.4)
	temp14.setLineWidth(0.4);
	temp14.setPosition(250,650);
	temp14.setStroke(1);
	temp14.drawAll(40);
	temp14.setAlpha(100);

	for(var i = 0; i<data.length; i++){
		var arr = data[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		var index = parseInt((arr[0] * 60 + arr[1])/(60*24) * temp14.outerRadius);
		temp14.drawGradientStroke(index,0);
	}



	//temp12.$canvas.css("width",100).css("height",100)




/*
	var temp3 = new TwitterSpiro(240,[170],[[100,95,90,85,80,75,70,65,60,55,50,45,40,35,30]],1)
	//var temp3 = new TwitterSpiro(96,[84],[[77,75,73,71,69,67,65,63,61,59,57,55,53,51]],2)
	temp3.setLineWidth(0.6);
	temp3.setPosition(1050,250);
	temp3.setShift(1);
	temp3.setStroke(1);
	temp3.setStrokeFill(0);
	temp3.setSequence(1);
	temp3.drawAll(15);

	temp3.setAlpha(70);

	var hourData = []
	for(var i = 0; i<24; i++)
		hourData[i] = 0;

	for(var i = 0; i<data.length; i++){

		var arr = data[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])

		hourData[arr[0]] ++;
	}

	for(var i = 0; i<24; i++){
		temp3.drawMultipleStroke(i,hourData[i]);
	}






/*
	for(var i = 0; i<24; i++){
		temp3.setColor([100,100,100])
		var n = parseInt(Math.random()*10)
		for(var j = 0; j<n; j++){
			var nn = parseInt(Math.random()*5)
			for(var k = 0; k<nn; k++)
				temp3.drawGradientStroke(i,j)

		}
	}


/*

	var temp = new EmailSpiro(30,[18],[[4]])
	temp.setSpeed(0.01);
	temp.draw();





	var test2 = new SpiroGraph(0,105,[24,80],[[5],[13,14,15]])
	test2.setSpeed(0.01);
	test2.draw();
*/
/*
	var weather = new WeatherSpiro(6,96,[52,76],[[1,2,3,4,5,6],[14,15,16,17,18,19]],2);
	//weather.drawAll();
	weather.setPosition(400,200);
	weather.drawSpecial();
	//weather.initLegend();


	var spirom = new SpiroMove(200, 200, 100, 100, 100);
	spirom.draw(0);

	/*
	var spirom2 = new SpiroMove(200, 200, 100, 100, 100);
	spirom2.draw(1);
	var spirom3 = new SpiroMove(200, 200, 100, 100, 100);
	spirom3.draw(2);
*/

	/*

	var temp = [];
	for(var i = 0; i<10; i++){
		for(var j = 0; j<10; j++){
			temp[i*10 + j] = new SpiroGraph(i*10+j, 105, [i*5], [[j]],1)
			temp[i*10 + j].setPosition(i*150, j*150);
			temp[i*10 + j].draw();
		}
	}
	*/

}







