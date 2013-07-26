
// class ContinueSpiro
// for demo 3, demo 4
var ContinueSpiro = function(r1, r2, d, z){

	SpiroGraph.call(this, r1, r2, d, z);

	// data
	this.initData(0);

	this.color= [0,0,0]
	this.first = true;

	// rotate
	this.shift = 0;
	//this.ctx.rotate(- Math.PI / 2);
	this.angle = 0;
	this.drawCLR = [[255,104,113],
					[255,159,58],
					[255,228,0],
					[190,221,62],
					[0,203,137],
					[0,188,238],
					[155,142,194],
					[221,141,180],
					[152,191,149],
					[0,0,0]]
	this.isStrokeFill = 1;
	this.bubbleRadius = 0.5;
	this.rotateAngle = 0;
	this.drawData = [];

}
ContinueSpiro.prototype = Object.create(SpiroGraph.prototype)
ContinueSpiro.prototype.constructor = ContinueSpiro;
ContinueSpiro.prototype.setColor= function(item){
	this.drawCLR[0] = this.drawCLR[item];
}

ContinueSpiro.prototype.setData = function(item){
	this.data = item;
	this.totalTime = this.data.length * 60 * 24;
	this.totalAngle = this.innerRadius[0] / this.gcdNum * 2 * Math.PI;

	for(var i = 0; i<this.data.length; i++){
		for(var j = 0; j<this.data[i].length; j++){

			var count = i*24*60 + j;
			if(this.data[i][j].length)
				var radius = this.data[i][j].length * this.bubbleRadius + 2;
			else
				var radius = 0;
			this.theta = count / this.totalTime * this.totalAngle - this.anglePerNode/2;
			this.batchedLine();
			this.drawData[count] = new MyDrawData(this.x1, this.y1, this.drawCLR[i], radius, i, this.data[i][j], i, j);
		}
	}
}


ContinueSpiro.prototype.setBubbleRadius = function(item){
	this.bubbleRadius = item;
}

ContinueSpiro.prototype.draw = function(){

	this.alpha = this.preAlpha = this.alpha ? this.alpha : 50;
	
	this.currentIndex = this.speed;
	var self = this;

	this.interval = setInterval(function(){

		self.drawOverall();

		for(var index = self.speed; index>0; index --){

			var tempIndex = self.currentIndex - index;
			if(self.drawData[tempIndex].data.length){

				$("#textBox p").remove();
				$("#textBox #textTime").html(self.drawData[tempIndex].str);
				for(var j = 0; j<self.drawData[tempIndex].data.length; j++){
					var $p = $("<p>"+self.drawData[tempIndex].data[j].text+"</p>")
					$("#textBox").append($p);
				}
			}
			else{
				//
				for(var k = self.currentIndex-self.speed; k<self.currentIndex; k++){
					$("#textBox p").remove();
					$("#textBox #textTime").html(self.drawData[k].str);
				}
			}
		}


		self.currentIndex += self.speed;
		if(self.currentIndex >= self.totalTime)
			clearInterval(self.interval);

	},1000/24)
	
}

ContinueSpiro.prototype.drawOverall = function(){

	var lastIndex = this.currentIndex; 
	var comingPointsNum = 30;
	var x = this.drawData[lastIndex].x;
	var y = this.drawData[lastIndex].y;
	var prev_x = this.drawData[lastIndex-1].x;
	var prev_y = this.drawData[lastIndex-1].y;

	var diffX = x-prev_x;
	var diffY = y-prev_y;

	var data = [];

	var angle = Math.acos(-diffX/Math.sqrt(diffX*diffX + diffY*diffY))  // -
	if(diffY<0)  // -
		angle = -angle;

	if(100+lastIndex < this.totalTime)
		var tempLen = comingPointsNum+lastIndex;
	else
		tempLen = this.totalTime;

	for(var i = 0; i<tempLen; i++){

		data[i] = new MyDrawData(this.drawData[i].x - x, this.drawData[i].y - y ,
								 this.drawData[i].color, 
								 this.drawData[i].radius,
								 this.drawData[i].data )

	}
	
	this.redraw();
	this.ctx.save();	
	//this.ctx.translate(-x,-y);
	this.ctx.rotate(angle);
	
	this.ctx.lineWidth = this.lineWidth;
	this.ctx.globalAlpha = this.alpha/255;

	var lastI = -1;
	var index = 0;
	for(var i = 0; i<lastIndex-1; i++){


		if(lastI != index){
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.strokeStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")"
			this.ctx.moveTo(data[i].x, data[i].y)
			lastI = index;
		}
			
		this.ctx.lineTo(data[i+1].x, data[i+1].y)
		index = data[i].index;
	}
	this.ctx.stroke();
	

	var lastI = -1;
	var index = 0;
	for(var i = 0; i<lastIndex-1; i++){

		if(lastI != index){
			this.ctx.strokeStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")"
			this.ctx.fillStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")"
			lastI = index;
		}

		this.ctx.beginPath();
		this.ctx.arc(data[i].x, data[i].y, data[i].radius, 0, Math.PI*2);
		this.ctx.fill();

		index = data[i].index;
	}
	




			
	var prev_x2, prev_y2;
	var dis = 0;
	if(comingPointsNum+lastIndex < this.totalTime){

		for(var i = lastIndex; i<lastIndex+comingPointsNum; i++){

			var x = data[i].x - data[i-1].x
			var y = data[i].y - data[i-1].y

			dis += Math.sqrt(x*x + y*y) *3;
			var x2 = dis * Math.sqrt(1/(1+diffY*diffY/(diffX*diffX)));
			
			if(diffX<0)
				x2 = -x2
			var y2 = x2 * diffY / diffX;

			if(prev_x2 ){

				
				this.ctx.lineWidth = this.lineWidth;
				this.ctx.strokeStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")";
				this.ctx.beginPath();
				this.ctx.globalAlpha = 1 - ((i - lastIndex)/(comingPointsNum + 10));
				this.ctx.moveTo(prev_x2, prev_y2)
				this.ctx.lineTo(x2,y2)
				this.ctx.stroke();

				if(data[i].radius){
					this.ctx.beginPath();
					this.ctx.fillStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")"
					this.ctx.arc(x2,y2, data[i].radius, 0, Math.PI*2);
					this.ctx.fill();
				}
			}
			prev_x2 = x2;
			prev_y2 = y2;

		}
			
	}

	this.ctx.restore();
}

