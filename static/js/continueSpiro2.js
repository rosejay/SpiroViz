

// class ContinueSpiro
var ContinueSpiro = function(r1, r2, d, z){

	SpiroGraph.call(this, r1, r2, d, z);

	// data
	this.initData(0);

	this.color= [0,0,0]
	this.first = true;

	// rotate
	this.shift = 0;
	this.ctx.rotate(- Math.PI / 2);
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
}
ContinueSpiro.prototype = Object.create(SpiroGraph.prototype)
ContinueSpiro.prototype.constructor = ContinueSpiro;
ContinueSpiro.prototype.setNodeColor = function(num,item){
	this.nodeColor[num] = item;
}

ContinueSpiro.prototype.setData = function(item){
	this.data = item;
	this.totalTime = this.data.length * 60 * 24;
	this.totalAngle = this.innerRadius[0] / this.gcdNum * 2 * Math.PI;

	this.totalDataNum = 0;
	for(var i = 0; i<this.data.length; i++){
		this.totalDataNum += this.data[i].length;
	}
}
ContinueSpiro.prototype.setRadius = function(item){
	this.radius = item;
}
ContinueSpiro.prototype.draw = function(alpha){

	this.alpha = this.preAlpha = alpha ? alpha : 50;

	var self = this;
	var count = 0;
	var i = 0;
	this.color = this.drawCLR[0];

	this.interval = setInterval(function(){
		
		var arr = self.data[i][count].split(":");
		arr[0] = parseInt(arr[0])
		arr[1] = parseInt(arr[1])
		var time = arr[0] * 60 + arr[1] + (i+1) * 60 * 24;
		self.theta = time / self.totalTime * self.totalAngle;
		self.batchedLine();
		self.drawCircle();
		
		if(self.prev_x){
			self.drawLine();
		}

		count ++;
		if(count >= self.data[i].length){
			i++;
			count = 0;
			
			if(i>=self.data.length){
				clearInterval(self.interval);
			}
			else{
				self.color = self.drawCLR[i];
			}

		}
	}, 0.1);
	
}


ContinueSpiro.prototype.draw2 = function(alpha){

	this.alpha = this.preAlpha = alpha ? alpha : 50;

	var self = this;
	var count = 0;
	var i = 0;
	var j = 0;
	this.color = this.drawCLR[0];

	this.interval = setInterval(function(){

		self.theta = count / self.totalDataNum * self.totalAngle;
		self.batchedLine();
		self.drawCircle();

		if(self.prev_x){
			self.drawLine();
		}

		count ++;
		j++;
		if(j >= self.data[i].length){
			i++;
			j = 0;
			
			if(count == self.totalDataNum){
				clearInterval(self.interval);
			}
			else{
				self.color = self.drawCLR[i];
			}
			console.log(self.color)

		}
	}, 1);
	
}


ContinueSpiro.prototype.batchedLine = function() {


	var i = i ? i : this.currentGear;
	var j = j ? j : this.currentDistance;

	var val1 = (this.theta + this.startAngle) * (1 - this.outerRadius / this.innerRadius[i]);
	var val2 = this.outerRadius - this.innerRadius[i];

	this.x1 = Math.cos((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.cos(val1);
	this.y1 = Math.sin((this.theta + this.startAngle)) * val2 + this.pointDistance[i][j] * Math.sin(val1);

	if(!this.prev_x){
		this.prev_theta = this.theta;
		this.prev_x = this.x1;
		this.prev_y = this.y1;
	}

}

ContinueSpiro.prototype.drawCircle = function(){

	this.ctx.save();


	// fill circle
	this.ctx.beginPath();
	this.ctx.lineWidth = 0;
	this.ctx.globalAlpha = this.alpha/255*1.5;
	this.ctx.fillStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
	this.ctx.arc(this.x1, this.y1, this.radius, 0, 2*Math.PI);
	this.ctx.fill();
	this.ctx.restore();
	

}

ContinueSpiro.prototype.drawLine = function(){

	this.target_theta = this.theta;
	this.theta = this.prev_theta;
	for(var i = this.prev_theta; i<this.target_theta; i+=this.angleDiv){

		this.theta += this.angleDiv;
		this.batchedLine();

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.strokeStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
		this.ctx.moveTo(this.prev_x, this.prev_y);
		this.ctx.lineTo(this.x1, this.y1);
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.globalAlpha = this.alpha/255;
		this.ctx.stroke();
		this.ctx.restore();
		this.prev_x = this.x1;
		this.prev_y = this.y1;
	}
	this.prev_theta = this.target_theta;
}

