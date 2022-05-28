$(function() {

    var slideIndex = 1;
    var wordNumber;
    var wordTable = Array($('.slides').length).fill(false);
    var alarm = new Audio("./media/correct.wav");

	$(document).delegate('#prev', 'click', function(event){
		showSlides(slideIndex-=1);
	})
	$(document).delegate('#next', 'click', function(event){
		showSlides(slideIndex+=1);
	})

    function showSlides(n) {

        var max = $('.slides').length;
        $('.slides').hide();

        if (n > max)
        	slideIndex = 1;
        if (n < 1)
            slideIndex = max;

        // shuffle the showing
        let shuffleNumber = $("#slide"+slideIndex).find(".snippet").length;
        let shuffleArray = Array(shuffleNumber);
        for(let i=0;i<shuffleNumber;i++)
        {
            shuffleArray[i]=i;
        }
        shuffle(shuffleArray);
        for(let i=0;i<shuffleNumber;i++)
        {
            $("#slide"+slideIndex).find(".snippet").eq(i).css("order",shuffleArray[i]);
        }
        

        $('#slide'+slideIndex).show();
        $("#tagNumber").text(slideIndex);

        wordNumber = $('.wordBox').eq(slideIndex-1).find(".snippet").length;  
        drakeSentence.containers = wordTable[slideIndex-1] ? [] : [$('.wordBox').eq(slideIndex-1)[0], $('.textBox').eq(slideIndex-1)[0]];
    }


    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }


    // Drag function
    var drakeSentence;
    // var container = $('.textBox').toArray();
    // container = container.concat($('.wordBox').toArray());

    drakeSentence = dragula([],
    {
      // copy: function (el, source) {
      //   return el.classList.contains('snippet');
      // },
      isContainer: function (el) {
        return false;
      },
      direction: 'horizontal',
      removeOnSpill: false,
      accepts: function (el, target) {
        return true;
      }
      // moves: function (el, source, handle) {
      //   return el.className != 'background' && el.className != 'boyDress'; 
      // }
    }
    ).on('drop',function(el,target,source,sibling){
        if(target.classList.contains('textBox') && target.querySelectorAll(".snippet").length == wordNumber)
        {
            var rightAnswer="", 
                currentAnswer="";
            for(let i=1;i<wordNumber+1;i++)
            {
                rightAnswer= rightAnswer + i.toString();
                currentAnswer = currentAnswer + target.querySelectorAll(".snippet")[i-1].getAttribute("data-order");
            }

            if(rightAnswer == currentAnswer)
            {
                console.log("You're right");
                source.parentElement.querySelector(".check").style.display="block";
                source.parentElement.querySelector(".check").classList.add('animated', 'bounceInDown', 'fast');
                drakeSentence.containers=[];
                wordTable[slideIndex-1] = true;
                alarm.play();
            }

            // special case
            if(slideIndex == 4 && currentAnswer == "15623478")
            {
                console.log("You're right");
                source.parentElement.querySelector(".check").style.display="block";
                source.parentElement.querySelector(".check").classList.add('animated', 'bounceInDown', 'fast');
                drakeSentence.containers=[];
                wordTable[slideIndex-1] = true;
                alarm.play();
            }
            if(slideIndex == 6 && currentAnswer == "143256")
            {
                console.log("You're right");
                source.parentElement.querySelector(".check").style.display="block";
                source.parentElement.querySelector(".check").classList.add('animated', 'bounceInDown', 'fast');
                drakeSentence.containers=[];
                wordTable[slideIndex-1] = true;
                alarm.play();
            }                 
        }
    }).on('over',function(el, container, source) {
        if(container.className == "textBox")
            $(".textBox").css({"border": "solid 2px rgba(110,201,209,0.6)","box-shadow":"0px 2px 11px 3px #6EC9D1"});
        else
            $(".textBox").css({"border": "dashed 2px #979797","box-shadow":"none"});

        $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
    }).on('out',function(el, container, source){
        $(".textBox").css({"border": "dashed 2px #979797","box-shadow":"none"});
        $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
    })


    //init
    showSlides(slideIndex);

})