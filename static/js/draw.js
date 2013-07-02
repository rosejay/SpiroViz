
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
	

	var second = new TimeSpiro(0,60,[47],[[20]])
	second.setType("s");
	second.setSpeed(1);
	second.setSteps(60);
	second.setColor([223,97,204]);
	second.setPosition(700,250);
	second.drawAll(40);
	second.draw();


	var minute = new TimeSpiro(0,60,[13],[[6]])
	minute.setType("m");
	minute.setSpeed(60);
	minute.setSteps(60);
	minute.setColor([131,205,230]);
	minute.setPosition(700,250);
	minute.drawNum(20);
	minute.draw();

	var hour = new TimeSpiro(0,96,[20],[[6]])
	hour.setType("h");
	hour.setSpeed(3600);
	hour.setSteps(60);
	hour.setColor([145,230,131]);
	hour.setPosition(700,250);
	hour.drawAll(100);
	hour.draw();

/*
	var test2 = new SpiroGraph(0,105,[24,80],[[5],[13,14,15]])
	test2.setSpeed(0.01);
	test2.draw();
*/
	var spirotest = new WeatherSpiro(6,96,[52,76],[[1,2,3,4,5,6],[14,15,16,17,18,19]]);
	//spirotest.drawAll();
	spirotest.setPosition(200,250);
	spirotest.drawSpecial();
	//spirotest.initLegend();




	
	var spirom = new SpiroMove(200, 200, 100, 100, 100);
}

