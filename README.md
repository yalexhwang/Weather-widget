## Weather widget
Practice using an API: a weather app pulling data from Open Weather API. 
### Technologies & Frameworks 
HTML, CSS, Bootstrap, JavaScript, jQuery
### Note
Used Canvas to animate the temperature display 
```javascript
function animate(current) {	
		var tempColor = '#ff0000';
		ctx.strokeStyle = tempColor;
		ctx.lineWidth = 10;
		// Make the canvas empty 
		ctx.clearRect(0, 0, 350, 200);

		ctx.beginPath();
		ctx.arc(130, 90, 55, 0, Math.PI * 2);
		ctx.fillStyle = "#ebebeb";
		ctx.fill();

		ctx.beginPath();
		ctx.font = "30px Arial";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(currentTemp, 130, 100);
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(130, 90, 60, Math.PI * 1.5, (current / 100) * Math.PI * 2 + (Math.PI * 1.5));
		ctx.stroke();
		current++;
		if (current < currentTemp) {
			requestAnimationFrame(function() {
				animate(current);
			})
		}
	}
 ```
