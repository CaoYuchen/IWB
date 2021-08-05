$(function() {
	
	var backgrounds = [
						"GreyBackground.jpg",
						"color1.jpg",
						"color2.jpg",
						"color3.jpg",
						"color4.jpg",
						"color5.jpg"
						];
	// init of cover page
	$('.Hbutton, .Mbutton').hide();
	$('.previous, .countNumber').css("visibility","hidden");

	// TopButton
	var preButton = "topButton1";
	var buttonPath = "./media/buttons/Sections/1_gray.svg";
	$('.topButton').click(function(e){
    	e.preventDefault();

    	// change button icon
    	$("#"+preButton).find('img').attr('src',buttonPath);
    	buttonSrc = $(this).find('img').attr('src').replace("gray","white");
    	$(this).find('img').attr('src',buttonSrc);

    	preNumber = Number(preButton.match(/\d+/)[0]);

    	preButton = $(this).attr('id'); 
    	curNumber = Number(preButton.match(/\d+/)[0]);

    	buttonPath = buttonPath.replace(preNumber,curNumber);

    	// change background
    	if(curNumber == 6)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[1] +'")');
    	}
    	else if(curNumber == 7)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[0] +'")');
    	}
    	else if(curNumber == 8)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
    	}
    	else if(curNumber == 9)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[4] +'")');
    	}
    	else if(curNumber == 10)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[5] +'")');
    	}
    	else
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[0] +'")');
    	}

    	//update previous & next
		if(curNumber == 1)
		{
			$('.previous').css("visibility", "hidden");
		}
		else if(curNumber == 13)
		{
			$('.next').css("visibility", "hidden");
		}
		else{
			$('.next, .previous').css("visibility", "visible");
		}

		//update topButton
		if(curNumber == 3 || curNumber == 5 || curNumber == 12)
		{
			$('.topButton').css("visibility", "hidden");
		}
		else
		{
			$('.topButton').css("visibility", "visible");
		}

    	// update HF button & Counting Number 
		if(curNumber == 6 || curNumber == 7 || curNumber == 8)
		{			
			if(curNumber == 6)
			{
				$('.backNumber').text(aMnumber.length);
				$('.frontNumber').text(1);
				$('.countNumber').css("visibility","visible");

				upadateMHbutton(pageNumber, index, audioFlag);
			}
			else if(curNumber == 8)
			{
				$('.backNumber').text(sMnumber.length);
				$('.frontNumber').text(1);
				$('.countNumber').css("visibility","visible");

				upadateMHbutton(pageNumber, index, shapeFlag);
			}
			else
			{
				$('.countNumber').css("visibility","hidden");

				upadateMHbutton(pageNumber, index, countFlag);
			}
		}
		else
		{
			$('.Mbutton, .Hbutton').hide();
			$('.countNumber').css("visibility","hidden");
		}

    	// toggle content
    	$('.pages').removeClass("active");
    	$('#chapter'+curNumber).find("[data-value=page1]").addClass("active");

    	pauseVideo();
    })


	// countPages
	var pageNumber = [];
	var index;
	for (var i=1; i<14;i++)
	{
		pages = $('#chapter' + i +' > .pages').not('.cH, .aH, .sH');
		pageNumber = $.merge($.merge([],pageNumber),countPages(pages, pages.length, i));
	}
	var audioChapter = 6;
	var countChapter = 7;
	var shapeChapter = 8;
	var cMnumber = countPagesMH($('.cM.pages').length, countChapter,'cM');
	var cHnumber = countPagesMH($('.cH.pages').length, countChapter,'cH');
	var sMnumber = countPagesMH($('.sM.pages').length, shapeChapter,'sM');
	var sHnumber = countPagesMH($('.sH.pages').length, shapeChapter,'sH');
	var aMnumber = countPagesMH($('.aM.pages').length, audioChapter,'aM');
	var aHnumber = countPagesMH($('.aH.pages').length, audioChapter,'aH');
	
	var audioFlag = "aM";
	var countFlag = "coM";
	var shapeFlag = "sM";
	// SideButton
	var number = pageNumber.length;
	$('.next, .previous').click(function(e){
		type = $(this).attr("class");
		p1 = Number($(".active.pages").parent().attr("id").match(/\d+/)[0]);
		p2 = Number($(".active").attr("data-value").match(/\d+/)[0]);
		position = [p1,p2];
		index = getIndexOf(pageNumber,position);

		// update index
		index = updateIndex(type,pageNumber,index);

    	// change background
    	if(pageNumber[index][0] == 6)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[1] +'")');
    	}
    	else if(pageNumber[index][0] == 7)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[0] +'")');
    	}
    	else if(pageNumber[index][0] == 8)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[3] +'")');
    	}
    	else if(pageNumber[index][0] == 9)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[4] +'")');
    	}
    	else if(pageNumber[index][0] == 10)
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[5] +'")');
    	}
    	else
    	{
    		$('body').css('background-image', 'url("./media/Background/'+ backgrounds[0] +'")');
    	}

    	//update previous & next
		if(pageNumber[index][0] == 1)
		{
			$('.previous').css("visibility", "hidden");
		}
		else if(pageNumber[index][0] == 13)
		{
			$('.next').css("visibility", "hidden");
		}
		else{
			$('.next, .previous').css("visibility", "visible");
		}

		//update topButton
		if(pageNumber[index][0] == 3 || pageNumber[index][0] == 5 || pageNumber[index][0] == 12)
		{
			$('.topButton').css("visibility", "hidden");
		}
		else
		{
			$('.topButton').css("visibility", "visible");
		}

    	// update HF button & Counting Number 
		if(pageNumber[index][0] == 6 || pageNumber[index][0] == 7 || pageNumber[index][0] == 8)
		{
			if(pageNumber[index][0] == 6)
			{
				$('.backNumber').text(aMnumber.length);
				countNumber(audioFlag,index,pageNumber);
				$('.countNumber').css("visibility","visible");

				upadateMHbutton(pageNumber, index, audioFlag);
			}
			else if(pageNumber[index][0] == 8)
			{
				$('.backNumber').text(sMnumber.length);
				countNumber(shapeFlag,index,pageNumber);
				$('.countNumber').css("visibility","visible");

				upadateMHbutton(pageNumber, index, shapeFlag);
			}
			else
			{
				$('.countNumber').css("visibility","hidden");

				upadateMHbutton(pageNumber, index, countFlag);
			}
		}
		else
		{
			$('.Mbutton, .Hbutton').hide();
			$('.countNumber').css("visibility","hidden");
		}


		// toggle content
		$('.pages').removeClass("active");
		$('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").addClass("active");

		// change button icon
		curButton = "topButton"+pageNumber[index][0];
		ButtonNumber = Number(curButton.match(/\d+/)[0]);
    	if(ButtonNumber>0 && ButtonNumber<14)
    	{
    		$("#"+preButton).find('img').attr('src',buttonPath);
    		buttonSrc = $("#"+curButton).find('img').attr('src').replace("gray","white");
    		$("#"+curButton).find('img').attr('src',buttonSrc);

    		preNumber = Number(preButton.match(/\d+/)[0]);
	    	preButton = $("#"+curButton).attr('id');
	    	curNumber = Number(preButton.match(/\d+/)[0]);
	    	
	    	buttonPath = buttonPath.replace(preNumber,curNumber);
    	}

    	pauseVideo();

	})

	// HMbutton
	var curChapter;
	$('.Hbutton, .Mbutton').click(function(e){
		curPage = $('.active.pages').attr('data-value');
		curChapter = Number($('.active.pages').parent().attr('id').match(/\d+/)[0]);

		if($(this).attr('class').includes('Hbutton'))
		{
			if(curChapter==6)
			{
				audioFlag = "aH";
				curFlag = audioFlag;
				newNumber = aHnumber;
			}
			else if(curChapter==7)
			{
				countFlag = "cH";
				curFlag = countFlag;
				newNumber = cHnumber;
			}
			else if(curChapter==8)
			{
				shapeFlag = "sH";
				curFlag = shapeFlag;
				newNumber = sHnumber;
			}
		}
		else if($(this).attr('class').includes('Mbutton'))
		{
			if(curChapter==6)
			{
				audioFlag = "aM";
				curFlag = audioFlag;
				newNumber = aMnumber;
			}
			else if(curChapter==7)
			{
				countFlag = "cM";
				curFlag = countFlag;
				newNumber = cMnumber;
			}
			else if(curChapter==8)
			{
				shapeFlag = "sM";
				curFlag = shapeFlag;
				newNumber = sMnumber;
			}
		}
		

		// update page index
		if(curFlag.includes("M"))
		{
			preFlag = curFlag.replace("M","H");
		}
		else
		{
			preFlag = curFlag.replace("H","M");
		}
		//previous page
		indexStart = getIndexOf(pageNumber,[curChapter,Number($('#chapter'+curChapter).find("[data-"+preFlag+"=page1]").attr('data-value').match(/\d+/)[0])]);
		indexEnd = getIndexOf(pageNumber,[curChapter,Number($('#chapter'+curChapter).find("[data-"+preFlag+"=page"+newNumber.length+"]").attr('data-value').match(/\d+/)[0])]);
		//current page
		pageNumber = updatePageIndex(pageNumber,indexStart,indexEnd,newNumber);
		index = getIndexOf(pageNumber,[curChapter,Number($('#chapter'+curChapter).find("[data-"+curFlag+"=page"+1+"]").attr('data-value').match(/\d+/)[0])]);
		// upadate active page
		$('.pages').removeClass("active");
		$('#chapter'+pageNumber[indexStart][0]).find("[data-value=page"+pageNumber[index][1]+"]").addClass("active");
		
		// update button & number
		countNumber(curFlag,index,pageNumber);
		upadateMHbutton(pageNumber,index,curFlag);
	})

	function countPages (pages,length,n){
		var number = [];
		for(var i = 0; i < length; i++)
		{
			k = Number(pages.eq(i).attr('data-value').match(/\d+/)[0]);
			number[i] = [n,k];
		}
		return number;
	}

	function countPagesMH (length,n,name){
		var number = [];
		for(var i = 0; i < length; i++)
		{
			k = Number($('[data-'+name+'=page'+(i+1)+']').attr('data-value').match(/\d+/)[0]);
			number[i] = [n,k];
		}
		return number;
	}

	function getIndexOf(array, item) {
	    for (var i = 0; i < array.length; i++) {
	        // This if statement depends on the format of your array
	        if (array[i][0] == item[0] && array[i][1] == item[1]) {
	            return i;   // Found it
	        }
	    }
	    return false;   // Not found
	}

	function updateIndex(type,pageNumber,index)
	{
		if(type.includes("next"))
		{
			index ++;
		}
		else if(type.includes("previous"))
		{
			index --;
		}
		if(index < 0)
		{
			index = 0;
		}
		if(index > pageNumber.length-1)
		{
			index = pageNumber.length-1;
		}

		return index;
	}

	function countNumber(flag,index,pageNumber){
		number = $('#chapter'+pageNumber[index][0]).find("[data-value=page"+pageNumber[index][1]+"]").attr("data-"+flag);
		number = Number(number.match(/\d+/)[0]);
		$('.frontNumber').text(number);
	}

	function upadateMHbutton(pageNumber, index, flag){
		// Hbutton and Mbutton
		$('.Mbutton, .Hbutton').hide();
		if(flag.includes("M"))
		{
			$('.Hbutton').css("display","block");
		}
		else if(flag.includes("H"))
		{
			$('.Mbutton').css("display","block");
		}
	}

	function updatePageIndex(pageNumber, indexStart, indexEnd, newNumber) {
		// update page index
		start = pageNumber.slice(0,indexStart);
		end = pageNumber.slice(indexEnd+1,pageNumber.length);

		pageNumber=$.merge($.merge(start,newNumber),end);

		return pageNumber;
	}


	function pauseVideo(){
		var media = $("#helloVideo").get(0);
		media.pause();
		media.currentTime = 0;
		var media = $("#restaurantVideo").get(0);
		media.pause();
		media.currentTime = 0;
		var media = $("#goodbyeVideo").get(0);
		media.pause();
		media.currentTime = 0;
	}

	function pauseAudio(){
		for(i=0;i<$('.audio').length;i++)
		{
			var media = $(".audio").eq(i);
			media.pause();
			media.currentTime = 0;
		}
	}


	$('.foodTable > img').click(function(){
		number=$(this).attr('data-number');
		$(this).parent().siblings('.checkTable').find("[data-number="+number+"]").css("visibility","visible");
	})

	$('.audio').click(function(){
		audio = $(this).siblings("audio").get(0);
		audio.play();
	})

	$('.clickTable > img').click(function(){
		number=$(this).attr('data-number');
		$(this).parent().siblings('.foodshapeTable').find("[data-number="+number+"]").css("visibility","visible");
	})

	// animation
	$('.foodAnimate').click(function(){
		$('.foodAnimate').removeClass('shakeit');
		$(this).addClass('shakeit');
	})

	// action when click outside target
	$(document).on('click', function(e){
		if(!$(e.target).closest(".shakeit").length)
        	$('.foodAnimate').removeClass('shakeit');
    })


	$('.alpha').click(function(){
		src = $(this).attr('src');
		ans = $(this).attr('data-answer');
		pauseAudio();
		if(ans == "true" && src.includes('normal'))
		{
			src=src.replace('normal','correct');
			correctSound.play();
		}
		else if(ans == "false" && src.includes('normal'))
		{
			src=src.replace('normal','incorrect');
			incorrectSound.play();
		}
		$(this).attr('src',src);
	})


	// drag function
	var SortDrag = [];
	var SortDrag2 = [];
	var sortChapter = 8;

	SortPageNumber = Number($("#chapter"+ sortChapter +" .sortTable").eq(0).parent().attr("data-value").match(/\d+/)[0]);
	SortDrag = constructDragulaSort(sortChapter,SortPageNumber);
	SortPageNumber = Number($("#chapter"+ sortChapter +" .sortTable").eq(1).parent().attr("data-value").match(/\d+/)[0]);
	SortDrag2 = constructDragulaSort2(sortChapter,SortPageNumber);

	function constructDragulaSort(chapter,page){
		cardFlag = 1;
		quiz = dragulaSort(
			[$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(1)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]],cardFlag);
		return quiz;
	}
	function constructDragulaSort2(chapter,page){
		cardFlag = 1;
		quiz = dragulaSort(
			[$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(1)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(1)")[0]],cardFlag);
		return quiz;
	}

	function dragulaSort(dragBoxes, cardFlag=false, bwFlag=false, quizFlag=false){
		drake = dragula(
			dragBoxes,
	    {
			copy: function (el, source) {
			return source.classList.contains('dragBox');
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
			return source.classList.contains('dragBox'); 
			}
	    }).on('drag',function(el, source) {
	    	// drag function is stupid
	    }).on('drop',function(el,target,source,sibling){
	        if(target.classList.contains('dropBox'))
	        {
	            var rightAnswer=target.getAttribute("data-number"), 
	                currentAnswer=el.getAttribute("data-number");

	            if(rightAnswer == currentAnswer)
	            {
	                src = source.querySelector('[data-number="'+currentAnswer+'"]').src.replace("normal","answer");
	            	target.querySelector(".dropBackground").src = src;
	            	correctSound.play();

	                if(cardFlag)
	                {
	                	src = source.parentNode.querySelector('.cardDrop > [data-number="'+currentAnswer+'"').src.replace("normal","answer");
	                	source.parentNode.querySelector('.cardDrop > [data-number="'+currentAnswer+'"').src = src;
	                }

	                if(bwFlag)
	                {
	                	if(target.parentNode.querySelector('.dropBox:nth-of-type(1) > .dropBackground').src.includes('answer') && target.parentNode.querySelector('.dropBox:nth-of-type(2) > .dropBackground').src.includes('answer'))
	                	{
	                		target.parentNode.parentNode.querySelector('.bwCorrect').style.display="block";
	                		target.parentNode.parentNode.querySelector('.bwCorrect').classList.add('animated', 'bounceInDown', 'fast');
	                	}
	                }
	                if(quizFlag)
	                {
	                	if(target.parentNode.querySelector('.dropBox > .dropBackground').src.includes('answer'))
	                	{
	                		console.log("1");
	                		target.parentNode.parentNode.querySelector('.quizCorrect').style.display="block";
	                		target.parentNode.parentNode.querySelector('.quizCorrect').classList.add('animated', 'bounceInDown', 'fast');
	                	}
	                }
	            }
	            else
	            {
	                source.querySelector('[data-number="'+currentAnswer+'"]').style.visibility="visible";
	                incorrectSound.play();
	            }       
	        }

	        el.remove();

	    }).on('cancel',function(el, container, source) {
	    	// show the source imagex
	    	var currentAnswer=el.getAttribute("data-number");
	    	source.querySelector('[data-number="'+currentAnswer+'"]').style.visibility="visible";
	    }).on('over',function(el, container, source) {
	    	// // hover change dropBox outlook
	     //    updateDropBoxOutlook();

	     //    if(container.classList.contains("dropBox"))
	     //    {
	     //        src = container.querySelector(".dropBackground").src.replace("box","");
	     //        container.querySelector(".dropBackground").src = src;
	     //        container.classList.add('hover');
	     //    }

	     //    // hover change dragging item outlook
	     //    // $(".gu-mirror").css({"box-shadow": "0px 10px 22px -4px rgba(0,0,0,0.64)"});
	     //    src = $(".gu-mirror").attr("src").replace("normal","active");
	     //    $(".gu-mirror").attr("src",src);

	     //    // hide the source image
	    	// var currentAnswer=el.getAttribute("data-number");
	    	// source.querySelector('[data-number="'+currentAnswer+'"]').style.visibility="hidden";
	    	// // hide target gray image
	    	// el.style.display="none";
	    }).on('out',function(el, container, source){
	        // // after drop, change dropBox outlook
	        // updateDropBoxOutlook();
	    })
	    return drake;
	}


})
