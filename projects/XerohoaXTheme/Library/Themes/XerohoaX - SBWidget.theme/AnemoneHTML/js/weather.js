var weather = {
	refreshEvery: config.weather.refreshEvery,
	tempUnit: config.weather.tempUnit,
	locale: config.weather.locale,
	geoLocation: config.weather.geoLocation
};

weather.handleWeather = function() {
	var result = "";
	$.simpleWeather({
		location: this.locale,
		woeid: this.geoLocation,
		unit: this.tempUnit,
		success: function(weather) {
			result = weather.temp + '&deg;' + '&nbsp;' + weather.currently + '&nbsp;&uarr;' + weather.high + '&deg;' + '&nbsp;' + '&darr;' + weather.low + '&deg;';
			$('#weatherPanel').html(result);
		},
		error: function(error) {
			$('#weatherPanel').html('error');
		}
	});
};

weather.init = function() {
	this.handleWeather();

	this.intervalId = setInterval(function () {
		this.handleWeather();
	}.bind(this), this.refreshEvery);
};