$(function() {
	
	var interval;
	var lightFlag = false;
	var lights = [1,2,3,4,5,6];
	shuffleArray(lights);
	var alarm = new Audio("./media/lightSound.mp3");
	alarm.loop = true;

	$(document).delegate('#play', 'click', function(event){
		if(!lightFlag){
		
			lightFlag = true;
			var duration=50;
			var iteration = 6;
			$('.light').attr('src','./media/LightOff.png');
			$('.animation').hide();
			console.log(lights.length);
			var index = Math.floor(Math.random() * lights.length);
			var stop = lights[index];
			lights.splice(index,1);
			bulb();
			setTimeout(function(){
				alarm.play();
			},600);
			

			if(lights.length<1)
			{
				lights=[1,2,3,4,5,6];
				shuffleArray(lights);
			}
			
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
					
					alarm.pause();
        			alarm.currentTime = 0;
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

			var width = - $('#animation'+number).width()/2;
			$('#animateBox').css('margin-left',width);

			$('#default').hide();
			$('#animation'+number).show();
		}
		
	})

		// Durstenfeld shuffle algorithm.
		function shuffleArray(array) {
		    for (var i = array.length - 1; i > 0; i--) {
		        var j = Math.floor(Math.random() * (i + 1));
		        var temp = array[i];
		        array[i] = array[j];
		        array[j] = temp;
		    }
		}

})

