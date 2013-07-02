var express = require('express'),
	http = require('http'),
	util = require('util'),
    app = express();
var Forecast = require('forecast.io');

app.use(express.static(__dirname+'/static'));
app.use(express.bodyParser());
app.use(express.cookieParser());


app.get('/get/weather', function(req, res){
	
	var options = {
		APIKey: "408245c13b1d2aba9323d81ef6de241f"
	},
	forecast = new Forecast(options);

	forecast.get(req.query.lat, req.query.lng, function (err, r, data) {

		console.log('data: ' + util.inspect(data));

		res.send({
			err : null,
			daily : util.inspect(data.daily.data),
			hourly : util.inspect(data.hourly.data),
			data : data
		})
	});

})


app.listen(8888);