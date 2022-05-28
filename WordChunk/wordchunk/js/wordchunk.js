$(function() {

    var slideIndex = 1;
    var alarm = new Audio("./media/correct.wav");
    var alarm2 = new Audio("./media/bounceBack.mp3");

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
 
        drakeSentence.containers = [$('.wordBox').eq(slideIndex-1)[0], $('.blank').eq(slideIndex-1)[0]];
    }


    // Drag function
    var drakeSentence;
    // var container = $('.textBox').toArray();
    // container = container.concat($('.wordBox').toArray());

    drakeSentence = dragula([],
    {
      copy: function (el, source) {
        return source.classList.contains('wordBox');
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
        return source.className != 'blank'; 
      }
    }
    ).on('drag',function(el, source) {
        // $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
        // var currentAnswer=el.getAttribute("data-order");
        // source.querySelector('span[data-order="'+currentAnswer+'"]').style.display="none";
        // el.style.display="none";
        // $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
    }).on('drop',function(el,target,source,sibling){
        if(target.className == 'blank')
        {
            var rightAnswer=target.parentElement.querySelector("img").getAttribute("data-sign"), 
                currentAnswer=el.getAttribute("data-order");

            if(rightAnswer == currentAnswer)
            {
                console.log("You're right");
                // source.querySelector('span[data-order="'+currentAnswer+'"]').style.display="none";
                el.style.display="block";
                source.parentElement.querySelector(".check").style.display="block";
                source.parentElement.querySelector(".check").classList.add('animated', 'bounceInDown', 'fast');
                drakeSentence.containers = [];
                alarm.play();
            }
            else
            {
                source.querySelector('span[data-order="'+currentAnswer+'"]').style.display="block";
                el.remove();
                alarm2.play();
                source.parentElement.querySelector(".check").style.display="none";
            }
                    
        }

    }).on('cancel',function(el, container, source) {
        var currentAnswer=el.getAttribute("data-order");
        source.querySelector('span[data-order="'+currentAnswer+'"]').style.display="block";
    }).on('over',function(el, container, source) {
        if(container.className == "blank")
        {
            // $(".gu-mirror").css({"color":"black","background-color":"transparent","border-radius":"none"});
            $(".textBox").css({"border": "solid 2px rgba(110,201,209,0.6)","box-shadow":"0px 2px 11px 3px #6EC9D1"});
        }
        else
        {
            // $(".gu-mirror").css({"color":"white","background-color":"#6ec9d1","border-radius":"8px"});
            $(".textBox").css({"border": "dashed 2px #979797","box-shadow":"none"});
        }
        
        var currentAnswer=el.getAttribute("data-order");
        source.querySelector('span[data-order="'+currentAnswer+'"]').style.display="none";
        el.style.display="none";
        $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
    }).on('out',function(el, container, source){
        $(".textBox").css({"border": "dashed 2px #979797","box-shadow":"none"});
        // $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
        // $(".gu-mirror").css({"color":"white","background-color":"#6ec9d1","border-radius":"8px"});
    })

    //init
    showSlides(slideIndex);

})