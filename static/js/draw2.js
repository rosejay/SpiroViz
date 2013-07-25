
var winwidth = window.innerWidth,	// windows width
	winheight = window.innerHeight;	// windows height

/*
var canvas = document.getElementById("canvas");
canvas.width = winwidth;
canvas.height = winheight;


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

	
	var temp = new TwitterSpiro(96,[44],[[24,21,18,15,12,9,6,3,0,-3]],2)

	temp.setLineWidth(0.6);
	temp.setStroke(1)
	temp.setAlpha(100);
	temp.setPosition(250,250);
	temp.drawAll(70);
	temp.drawGradientStroke(0,0);

	temp.drawGradientStroke(0,3);
	temp.drawGradientStroke(0,5);

	temp.drawGradientStroke(1,6);
	temp.drawGradientStroke(1,2);
	temp.drawGradientStroke(1,2);

	temp.drawGradientStroke(3,2);
	temp.drawGradientStroke(3,2);
	temp.drawGradientStroke(3,3);
	temp.drawGradientStroke(3,6);

	temp.drawGradientStroke(5,7);
	temp.drawGradientStroke(5,1);

	temp.drawGradientStroke(4,6);
	temp.drawGradientStroke(4,4);
	temp.drawGradientStroke(6,4);
	temp.drawGradientStroke(6,3);


	//var temp2 = new TwitterSpiro(177,[82],[[-5]])
	var temp2 = new TwitterSpiro(199,[118],[[85]])
	temp2.setLineWidth(0.6);
	
	temp2.setPosition(650,250);
	temp2.setStroke(1);

	temp2.drawAll(30);
	temp2.setAlpha(70);
	for(var i = 0; i<199; i++){

		var t = parseInt(Math.random()*5)
		if(!t){
			for(var j = 0; j<parseInt(Math.random()*5); j++)
				temp2.drawGradientStroke(i,0);
		}
	}
	
	

	var temp3 = new TwitterSpiro(240,[170],[[100,95,90,85,80,75,70,65,60,55,50,45,40,35,30]],1)
	//var temp3 = new TwitterSpiro(96,[84],[[77,75,73,71,69,67,65,63,61,59,57,55,53,51]],2)
	temp3.setLineWidth(0.6);
	temp3.setAlpha(30);
	temp3.setPosition(1050,250);
	temp3.setShift(1);
	temp3.setStroke(1);
	temp3.setStrokeFill(0);

	temp3.drawAll(60);

	temp3.setAlpha(50);



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

