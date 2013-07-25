
var winwidth = window.innerWidth,	// windows width
	winheight = window.innerHeight;	// windows height


// init CHI data
/*
var CHIData = [];
for(var i = 0; i<CHIDaysNum; i++)
	CHIData[i] = [];

var CHIDays = [[3,26],[3,27],[3,28],[3,29],[3,30],[4,1],[4,2],[4,3],[4,4],[4,5]];
var CHIDaysNum = CHIDays.length;

$.getJSON('js/chi2013.json', function(data) {

	var items = [];
	var hasId = [];
	var idCount = 0;
	var myTime = []
	$.each(data, function(key, val) {


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
				CHIData[i].push(d.getHours() + ":" + d.getMinutes());
			}

		}
	});

	drawProcessing();

});

*/
function drawProcessing(){

/*
	var processingInstance = new Processing(canvas, drawData);

}
function drawData(processing){

	processing.size(winwidth, winheight);
	processing.background(255);
	processing.noLoop();
	processing.frameRate(30);
	processing.strokeWeight(0.4);
	*/


	/*
	var spiro2 = new SpiroGraph(105,[30,45,60],[[1,2,3],[6,7,8],[11,12,13]],processing);
	spiro2.setTranslate(winwidth/4,0);
	spiro2.drawAll();
*/
/*
	var spiro3 = new SpiroGraph(0,96,[64],[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]]);


	spiro3.preDraw(50);
	spiro3.drawNode(1,1);
	spiro3.drawNode(2,1);
	spiro3.drawNode(0,1);
	spiro3.drawNode(2,5);
	spiro3.drawNode(0,5);
	spiro3.drawNode(1,6);
	spiro3.drawNode(1,7);
	spiro3.drawNode(1,10);
	spiro3.drawNode(2,10);
	spiro3.drawNode(0,10);
	spiro3.drawNode(1,9);
	spiro3.drawNode(2,9);

	var spiro4 = new SpiroGraph(1,105,[80],[[1, 5, 10, 15, 20]]);
	spiro4.preDraw(50);
	*/

	//var weather = new WeatherSpiro(2,121,[60],[[3]]);
/*
	var second = new TimeSpiro(3,120,[74],[[8]]);
	second.setSpeed(1);
	second.preDraw(40);
	second.draw();

	var minute = new TimeSpiro(3,120,[74],[[8]]);
	minute.setSpeed(60);
	minute.setSteps(60);
	minute.preDraw(20);
	minute.draw();
	*/
	/*
	var test = new SpiroGraph(120,[94],[[20]],2);
	test.draw();

	var weather = new WeatherSpiro(96,[52,76],[[1,2,3,4,5,6],[14,15,16,17,18,19]],2);
	//weather.drawAll();
	weather.drawAll();

	weather.setPosition(400,200);
	weather.drawSpecial();
	//weather.initLegend();
*/

/*


	var second = new TimeSpiro(120,[94],[[20]],1)
	second.setType("s");
	second.setSpeed(1);
	second.setSteps(60);
	second.setColor([223,97,204]);
	second.setPosition(700,250);
	second.drawAll(50);
	second.drawContinue();

	var minute = new TimeSpiro(120,[34],[[6]],1)
	minute.setType("m");
	minute.setSpeed(60);
	minute.setSteps(60);
	minute.setColor([131,205,230]);
	minute.setPosition(700,250);
	minute.drawAll(80);
	minute.drawContinue();

	var hour = new TimeSpiro(144,[30],[[8]],1)
	hour.setType("h");
	hour.setSpeed(3600);
	hour.setSteps(60);
	hour.setColor([145,230,131]);
	hour.setPosition(700,250);
	hour.drawAll(80);
	hour.drawContinue();

	var test = new TwitterSpiro(120,[94],[[20]],1)
	test.drawAll(50);
	for(var i = 0; i<10; i++)
		test.drawStroke(i*2, 20);

	var spiro3 = new TwitterSpiro(96,[64],[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]]);
	spiro3.drawAll(50);
	for(var i = 0; i<10; i++){

		var r = parseInt(Math.random()*255);
		var g = parseInt(Math.random()*255);
		var b = parseInt(Math.random()*255);
		spiro3.setColor([r,g,b]);
		var num = parseInt(Math.random()*3)
		var distance = parseInt(Math.random()*18)
		spiro3.drawStroke(num, distance);
	}
*/
	// weather
	/*
	var weather = new WeatherSpiro(96,[52,76],[[1,2,3,4,5,6],[14,15,16,17,18,19]],1.5);
	weather.setPosition(950,250);
	weather.setSteps(100);
	weather.drawSpecial();
*/
	// time
	/*
	var second = new TimeSpiro(120,[94],[[20]],1)
	second.setType("s");
	second.setSpeed(1);
	second.setSteps(60);
	second.setColor([223,97,204]);
	second.setPosition(200,250);
	second.drawAll(50);
	second.drawContinue();

	var minute = new TimeSpiro(120,[34],[[6]],1)
	minute.setType("m");
	minute.setSpeed(60);
	minute.setSteps(60);
	minute.setColor([131,205,230]);
	minute.setPosition(200,250);
	minute.drawAll(80);
	minute.drawContinue();

	var hour = new TimeSpiro(144,[30],[[8]],1)
	hour.setType("h");
	hour.setSpeed(3600);
	hour.setSteps(60);
	hour.setColor([145,230,131]);
	hour.setPosition(200,250);
	hour.drawAll(80);
	hour.drawContinue();
	// office people
	var spiro4 = new TwitterSpiro(144,[63],[[12,14.5,16.5,17.5,19.5]]);
	spiro4.setLineWidth(1);
	spiro4.setPosition(450,250);
	for(var i = 0; i<spiro4.nodeNum; i++){

		var temp = parseInt(Math.random()*3);
		if(temp == 0)
			var color = [200,242,193]; // in office
		else if(temp == 1)
			var color = [193,230,242]; // work remotely
		else
			var color = [204,204,204]; // not working

		spiro4.setNodeColor(i, color );
	}

	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 0, 1);
	}
	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 1, 0);
	}
	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 2, 1);
	}
	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 3, 0);
	}

	spiro4.drawAllGradient(255);

/*

	// office people
	var spiro44 = new TwitterSpiro(48,[21],[[3,5,7]]);
	spiro44.setLineWidth(1);
	spiro44.setAlpha(75);
	spiro44.setPosition(450,250);
	for(var i = 0; i<spiro44.nodeNum; i++){

		var temp = parseInt(Math.random()*3);
		if(temp == 0)
			var color = [200,242,193]; // in office
		else if(temp == 1)
			var color = [193,230,242]; // work remotely
		else
			var color = [204,204,204]; // not working

		spiro44.setNodeColor(i, color );
	}

	for(var i = 0; i<spiro44.nodeNum; i++){
		spiro44.drawStroke(i, 0, 1);
	}
	for(var i = 0; i<spiro44.nodeNum; i++){
		spiro44.drawStroke(i, 1, 0);
	}

	spiro44.drawAllGradient(100);




	// bus
	var spiro = new StrokeSpiro(120,[78],[[8]]);
	spiro.setBus("9");
	spiro.setSpeed(3);
	spiro.setAlpha(255);
	spiro.setPosition(700,250);
	spiro.drawBG();
	// bus
	var spiro2 = new StrokeSpiro(100,[55],[[8]]);
	spiro2.setBus("91");
	spiro2.setSpeed(3);
	spiro2.setAlpha(255);
	spiro2.setPosition(700,250);
	spiro2.drawBG();




*/


	// office people
	//var temp = new TwitterSpiro(120,[56],[[35,29,23,17,11,5,-1,-7]],2)
/*
	data = ["0:20",
				"1:30", "1:50", "1:53",
				"2:10",
				"3:04", "3:48", "3:49",
				"4:14", "4:23",
				"5:09", "5:30", "5:39", "5:40",
				"6:09", "6:20", "6:42", "6:52", "6:54",
				"7:01", "7:02", "7:44", "7:48",
				"8:20", "8:22", "8:24", "8:42", "8:44", "8:52", "8:53",
				"9:01", "9:11", "9:21", "9:22", "9:30", "9:31", "9:31", "9:32", "9:33", "9:50", "9:50", "9:56",
				"10:01", "10:07", "10:11","10:16", "10:21", "10:25", "10:25", "10:30", "10:32", "10:36", "10:37", "10:42", "10:52", "10:53", "10:57",
				"11:05", "11:12", "11:12", "11:20", "11:30",
				"12:17", "12:20",
				"13:40", "13:46", "13:50", "13:46", "13:50",
				"14:10", "14:13", "14:20", "14:30", "14:33",
				"15:27", "15:40",
				"16:10", "16:16", "16:50",
				"17:00", "17:23", "17:40", "17:43", "17:53",
				"18:27", "18:40",
				"19:47", "19:50","19:56",
				"20:17", "20:20",
				"21:40", "21:46", "21:50",
				"22:10", "22:13", "22:20", "22:30", "22:33",
				"23:27", "23:40"]
/*

	var temp = new TwitterSpiro(96,[44],[[30,27,24,21,18,15,12,9,6,3,0,-3]],2)

	temp.setLineWidth(0.4);
	//temp.setStroke(1)
	temp.setPosition(250,250);
	temp.drawAll(20);
	temp.setAlpha(50);
	for(var i = 0; i<data.length; i++){

		var arr = data[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		temp.drawGradientStroke(arr[0],arr[1]);
	}
*/


/*

	var temp = new TwitterSpiro(96,[44],[[30,27,24,21,18,15,12,9,6,3,0,-3]],2)
	temp.setLineWidth(0.2);
	temp.setPosition(250,250);
	temp.drawAll(20);
	temp.setAlpha(40);
	temp.setStroke(1)
	temp.setGradientPoint(0.6);
	/*
	for(var i = 0; i<drawingData.length; i++){

		var arr = drawingData[i].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		temp.drawGradientStroke(arr[0],arr[1]);
	}
	*/
	/*
	var count = 0;
	var inter = setInterval(function(){

		var arr = drawingData[count].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		temp.drawGradientStroke(arr[0],arr[1]);

		count++;

		if(count == drawingData.length){
			clearInterval(inter);
		}
	},100);



/*
	temp.ctx.rect(200,200,100,100)

	var lingrad = this.ctx.createLinearGradient(0,0,Math.cos(this.gradientAngle)*midD,Math.sin(this.gradientAngle)*midD);
	    lingrad.addColorStop(0, "rgba("+this.bgColor[0]+","+this.bgColor[1]+","+this.bgColor[2]+",0)");
	    lingrad.addColorStop(1, "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")");

		this.ctx.moveTo(this.xPoint[0], this.yPoint[0]);
		for(var i = 0; i<this.xPoint.length; i++){
			this.ctx.lineTo(this.xPoint[i], this.yPoint[i]);
		}

		this.ctx.fillStyle = lingrad;
		this.ctx.fill();

*/

/*
	var temp2 = new TwitterSpiro(199,[118],[[85]])
	temp2.setLineWidth(0.4);
	temp2.setPosition(650,250);
	temp2.setStroke(1);
	temp2.drawAll(20);
	temp2.setAlpha(40);
	temp2.setGradientPoint(0);
	var count = 0;
	var inter = setInterval(function(){

		var arr = drawingData[count].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		var index = parseInt((arr[0] * 60 + arr[1])/(60*24) * 200);
		temp2.drawGradientStroke(index,0);

		count++;

		if(count == drawingData.length){
			clearInterval(inter);
		}
	},100);



	var temp3 = new TwitterSpiro(240,[170],[[100,95,90,85,80,75,70,65,60,55,50,45,40,35,30]],1)
	//var temp3 = new TwitterSpiro(96,[84],[[77,75,73,71,69,67,65,63,61,59,57,55,53,51]],2)
	temp3.setLineWidth(0.6);
	temp3.setPosition(1050,250);
	temp3.setShift(1);
	temp3.setStroke(1);
	temp3.setStrokeFill(0);
	temp3.setSequence(1);
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

	var weather = new WeatherSpiro(96,[52,76],[[49,46,43,40,37,34],[34,31,28,25,22,19]],1.5);
	weather.setPosition(650,250);
	weather.setSteps(100);
	weather.drawSpecial();


	


	var second = new TimeSpiro(120,[94],[[34]],1)
	second.setType("s");
	second.setSpeed(1);
	second.setSteps(60);
	second.setColor([223,97,204]);
	second.setPosition(200,250);
	second.drawAll(50);
	second.drawContinue();

	var minute = new TimeSpiro(120,[34],[[16]],1)
	minute.setType("m");
	minute.setSpeed(60);
	minute.setSteps(60);
	minute.setColor([131,205,230]);
	minute.setPosition(200,250);
	minute.drawAll(80);
	minute.drawContinue();

	var hour = new TimeSpiro(144,[30],[[6]],1)
	hour.setType("h");
	hour.setSpeed(3600);
	hour.setSteps(60);
	hour.setColor([145,230,131]);
	hour.setPosition(200,250);
	hour.drawAll(80);
	hour.drawContinue();

	// bus
	var spiro = new StrokeSpiro(120,[78],[[54]]);
	spiro.setBus("9");
	spiro.setSpeed(3);
	spiro.setAlpha(255);
	spiro.setPosition(1000,250);
	spiro.drawBG();
	// bus
	var spiro2 = new StrokeSpiro(100,[55],[[31]]);
	spiro2.setBus("91");
	spiro2.setSpeed(3);
	spiro2.setAlpha(255);
	spiro2.setPosition(1000,250);
	spiro2.drawBG();
	
	// office people
	var spiro4 = new TwitterSpiro(144,[63],[[27,20,16,13,6]]);
	spiro4.setLineWidth(1);
	spiro4.setPosition(450,250);
	for(var i = 0; i<spiro4.nodeNum; i++){

		var temp = parseInt(Math.random()*3);
		if(temp == 0)
			var color = [200,242,193]; // in office
		else if(temp == 1)
			var color = [193,230,242]; // work remotely
		else
			var color = [204,204,204]; // not working

		spiro4.setNodeColor(i, color );
	}

	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 0, 1);
	}
	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 1, 0);
	}
	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 2, 1);
	}
	for(var i = 0; i<spiro4.nodeNum; i++){
		spiro4.drawStroke(i, 3, 0);
	}

	spiro4.drawAll(255);



/*

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







