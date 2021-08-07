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
    		if(audioFlag=="aM")
    		{
    			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[1] +'")');
    		}
    		else if(audioFlag=="aH")
    		{
    			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[2] +'")');
    		}
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
    	if(curNumber==6 || curNumber==7 || curNumber==8)
    	{
    		if(audioFlag=="aH" && curNumber==6)
    		{
    			$('#chapter'+curNumber).find("[data-value=page"+(aMnumber.length+1)+"]").addClass("active");
    		}
    		else if(countFlag=="cH" && curNumber==7)
    		{
    			$('#chapter'+curNumber).find("[data-value=page"+(cMnumber.length+1)+"]").addClass("active");
    		}
    		else if(shapeFlag=="sH" && curNumber==8)
    		{
    			$('#chapter'+curNumber).find("[data-value=page"+(sMnumber.length+1)+"]").addClass("active");
    		}
    		else
    		{
    			$('#chapter'+curNumber).find("[data-value=page1]").addClass("active");
    		}
    	}
    	else
    	{
    		$('#chapter'+curNumber).find("[data-value=page1]").addClass("active");
    	}
    	
    	pauseAudio();
		pauseVideo();
		stopAnimation();
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
	var countFlag = "cM";
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
    		if(audioFlag=="aM")
    		{
    			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[1] +'")');
    		}
    		else if(audioFlag=="aH")
    		{
    			$('body').css('background-image', 'url("./media/Background/'+ backgrounds[2] +'")');
    		}
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

    	pauseAudio();
		pauseVideo();
		stopAnimation();

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
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[2] +'")');
			}
			else if(curChapter==7)
			{
				countFlag = "cH";
				curFlag = countFlag;
				newNumber = cHnumber;
				resetCount();
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
				$('body').css('background-image', 'url("./media/Background/'+ backgrounds[1] +'")');
			}
			else if(curChapter==7)
			{
				countFlag = "cM";
				curFlag = countFlag;
				newNumber = cMnumber;
				resetCount();
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

		pauseAudio();
		pauseVideo();
		stopAnimation();
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
		for(i=0;i<$('.audioSound').length;i++)
		{
			var media = $(".audioSound").eq(i).get(0);
			media.pause();
			media.currentTime = 0;
		}
	}

	$('#helloVideo, #restaurantVideo, #goodbyeVideo').on('touchstart',function(e) {
		e.preventDefault();
		video = $(this).get(0);
		if (video.paused)
		{
			video.play(); 
		}  
		else
		{
	  		video.pause();
		}   
	})

	var correctSound = new Audio("./media/Audio/correct.wav");
    var incorrectSound = new Audio("./media/Audio/wrong.mp3");
    function playSound(sound){
    	sound.pause();
		sound.currentTime = 0;
		sound.play();
    }
	$('.foodTable > img').click(function(){
		number=$(this).attr('data-number');
		$(this).parent().siblings('.checkTable').find("[data-number="+number+"]").css("visibility","visible");
		src = $(this).parent().siblings('.checkTable').find("[data-number="+number+"]").attr("src");
		if(src.includes("yes"))
		{
			playSound(correctSound);
		}
		else
		{
			playSound(incorrectSound);
		}

		$(this).parent().siblings('.checkTable').find("[data-number="+number+"]").addClass("animated fadeInDown faster");
	})

	$('.audio').click(function(){
		audio = $(this).siblings("audio").get(0);
		audio.play();
	})

	var lastClick=0;
	$('.clickTable > img').click(function(){
		number=$(this).attr('data-number');
		$(this).parent().siblings('.foodshapeTable').find("[data-number="+number+"]").css("visibility","visible");
		$(this).parent().siblings('.foodshapeTable').find("[data-number="+number+"]").addClass("animated fadeIn");
		$(this).parent().siblings('.shapeTable').find("[data-number="+number+"]").addClass("animated fadeOut");

		if(lastClick)
		{
			lastClick.css("visibility","hidden");
		}
		lastClick=$(this).parent().siblings('.shapeTable').find("[data-number="+number+"]");
		setTimeout(function(){
	    	lastClick.css("visibility","hidden");
	    },400);
	})

	// counting
	resetCount();
	var counting1 = 1;
	var counting2 = 1;
	$('.pages.cM').click(function(){
		maxCount = $(this).find(".countObject").length;
		if(counting1<maxCount+1)
		{
			$(this).find("[data-count="+counting1+"]").css("visibility","visible");
			$(this).find("[data-count="+counting1+"]").addClass("animated bounceIn");

		    counting1++;
		}
	})
	$('.pages.cH').click(function(){
		maxCount = $(this).find(".countObject").length;
		if(counting2<maxCount+1)
		{
			$(this).find("[data-count="+counting2+"]").css("visibility","visible");
			$(this).find("[data-count="+counting2+"]").addClass("animated bounceIn");

		    counting2++;
		}
	})

	$('.resetButton').click(function(){
		if($(this).attr("class").includes(""))
		{
			resetCount();
		}
		if($(this).attr("class").includes(""))
		{
			resetAudio();
		}
		if($(this).attr("class").includes(""))
		{
			resetShape();
		}
		if($(this).attr("class").includes(""))
		{
			resetSort();
		}
	})

	function resetCount(){
		counting1=1;
		counting2=1;
		$(".countObject").css("visibility","hidden");
		$(".countObject").removeClass("animated bounceIn");
		$('.pages.cM').find("[data-count=0]").css("visibility","visible");
		$('.pages.cH').find("[data-count=0]").css("visibility","visible");
	}
	function resetAudio(){
		$('.checkTable').find("img").css("visibility","hidden");
		$('.checkTable').find("img").removeClass("animated fadeInDown faster");
	}
	function resetShape(){
		$('.foodshapeTable').find("img").css("visibility","hidden");
		$('.foodshapeTable').find("img").removeClass("animated fadeIn");
		$('.shapeTable').find("img").removeClass("animated fadeOut");
	}
	function resetSort(){
		$('.dragBox').find("img").css("visibility","visible");
		$('.dropBox').find("img").css("visibility","hidden");
		$('.dropBox').find("img").removeClass('nodrag');
	}

	function stopAnimation(){
		$(".countObject").removeClass("animated bounceIn");
		$('.checkTable').find("img").removeClass("animated fadeInDown faster");
		$('.foodshapeTable').find("img").removeClass("animated fadeIn");
		$('.shapeTable').find("img").removeClass("animated fadeOut");
	}

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
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0]]);
		return quiz;
	}
	function constructDragulaSort2(chapter,page){
		cardFlag = 1;
		quiz = dragulaSort(
			[$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(1)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dropBox:eq(2)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(0)")[0],
			$('#chapter'+chapter).find("[data-value=page"+page+"]").find(".dragBox:eq(1)")[0]]);
		return quiz;
	}

	function dragulaSort(dragBoxes){
		drake = dragula(
			dragBoxes,
	    {
			copy: function (el, source) {
			return source.classList.contains('dragBox');
			},
			isContainer: function (el) {
			return false;
			},
			direction: 'vertical',
			removeOnSpill: true,
			accepts: function (el, target) {
			return !(target.classList.contains('nodrag'))&& !(target.classList.contains('dragBox'));
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
	                currentAnswer=el.getAttribute("data-number"),
	                currentName = el.getAttribute("data-name");
	            if(rightAnswer == currentAnswer)
	            {
	                src = source.querySelector('[data-name="'+currentName+'"]').src;
	            	target.querySelector(".empty.object").src = src;
	            	target.querySelector(".empty.object").classList.remove("empty");
	            	
	            	playSound(correctSound);
	            }
	            else
	            {
	                source.querySelector('[data-name="'+currentName+'"]').style.visibility="visible";
	                
	                playSound(incorrectSound);
	            }       
	        }

	        el.remove();
	        checknumber();

	    }).on('cancel',function(el, container, source) {
	    	// show the source imagex
	    	var currentName=el.getAttribute("data-name");
	    	source.querySelector('[data-name="'+currentName+'"]').style.visibility="visible";
	    }).on('over',function(el, container, source) {
	    	// hover change dropBox outlook
	        $(".backgroundBox.hover").removeClass('hover');
	        if(container.classList.contains("dropBox"))
	        {
	            container.querySelector('.backgroundBox').classList.add('hover');
	        }

	        // hover change dragging item outlook
	        // src = $(".gu-mirror").attr("src").replace("normal","active");
	        // $(".gu-mirror").attr("src",src);

	        // hover change target temp item look
	        // $(".gu-transit").hide(); //not working

	        // hide the source image
	    	var currentAnswer=el.getAttribute("data-name");
	    	source.querySelector('[data-name="'+currentAnswer+'"]').style.visibility="hidden";
	    	// hide target gray image
	    	el.style.display="none";

	    }).on('out',function(el, container, source){
	        // // after drop, change dropBox outlook
	        $(".backgroundBox.hover").removeClass('hover');
	    })
	    return drake;
	}
	function checknumber() {
		$('.dropBox').each(function(){
			// console.log($(this).find(".empty").length)
	        if($(this).find(".empty").length < 1)
	            $(this).addClass('nodrag');
	        else
	            $(this).removeClass('nodrag');
	    });
	}


})

$(function(){
    document.oncontextmenu = function(){
        return false;
    }
    document.onselectstart = function() {
        return false;
    }
})
