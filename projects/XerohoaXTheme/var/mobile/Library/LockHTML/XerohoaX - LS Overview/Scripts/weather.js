// Docs at http://simpleweatherjs.com
$(document).ready(function() {
  $.simpleWeather({
    //location: 'Austin, TX',
    woeid: woeid,
    unit: unit,
    success: function(weather) {
      degs = weather.temp+'&deg;'+weather.units.temp;
      weth = weather.currently;
	 
      //$("#weather").html(degs+" "+weth);
    },
    error: function(error) {
	  //$("#weather").text('<p>'+error+'</p>');
	  weth = "error";
    }
  });
});