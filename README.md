# Weather Widget
In-class project at Digital Crafts, practice consuming an API: weather information display with animation

### Technologies & Frameworks 
HTML, CSS, Bootstrap, JavaScript, jQuery, Open Weather API

### Note
Animated temparature display using HTML Canvas
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
