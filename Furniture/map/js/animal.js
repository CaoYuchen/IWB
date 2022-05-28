$(function() {

    var slideIndex = 1;
    showSlides(slideIndex);

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

})