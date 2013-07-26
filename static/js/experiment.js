var winwidth = window.innerWidth,	// windows width
	winheight = window.innerHeight;	// windows height

var speed;

var MyDrawData = function( x,y,color){

	this.x = x;
	this.y = y;
	this.color = color;
}


var MyList = function(){

	// attributes
	this.attrNum = 9;
	this.tangle = [];
	this.defaultData = [105,75,20,"#000",20,2,10,70,0];
	this.spiroData = [];

	this.isOverallSpeed = 0;
	
	this.$div = $(".main-left");
	this.$list = $("ul.spiro-list li.item");
	this.$currentLi;
	this.currentIndex;

	this.isReady = true;

	var self = this;
	// toggle enable
	$(".checkbox").bind( "click", function(){
		
		var $li = $(this).parent().parent();
		var index = self.$list.index($li);

		if($(this).hasClass("checked"))
			$(".main-left.graph canvas:nth-child("+(index+1)+")").fadeOut(150);
		else
			$(".main-left.graph canvas:nth-child("+(index+1)+")").fadeIn(150);

	})

	// for tangle to get the current $li and current index
	$("p span span").bind( "mousedown", function(){

		self.$currentLi = $(this).parent().parent().parent();
		self.currentIndex = self.$list.index(self.$currentLi );
	})

/*
$("body").on( "change", "input", function(){

	if($(this).attr("type")!="checkbox"){
		$li = $(this).parent().parent();
		index = $list.index($li);
		updateOneSpiro(index, $li);
	}
		
})
*/

	this.$list.on("change", "input",function(){
		if($(this).attr("type") == "color"){
			self.$currentLi = $(this).parent().parent();
			self.currentIndex = self.$list.index(self.$currentLi );
			self.updateOneSpiro(self.currentIndex, self.$currentLi);
		}
	})

	// add new spirograph
	$(".add-spiro").click(function(){

		var $li = $(this).parent().parent();
		var index = self.spiroData.length;
		self.getOneSpiroData(index, $li);
		self.addSpiroLi(index);
		self.graph.addNewSpiro(self.spiroData[index]);
		$(".new.col input").val("")
	})

}

MyList.prototype.start = function(){

	if(this.spiroData.length == 0){
		this.spiroData = [[105,75,20,"#000",20,2,10,70,0], 
						  [105,75,30,"#000",30,1,10,70,0],
						  [105,75,40,"#000",40,0.5,10,70,0]]
	}

	this.setUpTangle();
	// init graph
	this.graph = new MyGraph(500);
	this.graph.setParent(this.$div);
	for(var i = 0; i<this.spiroData.length; i++)
		this.graph.addNewSpiro(this.spiroData[i]);
}


MyList.prototype.getOneSpiroData = function(index, $li){

	this.spiroData[index] = [];
	for(var i = 0; i<9; i++){
		if(i>=3)
			this.spiroData[index].push(this.defaultData[i]);
		else 
			this.spiroData[index].push(parseInt($li.find(".col"+(i+1)).children("input").val()));
	}
}

MyList.prototype.updateOneSpiro = function(index, $li){

	if(this.isReady){

		//if(this.isOverallSpeed){
			/*
			var s2 = this.tangle[index].getValue("speed2")
			var s1 = s2 / this.graph.spiro[index].nodeNum;
			this.tangle[index].setValues({"speed1": s1});
		}
		else{
			*/

			var s1 = this.tangle[index].getValue("speed1")
			var s2 = s1 * this.graph.spiro[index].nodeNum;
			this.tangle[index].setValues({"speed2": s2});
		//}
		// reset data
		this.spiroData[index] = [];
		this.spiroData[index].push(parseInt(this.tangle[index].getValue("outerRadius")));
		this.spiroData[index].push(parseInt(this.tangle[index].getValue("innerRadius")));
		this.spiroData[index].push(parseInt(this.tangle[index].getValue("distance")));
		this.spiroData[index].push($li.find(".col4").val());
		this.spiroData[index].push(parseInt(this.tangle[index].getValue("alpha")));
		this.spiroData[index].push(parseFloat(this.tangle[index].getValue("linewidth")/10));
		this.spiroData[index].push(parseFloat(this.tangle[index].getValue("speed1")/10));
		this.spiroData[index].push(parseFloat(this.tangle[index].getValue("speed2")/10));
		this.spiroData[index].push(parseInt(this.tangle[index].getValue("animation")));
		this.graph.updateSpiro(index, this.spiroData[index]);

		updateURL();
	}
		
}
	

