$(function() {

    var slideIndex = 1;
    var alarm = new Audio("./media/flip.wav");
    showSlides(slideIndex);

    var answerTable = ["Two green eyes","One neck","One big mouth","Two small hands","One blue eye",
    "One pink nose","Two long legs","Long blond hair","Eight hairs","Two small ears","Six pink hands","Long brown hair"];

    $(".card").flip();

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
        // $('#tag').attr('src','./media/' + slideIndex + '.svg');
        $("#tagNumber").text(slideIndex);
    }

    $(".card").click(function() {
        alarm.play();
        let index = $(this).parent(),
            maxNumber = $(this).parent().find(".back").length;
        setTimeout(function(){
            let number = index.find(".back").filter(function() {
                return $(this).css("z-index") === "1";
            }).length;
            if(number==maxNumber)
            {
                console.log("flip all");
                // index.parent().find(".answerBox").find("span").text(answerTable[slideIndex-1]);
            }
            else
            {
                index.parent().find(".answerBox").find("span").text("Answer");
            }
        },200);
    })

    $(".answerBox").click(function() {
        if($(this).find("span").text() == "Answer")
        {
            alarm.play();
        }
        $(this).find("span").text(answerTable[slideIndex-1]);
        $(this).parent().find(".card").flip(true);
    })

})