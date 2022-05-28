
$(function() {

	var front = ['b', 'c', 'd', 'l', 'p', 'r', 's'];
	var middle = ['a', 'e', 'i', 'o', 'u'];
	var end = ['g', 'x', 't', 'n', 'd'];

	var library = ['pig','leg','bag','big','box','cat','dog','fox','pen','red','run','sad'];
	var correct = [false,false,false,false,false,false,false,false,false,false,false,false];
    maxNumber=3;
    var alarm = new Audio("./Spell/media/rightSound.mp3");

	shuffleArray(front);
	shuffleArray(middle);
	shuffleArray(end);

    var cardfront = new Array(7);
    var cardmiddle = new Array(5);
    var cardend = new Array(5);

    arrangeCard();
    
    // console.log(cardfront);
    // console.log(cardmiddle);
    // console.log(cardend);

	$('.card-front.up').attr('src','./Spell/media/letter/' + cardfront[0][0] + '.png');
	$('.card-middle.up').attr('src','./Spell/media/letter/' + cardmiddle[0][0] + '.png');
	$('.card-end.up').attr('src','./Spell/media/letter/' + cardend[0][0] + '.png');

    $('.card-front.down').attr('src','./Spell/media/letter/' + cardfront[0][1] + '.png');
    $('.card-middle.down').attr('src','./Spell/media/letter/' + cardmiddle[0][1] + '.png');
    $('.card-end.down').attr('src','./Spell/media/letter/' + cardend[0][1] + '.png');


	// SlideWindow
    var firstFlag=true;
    var slideIndex = 1;
    showSlides(slideIndex);

    $(document).delegate('#prev', 'click', function(event) {
        showSlides(slideIndex -= 1);
    })
    $(document).delegate('#next', 'click', function(event) {
        showSlides(slideIndex += 1);
    })

    function showSlides(n) {

        var max = $('.slides').length;
        $('.slides').hide();

        if (n > max)
            slideIndex = 1;
        if (n < 1)
            slideIndex = max;

        $('#slide' + slideIndex).show();

        //show the correct answer when it has been answered
        if(correct[slideIndex-1]){
    		$('.card-front.up').attr('src','./Spell/media/letter/' + library[slideIndex-1].charAt(0) + '.png');
			$('.card-middle.up').attr('src','./Spell/media/letter/' + library[slideIndex-1].charAt(1) + '.png');
			$('.card-end.up').attr('src','./Spell/media/letter/' + library[slideIndex-1].charAt(2) + '.png');

            numberF = cardfront[slideIndex-1].indexOf(library[slideIndex-1].charAt(0));
            numberM = cardmiddle[slideIndex-1].indexOf(library[slideIndex-1].charAt(1));
            numberE = cardend[slideIndex-1].indexOf(library[slideIndex-1].charAt(2));

            if (numberF == maxNumber-1)
                $('.card-front.down').attr('src','./Spell/media/letter/' + cardfront[slideIndex-1][0] + '.png');
            else
                $('.card-front.down').attr('src','./Spell/media/letter/' + cardfront[slideIndex-1][numberF+1] + '.png');
            if (numberM == maxNumber-1)
                $('.card-middle.down').attr('src','./Spell/media/letter/' + cardmiddle[slideIndex-1][0] + '.png');
            else
                $('.card-middle.down').attr('src','./Spell/media/letter/' + cardmiddle[slideIndex-1][numberM+1] + '.png');
            if (numberE == maxNumber-1)
                $('.card-end.down').attr('src','./Spell/media/letter/' + cardend[slideIndex-1][0] + '.png');
            else
                $('.card-end.down').attr('src','./Spell/media/letter/' + cardend[slideIndex-1][numberE+1] + '.png');
        }

        else if(!firstFlag){
	        numberF = Math.floor(Math.random() * maxNumber);
	        numberM = Math.floor(Math.random() * maxNumber);
	        numberE = Math.floor(Math.random() * maxNumber);
			$('.card-front.up').attr('src','./Spell/media/letter/' + cardfront[slideIndex-1][numberF] + '.png');
			$('.card-middle.up').attr('src','./Spell/media/letter/' + cardmiddle[slideIndex-1][numberM] + '.png');
			$('.card-end.up').attr('src','./Spell/media/letter/' + cardend[slideIndex-1][numberE] + '.png');
            // change the down card
            if (numberF == maxNumber-1)
             	$('.card-front.down').attr('src','./Spell/media/letter/' + cardfront[slideIndex-1][0] + '.png');
            else
                $('.card-front.down').attr('src','./Spell/media/letter/' + cardfront[slideIndex-1][numberF+1] + '.png');
            if (numberM == maxNumber-1)
                $('.card-middle.down').attr('src','./Spell/media/letter/' + cardmiddle[slideIndex-1][0] + '.png');
            else
                $('.card-middle.down').attr('src','./Spell/media/letter/' + cardmiddle[slideIndex-1][numberM+1] + '.png');
            if (numberE == maxNumber-1)
                $('.card-end.down').attr('src','./Spell/media/letter/' + cardend[slideIndex-1][0] + '.png');
            else
                $('.card-end.down').attr('src','./Spell/media/letter/' + cardend[slideIndex-1][numberE+1] + '.png');
        }
        else{
            firstFlag = false;
        }

    }



	// SwitchCard

    var numberF=0,
    	numberM=0,
    	numberE=0;

    // $(document).delegate('#btn1', 'click', function() {
    $('#btn1').click(function(){
        switchSlides("front");
    })
    // $(document).delegate('#btn2', 'click', function() {
    $('#btn2').click(function(){
        switchSlides("middle");
    })
    // $(document).delegate('#btn3', 'click', function() {
    $('#btn3').click(function(){
        switchSlides("end");
    })


    function switchSlides(tag) {

    	//switch cards by different buttons
        if (tag == "front") {
        	numberF++;
        	if(numberF>maxNumber-1)
        		numberF=0;     	
        	// $('.card-front').attr('src','./Spell/media/letter/' + front[numberF] + '.png');
            $('#frontA').toggleClass('up down');
            $('#frontB').toggleClass('up down');
           

           $('#btn1').attr('disabled',true);

           setTimeout(function(){
            if (numberF == maxNumber-1)
                $('.card-front.down').attr('src','./Spell/media/letter/' + cardfront[slideIndex-1][0] + '.png');
            else
                $('.card-front.down').attr('src','./Spell/media/letter/' + cardfront[slideIndex-1][numberF+1] + '.png');
            
            $('#btn1').attr('disabled',false);
        },1000);
           
          
            
            // animateCSS('.card-front','flipInX',function(){$('#btn1').attr('disabled',false);});
        } 
        else if (tag == "middle") {
        	numberM++;
        	if(numberM>maxNumber-1)
        		numberM=0;      
            // $('.card-middle').attr('src','./Spell/media/letter/' + middle[numberM] + '.png');
            $('#middleA').toggleClass('up down');
            $('#middleB').toggleClass('up down');
           
            $('#btn2').attr('disabled',true);

            setTimeout(function(){
            if (numberM == maxNumber-1)
                $('.card-middle.down').attr('src','./Spell/media/letter/' + cardmiddle[slideIndex-1][0] + '.png');
            else
                $('.card-middle.down').attr('src','./Spell/media/letter/' + cardmiddle[slideIndex-1][numberM+1] + '.png');
            
            $('#btn2').attr('disabled',false);
            },1000);
            
            // animateCSS('.card-middle','flipInX',function(){$('#btn2').attr('disabled',false);});
        	
        } 
        else if (tag == "end") {
        	numberE++;
        	if(numberE>maxNumber-1)
        		numberE=0;
        	// $('.card-end').attr('src','./Spell/media/letter/' + end[numberE] + '.png');
            $('#endA').toggleClass('up down');
            $('#endB').toggleClass('up down');
    
            $('#btn3').attr('disabled',true);

            setTimeout(function(){
            if (numberE == maxNumber-1)
                $('.card-end.down').attr('src','./Spell/media/letter/' + cardend[slideIndex-1][0] + '.png');
            else
                $('.card-end.down').attr('src','./Spell/media/letter/' + cardend[slideIndex-1][numberE+1] + '.png');
            
            $('#btn3').attr('disabled',false);
            }, 1000);
            
            
            // animateCSS('.card-end','flipInX',function(){$('#btn3').attr('disabled',false);});
        }
    
        //show animate when it's correct
        if(library[slideIndex-1] == (cardfront[slideIndex-1][numberF] + cardmiddle[slideIndex-1][numberM] + cardend[slideIndex-1][numberE]))
        {
        	correct[slideIndex-1] = true;
        	// console.log("you are right");
            setTimeout(function(){
                alarm.play();
                animateCSS('#card1','bounceOut');
                animateCSS('#card2','bounceOut');
                animateCSS('#card3','bounceOut');

                setTimeout(function(){
                $('#card1').removeClass('bounceOut');
                $('#card2').removeClass('bounceOut');
                $('#card3').removeClass('bounceOut');                
                },1000);                
            },1200);



        }

    }


	// Durstenfeld shuffle algorithm.
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	}


	// Animation
	function animateCSS(element, animationName, callback) {
	    const node = document.querySelector(element);
	    node.classList.add('animated', animationName);

	    function handleAnimationEnd() {
	        node.classList.remove('animated', animationName);
            // console.log("delete");
	        node.removeEventListener('animationend', handleAnimationEnd);

	        if (typeof callback === 'function') callback();
	    }

	    node.addEventListener('animationend', handleAnimationEnd);
	}




    function arrangeCard(){
        for(var i=0;i<library.length;i++)
        {
            var cardtemp = new Array(3);
            cardtemp[0]=library[i][0];

            do{
                cardtemp[1]= front[Math.floor(Math.random() * front.length)];
            }
            while(cardtemp[0] == cardtemp[1])

            do{
                cardtemp[2]= front[Math.floor(Math.random() * front.length)];
            }
            while(cardtemp[0] == cardtemp[2] || cardtemp[1] == cardtemp[2])
            
            cardfront[i] = new Array(3);
            cardfront[i]=cardtemp;
            shuffleArray(cardfront[i]);
        }
        
        for(var i=0;i<library.length;i++)
        {
            var cardtemp = new Array(3);
            cardtemp[0]=library[i][1];

            do{
                cardtemp[1]= middle[Math.floor(Math.random() * middle.length)];
            }
            while(cardtemp[0] == cardtemp[1])
            do{
                cardtemp[2]= middle[Math.floor(Math.random() * middle.length)]; 
            }
            while(cardtemp[0] == cardtemp[2] || cardtemp[1] == cardtemp[2])
            cardmiddle[i] = new Array(3);
            cardmiddle[i]=cardtemp;
            shuffleArray(cardmiddle[i]);   
        }
        
        for(var i=0;i<library.length;i++)
        {
            var cardtemp = new Array(3);
            cardtemp[0]=library[i][2];

            do{
                cardtemp[1]= end[Math.floor(Math.random() * end.length)];
            }
            while(cardtemp[0] == cardtemp[1])
            do{
                cardtemp[2]= end[Math.floor(Math.random() * end.length)];
            }
            while(cardtemp[0] == cardtemp[2] || cardtemp[1] == cardtemp[2])
            cardend[i] = new Array(3);
            cardend[i]=cardtemp;
            shuffleArray(cardend[i]); 
        }
    }


    // flip animation
    // function flipTo(digit, curr, prev){
    //     digit.attr('src', prev);
    //     digit.find('.back, .under').attr('src', curr);
    //     digit.find('.flap').css('display', 'inline-block');
    //     setTimeout(function(){
    //         digit.attr('src',curr);
    //         digit.find('.flap').css('display', 'none');
    //     }, 350);
    // }


})
