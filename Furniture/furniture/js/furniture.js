$(function() {

    var slideIndex = 1;
    var alarm = new Audio("./media/bounceBack.mp3");
    var alarm2 = new Audio("./media/correct.wav");

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

        $('#slide'+slideIndex).show();
        $("#tagNumber").text(slideIndex);
 
        drakeSentence.containers = [$('.furnitureBox').eq(slideIndex-1)[0], $('.roomLeft').eq(slideIndex-1)[0], $('.roomRight').eq(slideIndex-1)[0]];
    }


    // Drag function
    var drakeSentence;
    // var container = $('.textBox').toArray();
    // container = container.concat($('.wordBox').toArray());

    drakeSentence = dragula([],
    {
      copy: function (el, source) {
        return source.classList.contains('furnitureBox');
      },
      isContainer: function (el) {
        return false;
      },
      direction: 'horizontal',
      removeOnSpill: true,
      accepts: function (el, target) {
        return true;
      },
      moves: function (el, source, handle) {
        return source.className != 'roomLeft' && source.className != 'roomRight'; 
      }
    }
    ).on('drop',function(el,target,source,sibling){
        if(target.classList.contains('roomLeft') || target.classList.contains('roomRight'))
        {
            el.remove();
            var furnitureOn=target.querySelectorAll(".furnitureOn"),
                rightAnswer = Array(furnitureOn.length), 
                currentAnswer=el.getAttribute("data-sign");
                
            for(let i=0;i<furnitureOn.length;i++)
            {
                rightAnswer[i]= furnitureOn[i].getAttribute("data-sign");
            }

            if(rightAnswer.includes(currentAnswer))
            {
                console.log("You're right");
                source.querySelector('img[data-sign="'+currentAnswer+'"]').style.display="none";
                target.querySelector('img[data-sign="'+currentAnswer+'"]').style.display="block";
                // console.log(target.querySelector('img[data-sign="'+currentAnswer+'"]'));

                // if()
                if($(target).find(".furnitureOn").filter(":hidden").length <=0)
                {
                	target.querySelector(".check").style.display="block";
                	target.querySelector(".check").classList.add('animated', 'bounceInDown', 'fast');
                }
                alarm2.play();
                
            }
            else
            {
                source.querySelector('img[data-sign="'+currentAnswer+'"]').style.display="block";
                alarm.play();
            }
                    
        }

    }).on('cancel',function(el, container, source) {
        var currentAnswer=el.getAttribute("data-sign");
        source.querySelector('img[data-sign="'+currentAnswer+'"]').style.display="block";
    }).on('over',function(el, container, source) {
        if(container.className == "roomLeft")
            $(".roomLeft").css({"filter":"brightness(108%) saturate(120%)"});
        else
            $(".roomLeft").css({"filter":"brightness(100%)"});
        if(container.className == "roomRight")
            $(".roomRight").css({"filter":"brightness(108%) saturate(120%)"});
        else
            $(".roomRight").css({"filter":"brightness(100%)"});

        var currentAnswer=el.getAttribute("data-sign");
        source.querySelector('img[data-sign="'+currentAnswer+'"]').style.display="none";
    }).on('out',function(el, container, source){
        $(".roomLeft, .roomRight").css({"filter":"brightness(100%)"});
    })

    //init
    showSlides(slideIndex);

})