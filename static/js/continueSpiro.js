

// class ContinueSpiro
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
	this.radius = 0.5;
	this.rotateAngle = 0;

	this.drawData = [];

}
ContinueSpiro.prototype = Object.create(SpiroGraph.prototype)
ContinueSpiro.prototype.constructor = ContinueSpiro;
ContinueSpiro.prototype.setNodeColor = function(num,item){
	this.nodeColor[num] = item;
}
ContinueSpiro.prototype.setSpeed= function(item){
	this.speed = item;
}
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
				var radius = this.data[i][j].length * 0.5 + 2;
			else
				var radius = 0;
			this.theta = count / this.totalTime * this.totalAngle - this.anglePerNode/2;
			this.batchedLine();
			this.drawData[count] = new MyDrawData(this.x1, this.y1, this.drawCLR[i], radius, i, this.data[i][j]);
		}
	}

}

ContinueSpiro.prototype.setData2 = function(item){
	this.data = item;
	this.totalTime = this.data.length * 60 * 24;
	this.totalAngle = this.innerRadius[0] / this.gcdNum * 2 * Math.PI;

	for(var i = 0; i<this.data.length; i++){
		for(var j = 0; j<this.data[i].length; j++){

			var count = i*24*60 + j;
			if(this.data[i][j].length)
				var radius = this.data[i][j].length * 0.5 + 2;
			else
				var radius = 0;
			this.theta = count / this.totalTime * this.totalAngle - this.anglePerNode/2;
			this.batchedLine();
			this.drawData[count] = new MyDrawData(this.x1, this.y1, this.drawCLR[i], radius, i, this.data[i][j]);
		}
	}

}



ContinueSpiro.prototype.setRadius = function(item){
	this.radius = item;
}

ContinueSpiro.prototype.draw2 = function(){

	this.alpha = this.preAlpha = this.alpha ? this.alpha : 50;
	
	this.currentIndex = this.speed;
	var self = this;

	this.interval = setInterval(function(){

		self.drawOverall();


		for(var index = self.speed; index>0; index --){

			var tempIndex = self.currentIndex - index;
			if(self.drawData[tempIndex].data.length){

				$("#textBox p").remove();
				$("#textBox #textTime").html(self.drawData[tempIndex].data[0].str);
				for(var j = 0; j<self.drawData[tempIndex].data.length; j++){
					var $p = $("<p>"+self.drawData[tempIndex].data[j].text+"</p>")
					$("#textBox").append($p);
				}
			}
		}

		self.currentIndex += self.speed;
		if(self.currentIndex >= self.totalTime)
			clearInterval(self.interval);

	},1000/24)



	
}


ContinueSpiro.prototype.batchedLine = function() {


	var i = i ? i : this.currentGear;
	var j = j ? j : this.currentDistance;

	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[i]);
	var val2 = this.outerRadius - this.innerRadius[i];

	this.x1 = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.cos(val1);
	this.y1 = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.sin(val1);

}
ContinueSpiro.prototype.drawOverall2 = function(){

	var comingPointsNum = 30;


	var lastIndex = this.currentIndex; 
	var x = this.drawData[lastIndex-1].x;
	var y = this.drawData[lastIndex-1].y;
	var prev_x = this.drawData[lastIndex-2].x;
	var prev_y = this.drawData[lastIndex-2].y;

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

	for(var i = lastIndex - this.speed; i<lastIndex; i++)
		data[i] = new MyDrawData(this.drawData[i + lastIndex - this.speed].x - x, 
								 this.drawData[i + lastIndex - this.speed].y - y, 
								 this.drawData[i + lastIndex - this.speed].color, 
								 this.drawData[i + lastIndex - this.speed].radius)
	
	
	



	var xx = this.drawData[lastIndex-1].x - this.drawData[lastIndex-this.speed].x;
	var yy = this.drawData[lastIndex-1].y - this.drawData[lastIndex-this.speed].y;
	this.ctx.translate(-xx,-yy);

	this.ctx.rotate(angle);
	
	for(var i = lastIndex - this.speed; i<lastIndex-1; i++){

		this.ctx.beginPath();
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.globalAlpha = this.alpha/255;
		this.ctx.strokeStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")"
		this.ctx.moveTo(data[i].x, data[i].y)
		this.ctx.lineTo(data[i+1].x, data[i+1].y)
		this.ctx.stroke();
		this.ctx.fillStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")"
		this.ctx.arc(data[i].x, data[i].y, data[i].radius, 0, Math.PI*2);
		this.ctx.fill();
	}

	var prevX = x;
	var prevY = y;
	/*
		
	this.ctx.beginPath();		
	var prev_x2, prev_y2;
	var dis = 0;
	if(comingPointsNum+lastIndex < this.totalTime){

		for(var i = lastIndex; i<lastIndex+comingPointsNum; i++){

			dis += (data[i].x * data[i].x + data[i].y * data[i].y)
			var x2 = Math.sqrt(dis/(1+diffY*diffY/(diffX*diffX)));
			
			if(diffX<0)
				x2 = -x2
			var y2 = x2 * diffY / diffX;

			if(prev_x2){

				this.ctx.lineWidth = this.lineWidth;
				this.ctx.globalAlpha = this.alpha/255/2;
				this.ctx.strokeStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")";
				this.ctx.moveTo(prev_x2, prev_y2)
				this.ctx.lineTo(x2,y2)
				this.ctx.stroke();
				this.ctx.fillStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")"
				this.ctx.arc(x2,y2, data[i].radius, 0, Math.PI*2);
				this.ctx.fill();

			}
			prev_x2 = x2;
			prev_y2 = y2;

		}
	}
		*/


	//this.ctx.restore();
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

			dis += (data[i].x * data[i].x + data[i].y * data[i].y)
			var x2 = Math.sqrt(dis/(1+diffY*diffY/(diffX*diffX)));
			
			if(diffX<0)
				x2 = -x2
			var y2 = x2 * diffY / diffX;

			if(prev_x2 ){

				this.ctx.lineWidth = this.lineWidth;
				this.ctx.globalAlpha = this.alpha/255/2;
				this.ctx.strokeStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")";
				this.ctx.moveTo(prev_x2, prev_y2)
				this.ctx.lineTo(x2,y2)
				this.ctx.stroke();
				if(data[i].color == "[0,0,0]")
					console.log(prev_x2, prev_y2, x2,y2)
				if(data[i].radius){
					this.ctx.strokeStyle = "rgb("+data[i].color[0]+","+data[i].color[1]+","+data[i].color[2]+")";
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