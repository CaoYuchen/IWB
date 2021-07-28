$(function() {
	
	var interval;
	var lightFlag = false;

	$(document).delegate('#play', 'click', function(event){
		if(!lightFlag){
		
			lightFlag = true;
			var duration=50;
			var iteration = 6;
			$('.light').attr('src','./media/LightOff.png');
			$('.animation').hide();
			var stop = Math.floor(Math.random() * 6) + 1;

			bulb();
			
		}

		function bulb()
		{
			var counter = 1;
			var max = 6;
			interval = setInterval(function(){

				//light up bulb in order
				if(counter == 1)
				{
					$('#light'+1).attr('src','./media/LightOn.png');
					$('#light'+max).attr('src','./media/LightOff.png');
				}
				else
				{	
					$('#light'+counter).attr('src','./media/LightOn.png');
					$('#light'+(counter-1)).attr('src','./media/LightOff.png');
				}
				
				// stop at random point
				if(iteration == 1 && counter == stop)
				{
					clearInterval(interval);
					lightFlag = false;
					
					// console.log(counter);
					return setTimeout(function(){showAnimate(stop)},400);
				}

				//reset cycle in lower speed
				counter++;
				if(counter>max)
				{
					counter = 1;
					duration+=66;
					clearInterval(interval);
					iteration--;
					bulb();
				}
			},duration);
		}

		function showAnimate(number)
		{
			var image = new Image();
			image.src = $('#animation'+number).attr('src');
			$('#animation'+number).attr('src',image.src);
			$('#default').hide();
			$('#animation'+number).show();
		}
		
	})



})

