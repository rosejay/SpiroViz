
// class SpiroGraph
var MyGraph = function(width){

	this.spiro = [];
	this.parentDiv = $(".main-left");
	this.width = width;

}
MyGraph.prototype.addNewSpiro = function(array){

	var i = this.spiro.length;
	this.spiro[i] = new SpiroGraph(array);
	this.spiro[i].setParent(this.parentDiv);
	this.spiro[i].setWidth(this.width);
	this.spiro[i].initCanvas();
	this.spiro[i].draw();
}
MyGraph.prototype.setParent = function(item){
	this.parentDiv = item;
}
MyGraph.prototype.getParent = function(){
	return this.parentDiv;
}


MyGraph.prototype.updateSpiro = function(index, array){

	this.spiro[index].updateAttr(array);
	this.spiro[index].draw();
}