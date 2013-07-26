var HashSearch = new function () {
	var params;

	this.set = function (key, value) {
		params[key] = value;
		this.push();
	};

	this.remove = function (key, value) {
		delete params[key];
		this.push();
	};


	this.get = function (key, value) {
		return params[key];
	};

	this.keyExists = function (key) {
		return params.hasOwnProperty(key);
	};

	this.push= function () {
		var hashBuilder = [], key, value;

		for(key in params) if (params.hasOwnProperty(key)) {
			key = escape(key), value = escape(params[key]); // escape(undefined) == "undefined"
			hashBuilder.push(key + ( (value !== "undefined") ? '=' + value : "" ));
		}
		window.location.hash = hashBuilder.join("&");
	};

	(this.load = function () {
		params = {}
		var hashStr = window.location.hash, hashArray, keyVal
		hashStr = hashStr.substring(1, hashStr.length);
		hashArray = hashStr.split('&');

		for(var i = 0; i < hashArray.length; i++) {
			keyVal = hashArray[i].split('=');
			params[unescape(keyVal[0])] = (typeof keyVal[1] != "undefined") ? unescape(keyVal[1]) : keyVal[1];
		}
	})();
}


var list = new MyList();
getDataFromURL();
function getDataFromURL(){

	if(HashSearch.get("spiro")){
		var str = encodeURI(HashSearch.get("spiro"))
		var arr = str.split("!!");
		for(var i = 0; i<arr.length; i++){
			var attr = arr[i].split("**")
			list.spiroData[i] = [];
			for(var j = 0; j<attr.length; j++){

				if(j == 0||j == 1||j == 2||j == 4||j == 8)
					list.spiroData[i][j] = parseInt(attr[j]);
				else if(j == 3)
					list.spiroData[i][j] = attr[j];
				else if(j == 5||j == 6||j == 7)
					list.spiroData[i][j] = (parseFloat(attr[j])).toFixed(2);
			}
				
		}
	}
	list.start();
}
function updateURL(){
	var str = "";

	for(var i = 0; i<list.spiroData.length; i++){

		for(var j = 0; j<list.spiroData[i].length; j++){
			str += list.spiroData[i][j];
			if(j!=list.spiroData[i].length-1)
				str += "**";
			
		}
		if(i!=list.spiroData.length-1)
			str+="!!"
		
	}

	HashSearch.set('spiro', str);

}
//http://localhost:8888/#spiro1=[0,0,0,,3]

/*
// Retrieve title from URL or default one
if(HashSearch.keyExists("title") && HashSearch.get("title").length>=0) {
	d3.select(".title").text(HashSearch.get("title"));
} 
else {
	d3.select(".title").text(this.title);
	HashSearch.set("title", this.title);
}




this.spiroData = [[105,75,20,"#000",20,20,100,700,0], 
					  [105,75,30,"#000",30,10,100,700,0],
					  [105,75,40,"#000",40,5,100,700,0]];
*/