MyList.prototype.setUpTangle = function(){

	var self = this;

	// animation attributes
	Tangle.formats.myFormat = function (value) { 
		var arr = ["none","normal","clockwise","c.c.w"]
		return arr[value]; 
	}
	Tangle.formats.float = function (value) { 
		return ( value / 10 ).toFixed(1) 
	}


	for(var i = 0; i<this.spiroData.length; i++){
		this.addSpiroLi(i);
	}


}


MyList.prototype.addSpiroLi = function(index){


	var self = this;
	this.isReady = false;
	var $li = $("<li class='item' index='"+index+"'>\
					<p class='' id='example"+index+"'>\
						<span data-var='outerRadius' class='TKAdjustableNumber col col1' data-min='1' data-max='200'></span>\
						<span data-var='innerRadius' class='TKAdjustableNumber col col2' data-min='1' data-max='200'></span>\
						<span data-var='distance' class='TKAdjustableNumber col col3' data-min='0' data-max='200'></span>\
						<input type='color' value='#000' name='favcolor' tabindex='4' class='col col4'>\
						<span data-var='alpha' class='TKAdjustableNumber col col5' data-min='0' data-max='100'></span>\
						<span data-var='linewidth' class='TKAdjustableNumber col col6' data-format='float' data-min='1' data-max='100'></span>\
						<span data-var='speed1' class='TKAdjustableNumber col col7'  data-format='float' data-min='1' data-max='1000'></span>\
						<span data-var='speed2' class=' col col8'  data-format='float' data-min='1' data-max='1000'></span>\
						<span data-var='animation' class='TKAdjustableNumber col col9' data-format='myFormat' data-min='0' data-max='3'></span>\
					</p>\
					<p class='col10 col'>\
						<label class='checkbox checked' for='checkbox2'>\
				            <span class='icons'>\
				            	<span class='first-icon fui-checkbox-unchecked'></span>\
				            	<span class='second-icon fui-checkbox-checked'></span>\
				           	</span>\
				            <input type='checkbox' checked='checked' value='' id='checkbox2' data-toggle='checkbox'>\
				        </label>\
					</p>\
				</li>");
		
	


	$(".spiro-list.list").append($li);
	$li.find("input[color]").attr("value", this.spiroData[index][3]);
	
	// tangle
	var element = document.getElementById("example"+index);
	this.tangle[index] = new Tangle(element, {
	    initialize: function () {

	        this.outerRadius = self.spiroData[index][0];
	        this.innerRadius = self.spiroData[index][1];
	        this.distance = self.spiroData[index][2];
	        this.alpha = self.spiroData[index][4];
	        this.linewidth = self.spiroData[index][5]*10;
	        this.speed1 = self.spiroData[index][6]*10;
	        this.speed2 = self.spiroData[index][7]*10;
	        this.animation = self.spiroData[index][8];


	    },
	    update: function () {
	       // this.speed2 = this.speed1 * self.graph.spiro[self.currentIndex].nodeNum;
	        self.updateOneSpiro(self.currentIndex, self.$currentLi);
	    }
	});

	$("p#example"+index+" span span").bind( "mousedown", function(){
		self.$currentLi = $(this).parent().parent().parent();
		//self.currentIndex = self.$list.index(self.$currentLi );
		self.currentIndex = self.$currentLi.attr("index");
	})

	this.isReady = true;


}




