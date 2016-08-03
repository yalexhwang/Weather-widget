

$(document).ready(function() {
	var apiKey = 'fc5b1e382f14cc49eefbfb157e5362e0';
	var canvas = document.getElementById('current-temp');
	var ctx = canvas.getContext('2d');
	var currentTemp = 0;
	var daysObjArr = [];

	$('.weather-form').submit(function() {
		// keep the form from submitting
		event.preventDefault();

		var cityText = $('#search').val();
		var url = "http://api.openweathermap.org/data/2.5/forecast/city?q=" + cityText + "&units=imperial&APPID=" + apiKey;
		var url16d = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityText + "&units=imperial&APPID=" + apiKey;
		var url3hrs = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityText + "&units=imperial&APPID=" + apiKey;

		$.getJSON(url, function(weatherData) {
			console.log(weatherData);
			currentTemp = weatherData.list[0].main.temp;
			animate(0);

			var currentCity = weatherData.city.name;
			var country = weatherData.city.country;
			$('.current-title').prepend("<h2>" + currentCity + "</br><small>" + country + "</small></h2>")
			var now = weatherData.list[0].dt_txt;
			var weatherNow = weatherData.list[0].weather[0].main;
			$('.current-title-info').html("<h4>" + weatherNow);
			$('.current-info').prepend("<h6>" + now + "</h6>");

			makeCurrentTable(weatherData);
		
		});

		// $.getJSON(url3hrs, function(weatherData) {
		// 	console.log(weatherData.list[0].dt_txt);
		// 	console.log(weatherData.list[0].main.temp);
		// 	var dtTxt = [];
		// 	var mainTemp = [];
		// 	for (var i = 0; i < weatherData.list.length; i++) {
		// 		dtTxt.push(weatherData.list[i].dt_txt);
		// 		mainTemp.push(weatherData.list[i].main.temp);
		// 	}
		// 	console.log(dtTxt);
		// 	console.log(mainTemp);
		// });

		$.getJSON(url16d, function(weatherData) {
			console.log(weatherData.list);
			console.log(weatherData);

			for (var i = 0; i < weatherData.list.length; i++) {
				var rawDate = weatherData.list[i].dt;
				var date = new Date(rawDate * 1000);
				date = date.toISOString().slice(0, 10);
				var morningTemp = weatherData.list[i].temp.morn;
				var dayTemp = weatherData.list[i].temp.day;
				var eveTemp = weatherData.list[i].temp.eve;
				var nightTemp = weatherData.list[i].temp.night;
				var humidity = weatherData.list[i].humidity;
				var weather = weatherData.list[i].weather[0].main;
				var day = new ForecastDays(date, morningTemp, dayTemp, eveTemp, nightTemp, humidity, weather);
				daysObjArr.push(day);
			}
			makeForecast();
			$('.main-right').prepend('<h4>Next Days</h4>');
		});
	});

	function animate(current) {	
		var tempColor = '#ff0000';
		ctx.strokeStyle = tempColor;
		ctx.lineWidth = 10;
		// Make the canvas empty 
		ctx.clearRect(0, 0, 350, 200);

		ctx.beginPath();
		ctx.arc(105, 100, 55, 0, Math.PI * 2);
		ctx.fillStyle = "#ebebeb";
		ctx.fill();

		ctx.beginPath();
		ctx.font = "30px Arial";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(currentTemp, 105, 110);
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(105, 100, 60, Math.PI * 1.5, (current / 100) * Math.PI * 2 + (Math.PI * 1.5));
		ctx.stroke();
		current++;
		if (current < currentTemp) {
			requestAnimationFrame(function() {
				animate(current);
			})
		}
	}

	function makeCurrentTable(weatherDataToday) {
		var maxTemp = weatherDataToday.list[0].main.temp_max;
		var minTemp = weatherDataToday.list[0].main.temp_min;
		var humidity = weatherDataToday.list[0].main.humidity;
		var clouds = weatherDataToday.list[0].weather[0].description;
		var windDeg = weatherDataToday.list[0].wind.deg;
		var windSpeed = weatherDataToday.list[0].wind.speed;

		$('#table').toggle();
		$('#min').text(minTemp);
		$('#max').text(maxTemp);
		$('#clouds').text(clouds);
		$('#humidity').text(humidity);
		$('#wind').text(windDeg + " " + windSpeed);
	}

	function ForecastDays(date, morning, day, evening, night, humidity, weather) {
		this.date = date;
		this.morning = morning;
		this.day = day;
		this.evening = evening;
		this.night = night;
		this.humidity = humidity;
		this.weather = weather;
	}

	function makeForecast() {
		$('.forecast-days-board').toggle();
		console.log(daysObjArr);

		for (var i = 0; i < 7; i++) {
			var date = daysObjArr[i].date;
			var morning = daysObjArr[i].morning;
			var day = daysObjArr[i].day;
			var evening = daysObjArr[i].evening;
			var night = daysObjArr[i].night;
			var humidity = daysObjArr[i].humidity;
			var weather = daysObjArr[i].weather;
			$('.forecast-day:eq(0) > weather').text(weather);
			$('.forecast-day:eq(0) > weather').text(weather);
			$('.forecast-day:eq(0) > weather').text(weather);
			$('.forecast-day:eq(0) > weather').text(weather);
			$('.forecast-day:eq(0) > weather').text(weather);
			$('.forecast-day:eq(0) > weather').text(weather);
		}

	}




});




