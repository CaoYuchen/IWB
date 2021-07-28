$(function() {
//initiate state
$('#positionA0, #positionB0').show();
$('#trackA1, #trackB1').addClass('forward');

//reset button
$(document).delegate('#reset', 'click', function() {
    $('.player').hide();
    $('#positionA0, #positionB0').show();
    $('.track').removeClass('forward');
    $('.track').removeClass('backward');
    $('#trackA1, #trackB1').addClass('forward');

})


var index, number, prefix, player;
//forward function
$(document).delegate('.forward', 'click', function() {
	index = $(this).attr('id');
	number = Number(index[index.length-1]);
	prefix = index.substring(0,index.length-1);
	player = prefix.replace('track','position');
	// console.log(prefix);

	if(number < 6)
	{
		$('#'+player+(number-1)).hide();
		$('#'+player+(number)).show();
		$('#'+prefix+(number)).removeClass('forward');
		$('#'+prefix+(number+1)).addClass('forward');
		$('#'+prefix+(number-1)).addClass('backward');
		if(number>1)
			$('#'+prefix+(number-2)).removeClass('backward');
	}

})


//backward function
$(document).delegate('.backward', 'click', function() {
	index = $(this).attr('id');
	number = Number(index[index.length-1]);
	prefix = index.substring(0,index.length-1);
	player = prefix.replace('track','position');
	// console.log(prefix);

	if(number > -1)
	{
		$('#'+player+(number+1)).hide();
		$('#'+player+(number)).show();
		$('#'+prefix+(number)).removeClass('backward');
		$('#'+prefix+(number-1)).addClass('backward');
		$('#'+prefix+(number+1)).addClass('forward');
		if(number < 4)
			$('#'+prefix+(number+2)).removeClass('forward');
	}
})



})

