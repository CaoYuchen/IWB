/*!
 * Copyright 2014, 2014 ywang1724 and other contributors
 * Released under the MIT license
 * http://ywang1724.com
 *
 * Date: 2014-09-02
 */

/**
 * 弹出层类	PopLayer
 * 参数说明：args obj
 * @param	title		弹出层标题
 * @param	content		弹出层内容html
 * @param 	isModal		弹出层是否模态
 * @param 	moveable 	弹出层可否移动
 * @param   document	上下文文档对象
 */
 var roster;
(function() {
	
	function PopLayer(args) {
		//初始化参数
		this.title = args.title || "";
		this.content = args.content || "";
        this.heights = args.heights;
        this.widths = args.widths;
		this.isModal = (typeof args.isModal === "boolean") ? args.isModal : true;
		this.moveable = (typeof args.moveable === "boolean") ? args.moveable : true;
		this.document = args.document || document;
		//辅助参数
		this.isDown = false;  //鼠标是否在弹层标题栏按下
		this.offset = {
            "width": 0, 
            "height": 0
        };
		//模态加遮罩层
		var modal = this.getElement();
		if (this.isModal) {
			this.myModal = modal.myModal;
		}
		this.myPop = modal.myPop;
		//初始化
		this.init();
	};
	
	PopLayer.prototype = {
		
		init: function() {
			this.initContent();//初始化内容
			this.initEvent();//初始化行为
		},
		
		initContent: function() {
			if (this.isModal) {
                $("body", this.document).append(this.myModal);
                this.myModal.show();
            }
			$("body", this.document).append(this.myPop);
            $(".myPop-title-value", this.myPop).html(this.title);//设置标题
            // console.log(this.myPop.outerHeight());
            // console.log(this.myPop.outerWidth());
            this.myPop.css("top", (this.document.documentElement.scrollHeight - this.heights) / 2 + "px");
			this.myPop.css("left", (this.document.documentElement.scrollWidth - this.widths) / 2 + "px");
            this.myPop.show();
		},
		
		initEvent: function() {
			var $this = this;
			//鼠标按下事件
			$(".myPop-title", this.myPop).on("mousedown", function(e) {
				$this.isDown = true;
				var event = window.event || e;
				//记录按下时鼠标距离弹出层位置
				$this.offset.height = event.clientY - $this.myPop.offset().top;
				$this.offset.width = event.clientX - $this.myPop.offset().left;
                return false;
			});
			//鼠标拖动事件
			$(this.document).mousemove(function(e) {
				 if ($this.isDown && $this.moveable) {
			        var event = window.event || e;
			        //偏移位置
			        var top = event.clientY - $this.offset.height,
                        left = event.clientX - $this.offset.width,
                        maxL = $this.document.documentElement.clientWidth - $this.myPop.width(),
                        maxT = $this.document.documentElement.clientHeight - $this.myPop.height();        
                    left = left < 0 ? 0 : left;
                    left = left > maxL ? maxL : left;      
                    top = top < 0 ? 0 : top;
                    top = top > maxT ? maxT : top;
					$this.myPop.css("top", top + "px");
					$this.myPop.css("left", left + "px");
				}
                return false;
			}).mouseup(function(e) {
				if ($this.isDown) {
					$this.isDown = false;
				}
                return false;
            });

            //touch function
            $(".myPop-title", this.myPop).on("touchstart", function(e) {
                $this.isDown = true;
                var event = window.event || e;
                //记录按下时鼠标距离弹出层位置
                $this.offset.height = event.touches[0].clientY - $this.myPop.offset().top;
                $this.offset.width = event.touches[0].clientX - $this.myPop.offset().left;
                e.preventDefault();
                return false;
            });
            //鼠标拖动事件
            $(".myPop-title").on("touchmove", function(e) {
                 if ($this.isDown && $this.moveable) {
                    var event = window.event || e;
                    //偏移位置
                    var top = event.touches[0].clientY - $this.offset.height,
                        left = event.touches[0].clientX - $this.offset.width,
                        maxL = $this.document.documentElement.clientWidth - $this.myPop.width(),
                        maxT = $this.document.documentElement.clientHeight - $this.myPop.height();        
                    left = left < 0 ? 0 : left;
                    left = left > maxL ? maxL : left;      
                    top = top < 0 ? 0 : top;
                    top = top > maxT ? maxT : top;
                    $this.myPop.css("top", top + "px");
                    $this.myPop.css("left", left + "px");
                }
                e.preventDefault();
                return false;
            });
            $(".myPop-title").on("touchend", function(e) {
                if ($this.isDown) {
                    $this.isDown = false;
                }
                e.preventDefault();
                return false;
            });
			//关闭事件
			$(".myPop-close", this.myPop).on('click', function() {
                $this.destroy();
                $('#plus').attr("disabled",false);
                $('.teamchoice').attr("disabled",false);
                return false;
            });
            $("#create", this.myPop).on('click', function() {
                $this.destroy();
                $('#plus').attr("disabled",false);
                return false;
            });
            $(".team", this.myPop).on('click', function() {
                $this.destroy();
                $('.teamchoice').attr("disabled",false);
                return false;
            });
		},
        
		getElement: function() {
			return {
				"myModal": $("<div class='myModal'></div>", this.document),
				"myPop": $("<div class='myPop'>" +
                                "<div class='myPop-title'>" +
                                    "<span class='myPop-title-value'></span>" +  
                                "</div>" + 
                                "<div class='myPop-content'>" + this.content + "</div>" + 
                           "</div>", this.document)
			};
		},
		
		destroy: function() {
			//清除显示层
			this.myPop.remove();
			//清除存在的遮罩层
			if(this.isModal){
				this.myModal.remove();
			}
			//计数器退栈
		},

	};
	
    // if (!top.PopLayer) {
	roster = PopLayer;
	// }
  
})()


var max = 16;
var mousePressed = false;
var touched = false;
var lastX, lastY;
var ctx, canvas;
var gender = new Image();

var lineC = "grey",
    lineW = 5;

var number=0;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    canvas = document.getElementById('myCanvas');

    var bkgimg = document.getElementById("bkgimg");

    ctx.drawImage(bkgimg, 0, 0);

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        // console.log($(this).offset().left);
        // console.log(e.target.offsetLeft);
        // console.log(e.clientX);
        // console.log(e.pageX);

    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    // Draw something when a touch start is detected
    $('#myCanvas').on('touchstart',function(e){
    // canvas.addEventListener('touchstart', function(e){
        // console.log(e.touches[0]);
        e.preventDefault();
        touched = true;
        Draw(e.touches[0].pageX - $(this).offset().left, e.touches[0].pageY -  $(this).offset().top, false);

    });
    $('#myCanvas').on('touchmove',function(e){
    // canvas.addEventListener('touchmove', function(e){
        if (touched) {
            e.preventDefault();
            Draw(e.touches[0].pageX - $(this).offset().left, e.touches[0].pageY - $(this).offset().top, true);
        }
    });
    $('#myCanvas').on('touchend',function(e){
    // canvas.addEventListener('touchend', function(e){
        touched = false;
        e.preventDefault();
    });


}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = lineC;
        ctx.lineWidth = lineW;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}


function erase() {
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var bkgimg = document.getElementById("bkgimg");
    ctx.drawImage(bkgimg, 0, 0);
    // document.getElementById("m"+number).style.display = "none";
}

function save() {
    if(number<max)
    {
        var dataURL = document.getElementById('myCanvas').toDataURL();
        var merge = document.getElementById('can').getContext("2d");
        //background of handwriting
     	// var bkg = new Image();
     	// bkg.src = "../media/lined-paper.svg";
     	// bkg.crossOrigin = "anonymous";
     	// gender.crossOrigin = "anonymous";
        merge.drawImage(gender,0,0);
        // merge.drawImage(bkg,25,360,300,185);
        merge.drawImage(canvas,0,206);
        ++number;
        document.getElementById("m"+number).src = document.getElementById('can').toDataURL();
        document.getElementById("m"+number).style.display = "inline-block";
        $('#m'+number).css("visibility","visible");
        merge.clearRect(0, 0, merge.canvas.width, merge.canvas.height);
        if(number > (max - 1))
        {
            $('#plus').attr("disabled",true);
            $('.member-plus').hide();
        }
    }
}

function showdelete(id){
    // for(var i=1;i<number+1;i++)
    // { 
    //     document.getElementById("d"+i).style.display = "inline";
    //     $('#plus').attr("disabled",true);
    // }
    $('#plus').attr("disabled",true);
    $("#m"+id).parent().addClass("shakeit");
    $('#d'+id).show();
    $('#dup'+id+'> .deletemask').show();
}
function hidedelete(){
     for(var i=1;i<number+1;i++)
    { 
        document.getElementById("d"+i).style.display = "none";
        $('.deletemask').hide();
        $('#plus').attr("disabled",false);
        if($("#m"+i).parent().attr('class').includes("shakeit"))
            $("#m"+i).parent().removeClass("shakeit");
    }
}


function showplus(){
    for(var i=1;i<number+1;i++)
    { 
        if (used[grpnumber+i-1] == 0)
        {
        document.getElementById("p"+i).style.display = "inline-block";
        // $('#plus').attr("disabled",true);
        // $('#minus').attr("disabled",true);
        // $('#groupminus').attr("disabled",true);    
        }
    }
}

function hideplus(){
     for(var i=1;i<number+1;i++)
    { 
        document.getElementById("p"+i).style.display = "none";
        // $('#plus').attr("disabled",false);
        // $('#minus').attr("disabled",false);
        // $('#groupminus').attr("disabled",false);
    }
}

 function showgroupdelete(){
    for(var i=1;i<number+1;i++)
    {
        if (used[grpnumber+i-1] == 1)
        {
            document.getElementById(grpindex+"g"+"d"+i).style.display = "inline-block";       
        }
    }
   
    // $('#plus').attr("disabled",true);
    // $('#minus').attr("disabled",true);
    // $('#groupplus').attr("disabled",true); 
}

function hidegroupdelete(){
    for(var i=1;i<number+1;i++)
    {
        if (used[grpnumber+i-1] == 1)
        {
            document.getElementById(grpindex+"g"+"d"+i).style.display = "none";
        }
    }
    // $(".gdelete").show();
    // $('#plus').attr("disabled",false);
    // $('#minus').attr("disabled",false);
    // $('#groupplus').attr("disabled",false);
}     

function boyorgirl(name) {
    if(imageflag){
        // name = arg.name;
        $('.gender-choose').hide();
        $('.figure-choose').hide();
        $("#" + name).show();
        gender.src = document.getElementById(name).src;
        document.getElementById("myCanvas").style.display = "inline-block";
        $('.card-btn').css("display","inline-block");
        if(name.includes("boy"))
        {
            $("#colorboy1").show();
            $("#colorboy2").show();
            $("#colorboy3").show();
            $("#colorboy5").show();
            $("#colorboy4").show();
        }
        else
        {
            $("#colorgirl1").show();
            $("#colorgirl2").show();
            $("#colorgirl3").show();
            $("#colorgirl4").show();
            $("#colorgirl5").show();
        }          

        precolorgirl="girl1";
        precolorboy="boy1";

        InitThis();
        imageflag = false;
    }
}

var precolorgirl="girl1";
var precolorboy="boy1";
function choosecolor(name){
    $('.figure-choose').hide();
    $('#'+name).show();

    if(name.includes("boy"))
    {
        srcicon = $('#'+'color'+precolorboy).attr('src').replace('selected','unselected');
        $('#'+'color'+precolorboy).attr('src', srcicon);
        srcicon = $('#'+'color'+name).attr('src').replace('unselected','selected');
        $('#'+'color'+name).attr('src', srcicon);
        precolorboy = name;
    }

    if(name.includes("girl"))
    {
        srcicon = $('#'+'color'+precolorgirl).attr('src').replace('selected','unselected');
        $('#'+'color'+precolorgirl).attr('src', srcicon);
        srcicon = $('#'+'color'+name).attr('src').replace('unselected','selected');
        $('#'+'color'+name).attr('src', srcicon); 
        precolorgirl = name;
    }

    gender.src = document.getElementById(name).src;
}

function twogrp() {
    $('.groups').attr("style","display:inline");
    $('.twogrp').attr("style","display:inline");
    $('.threegrp').attr("style","display:none");
    $('.fourgrp').attr("style","display:none");
    // teamed =true;
    grpnumber=0;
    grpindex="a";
    firsttime_team = true;

    copystudent();
}

function threegrp() {
    $('.groups').attr("style","display:inline");
    $('.threegrp').attr("style","display:inline");
    $('.twogrp').attr("style","display:none");
    $('.fourgrp').attr("style","display:none");
    // teamed =true;
    grpnumber=max;
    grpindex="b";
    firsttime_team = true;

    copystudent();
}

function fourgrp() {
    $('.groups').attr("style","display:inline");
    $('.fourgrp').attr("style","display:inline");
    $('.twogrp').attr("style","display:none");
    $('.threegrp').attr("style","display:none");
    // teamed =true;
    grpnumber=max*2;
    grpindex="c";
    firsttime_team = true;

    copystudent();
}

var prenumber = 0;
function copystudent() {
    $(".groupmember").html("");
    $(".score-star").html("");
    // prenumber = number;
    hidestudent(); 
    prenumber = number;

    for(i=1;i<number+1;i++)
    {
        srcimg = $('#m'+i).attr('src');
        $('#drag'+i).find('.drag').attr('src',srcimg);
        $('#drag'+i).css('display','inline-block');
        $('#drag'+i).find('.drag').show();
    } 
      
}

// function showstudent() {
//     for(i=1;i<prenumber+1;i++)
//     {
//         // $('#drag'+i).find('.drag').show();
//         $('#drag'+i).css('display','inline-block');
//     }    
// }

function hidestudent() {
    for(i=1;i<prenumber+1;i++)
    {
        $('#drag'+i).find('.drag').attr('src','');
        $('#drag'+i).hide();
    }
}


//group plus button show up
var plusflag = false;
var classname = null;
var subclass = null;
// $(function() {
// $(document).delegate('#grpplus', 'click', function(event) {
    
//     if(deleteflag){
//         hidedelete();
//         deleteflag = false;
//     }
//     if(groupdeleteflag){
//         hidegroupdelete();
//         groupdeleteflag = false;
//     }


//     if(number > 0){
//         if(!plusflag){
//             showplus();
//             plusflag = true;
//             classname = $(this).parent().parent().attr("class");
//             subclass = $(this).parent().attr("class");
//         }
//         else {
//             hideplus();
//             plusflag = false;
//         }
//     }

//     // $('body').on('click', function(e){
//     //     if(plusflag){
//     //         hideplus();
//     //         plusflag = false;
//     //     }
//     // })     
// })
// })

//group add function
var used = new Array(3*max);
var grpnumber, grpindex;
for(var i=0; i<3*max; i++)
    used[i]=0;

// $(function() {
// $(document).delegate('.groupplus', 'click', function(event) {
    
//     var index = $(this).siblings('.member').attr("id");
//     // console.log(index);
//     // var content = '<img class="member" id="g' + index + '" ' + src + ' width="120px">';
//     // copy image
//     var content = $("#"+index).clone();
//     index = index.replace("m","g");
//     content.attr("id",grpindex+index);
//     content.attr("class", "gmember");
//     $('.' + classname + ' > .' + subclass + ' > .groupmember').append(content);
//     // copy button
//     index = $(this).siblings('.delete').attr("id");
//     content = $("#"+index).clone();
//     content.attr("id",grpindex+"g"+index);
//     content.attr("class","gdelete");
//     $('.' + classname + ' > .' + subclass + ' > .groupmember').append(content);

//     // plusflag = false;
//     // hideplus();
//     //hide each after click
//     $(this).hide();

//     var n = $(this).attr("id");
//     n = parseInt(n.replace("p",""));
//     used[grpnumber+n-1] = 1;
    
// })
// })


//group delete button show up
// var groupdeleteflag = false;
// $(function() {
// $(document).delegate('#grpminus', 'click', function(event) {
    
//     if(plusflag){
//         hideplus();
//         plusflag = false;
//     }

//     if(deleteflag){
//         hidedelete();
//         deleteflag = false;
//     }


//     if(!groupdeleteflag){
//         showgroupdelete();
//         groupdeleteflag = true;
//     }
//     else {
//         hidegroupdelete();
//         groupdeleteflag = false;
//     }



//     // $('body').on('click', function(e){
//     //     if(groupdeleteflag){
//     //         hidegroupdelete();
//     //         groupdeleteflag = false;
//     //     }
//     // })
// })
// })

//group delete
// $(function() {
// $(document).delegate('.gdelete', 'click', function(event) {
//     // groupdeleteflag=false;
//     // hidegroupdelete();

//     var index = $(this).attr("id");
//     // console.log(index);
//     $("#" + index).remove();
//     index = index.replace("gd","g");
//     $("#" + index).remove();
//     index = parseInt(index.replace(grpindex+"g",""));
//     // console.log(index);
//     used[grpnumber+index-1]=0;
// })
// })


//group hide button
// $(function(){
// $(document).delegate('#grpcancel', 'click', function(event) {
//     if(plusflag){
//         hideplus();
//         plusflag = false;
//     }
//     if(groupdeleteflag){
//         hidegroupdelete();
//         groupdeleteflag = false;
//     }

// })
// })

// individual delete button showup
var deleteflag = false;
$(function() {
$(document).delegate('.member', 'click', function(event) {

    idname = $(this).attr('id');
    k = idname.replace('m','');
    k = Number(k);
    // console.log(k);

    if(k < number + 1 && stardeleteflag && starflag)
    {
        // if(plusflag){
        //     hideplus();
        //     plusflag = false;
        // }
        // if(groupdeleteflag){
        //     hidegroupdelete();
        //     groupdeleteflag = false;
        // }


        if(number > 0 ){
            if(!deleteflag){
                showdelete(k);
                deleteflag = true;
            }
            else {
                hidedelete();
                deleteflag = false;
            }
        }
    }
    
    event.stopPropagation();   
})
})
// hide delete button when click elsewhere
$(function() {
$(document).on('click', function(){
        if(deleteflag){
            hidedelete();
            deleteflag = false;
        }
    }) 
})


// individual delete
$(function() {
$(document).delegate('.delete', 'click', function(event) {

    var index = $(this).attr("id");
    // console.log(index[1]);
    document.getElementById("d"+number).style.display = "none";
    // document.getElementById("m"+number).style.display = "none";
    document.getElementById("p"+number).style.display = "none";
    $('#m'+number).css('visibility','hidden');
    if(index.length == 2)
        ind = index[1];
    else
        ind = index[1]+index[2];    
    k = Number(ind);
    // used[k-1]=0;
    // used[max+k-1]=0;
    // used[max*2+k-1]=0;

    //hide delete button
    deleteflag=false;
    hidedelete();

    //delete star
    classname = $(this).attr("id");
    classname = classname.replace("d","m");
    classname = '.scorep.'+classname;
    // console.log(classname);
    $(classname).remove();

    //delete relative member in group
    // classname = $(this).attr("id");
    // idname = classname.replace("d","#ag");
    // if($(idname))
    //     $(idname).remove();
    // idname = classname.replace("d","#bg");
    // if($(idname))
    //     $(idname).remove();
    // idname = classname.replace("d","#cg");
    // if($(idname))
    //     $(idname).remove();

    // idname = classname.replace("d","#agd");
    // if($(idname))
    //     $(idname).remove();
    // idname = classname.replace("d","#bgd");
    // if($(idname))
    //     $(idname).remove();
    // idname = classname.replace("d","#cgd");
    // if($(idname))
    //     $(idname).remove();


    for(k;k<number;k++)
    {   
        var tmp1 = document.getElementById("m"+k).src;
        document.getElementById("m"+k).src=document.getElementById("m"+(k+1)).src;
        document.getElementById("m"+(k+1)).src=tmp1;

        var tmp2 = document.getElementById("d"+k).src;
        document.getElementById("d"+k).src=document.getElementById("d"+(k+1)).src;
        document.getElementById("d"+(k+1)).src=tmp2;

        var tmp3 = document.getElementById("p"+k).src;
        document.getElementById("p"+k).src=document.getElementById("p"+(k+1)).src;
        document.getElementById("p"+(k+1)).src=tmp3;

    }

    // k = Number(ind);
    // for(k;k<number+1;k++)
    // {
    //     if(used[k-1] == 1){
    //         $("#agd"+k).attr("id","agd"+(k-1));
    //         $("#ag"+k).attr("id","ag"+(k-1));
    //     }
           
    //     if(used[k+max-1] == 1){
    //         $("#bgd"+k).attr("id","bgd"+(k-1));
    //         $("#bg"+k).attr("id","bg"+(k-1));
    //     }
    //     if(used[k+max*2-1] == 1){
    //         $("#cgd"+k).attr("id","cgd"+(k-1));
    //         $("#cg"+k).attr("id","cg"+(k-1));
    //     }
    // }


    // k = Number(ind);
    // for(k;k<number+1;k++)
    // {
    //     for(kk=0;kk<3;kk++){
    //         var n = used[kk*max+k-1];
    //         used[kk*max+k-1]=used[kk*max+k];
    //         used[kk*max+k]=n;
    //     }  
    // } 


    k = Number(ind)+1;
    for(k;k<number+1;k++)
    {
        // content = $('.scorep.m'+ k)[0].outerHTML;
        // console.log(content);
        $('.scorep.m'+ k).clone().appendTo($('#m'+(k-1)).parent());
        $('#dup'+ k + '> .scorep.m'+ k).remove();
        // $('#m'+(k-1)).parent().append(content);
        $('.scorep.m'+k).removeClass('m'+k).addClass('m'+(k-1));

    }       

    // console.log(k);

    --number;
    if(number < max)
    {
        $('#plus').attr("disabled",false);
        $('.member-plus').show();
        $('#m16').hide();
    }

})
})


// add individual
var imageflag;
$(function() {
$(document).delegate('#plus', 'click', function(event) {
        
        // if(plusflag){
        //     hideplus();
        //     plusflag = false;
        // }
        // if(groupdeleteflag){
        //     hidegroupdelete();
        //     groupdeleteflag = false;
        // }
        if(deleteflag){
            hidedelete();
            deleteflag = false;
        }
        $('#plus').attr("disabled",true);

        if(!stardeleteflag)
        {
            srcicon = $('#deletestar').find('img').attr('src').replace('_selected.svg','.svg');
            $('#deletestar').find('img').attr('src',srcicon);
             stardeleteflag = true;
        }

        if(!starflag)
        {
            $('#currentstar').removeClass('flip animated');
            starflag = true;
        }   

        imageflag = true;
        new roster({
            "title": "",
            "content":
            "<span class='myPop-close'><img src='./media/close.svg' width='38px'></span>\
            <img src='./media/boy.png' id='boy' class='gender-choose' width='200px' style='padding: 60px 30px 25px 100px' onclick='boyorgirl(\"boy1\")'> \
            <img src='./media/girl.png' id='girl' class='gender-choose' width='200px'  style='padding: 60px 100px 25px 30px' onclick='boyorgirl(\"girl1\")'>\
            <img class='color-btn' id='colorboy1' src='./media/color/selected1.svg' width='46px' onclick='choosecolor(\"boy1\")'>\
            <img class='color-btn' id='colorboy2' src='./media/color/unselected2.svg' width='46px' onclick='choosecolor(\"boy2\")'>\
            <img class='color-btn' id='colorboy3' src='./media/color/unselected3.svg' width='46px' onclick='choosecolor(\"boy3\")'>\
            <img class='color-btn' id='colorboy4' src='./media/color/unselected4.svg' width='46px' onclick='choosecolor(\"boy4\")'>\
            <img class='color-btn' id='colorboy5' src='./media/color/unselected5.svg' width='46px' onclick='choosecolor(\"boy5\")'>\
            <img class='color-btn' id='colorgirl1' src='./media/color/selected6.svg' width='46px' onclick='choosecolor(\"girl1\")'>\
            <img class='color-btn' id='colorgirl2' src='./media/color/unselected7.svg' width='46px' onclick='choosecolor(\"girl2\")'>\
            <img class='color-btn' id='colorgirl3' src='./media/color/unselected8.svg' width='46px' onclick='choosecolor(\"girl3\")'>\
            <img class='color-btn' id='colorgirl4' src='./media/color/unselected9.svg' width='46px' onclick='choosecolor(\"girl4\")'>\
            <img class='color-btn' id='colorgirl5' src='./media/color/unselected10.svg' width='46px' onclick='choosecolor(\"girl5\")'>\
            \
            <p><img src='./media/boy1.png' id='boy1' class='figure-choose' width='541px'> \
            <img src='./media/girl1.png' id='girl1' class='figure-choose' width='541px'></p> \
            <p><img src='./media/boy2.png' id='boy2' class='figure-choose' width='541px'> \
            <img src='./media/girl2.png' id='girl2' class='figure-choose' width='541px'></p> \
            <p><img src='./media/boy3.png' id='boy3' class='figure-choose' width='541px'> \
            <img src='./media/girl3.png' id='girl3' class='figure-choose' width='541px'></p> \
            <p><img src='./media/boy4.png' id='boy4' class='figure-choose' width='541px'> \
            <img src='./media/girl4.png' id='girl4' class='figure-choose' width='541px'></p> \
            <p><img src='./media/boy5.png' id='boy5' class='figure-choose' width='541px'> \
            <img src='./media/girl5.png' id='girl5' class='figure-choose' width='541px'></p> \
            <canvas id='myCanvas' width='541px' height='173px' style='display:none'></canvas>\
            <p>\
            <img class='card-btn' id='eraser' src='./media/eraser.svg' width='41px' onclick='erase()'>\
            <img class='card-btn' id='create' src='./media/choose.svg' width='41px' onclick='save()'>\
            </p>",
            "heights": 540,
            "widths":797
        });

        $('.myPop-content').css("width","797px");

})
})


// team choice 
var teamed = false;
var firsttime_team = false;
$(function() {
$(document).delegate('.teamchoice', 'click', function(event) {



    $('.students').hide();
    $('#wheel').hide();
    $("#map").hide();
    $('.titleImage').attr('src','./media/Groups.svg');
    $('body').css('background-image','url(./media/background.jpg)');
    $('.topbutton').show();
    $('.groups').show();
    $('#wheel').find("iframe").attr('src', $('#wheel').find("iframe").attr('src'));
    $('#map').find("iframe").attr('src', $('#map').find("iframe").attr('src'));

    // showstudent();
    // teamed = false;

    if(!starflag)
    {
        $('#currentstar').removeClass('flip animated');
        starflag = true;
    } 


if(!teamed){
    new roster({
    "title": "",
    "content":
    "<span class='myPop-close'><img src='./media/close.svg' width='38px'></span>\
    <img src='./media/g1.svg' class='team' width = '400px'  onclick='twogrp()'> \
    <img src='./media/g2.svg'  class='team' width = '400px'  onclick='threegrp()'> \
    <img src='./media/g3.svg'  class='team' width = '400px'  onclick='fourgrp()'>",
    "heights":540,
    "widths":1513
    });
    
    $('.myPop-content').css("width","1513px");
    $('.teamchoice').attr("disabled",true);         

// else
    for(var i=0; i<3*max; i++)
    {
        used[i]=0;
    }

    // $(".groupmember").html("");
    // $(".score").html("<span>Scores:</span>");
}

    teamed = false;
})
})

// $(function() {
//     $('.myPop-close').on('click',function(){
//         if(!teamed)
//         {
//             $('.groups').show();
//             teamed = true;

//         }
//     })
// })

//clear team
// $(function() {
//     $('#noteam').click(function(){

//         if(plusflag){
//             hideplus();
//             plusflag = false;
//         }
//         if(groupdeleteflag){
//             hidegroupdelete();
//             groupdeleteflag = false;
//         }
//         if(deleteflag){
//             hidedelete();
//             deleteflag = false;
//         }


//         if(teamed){
//             $('.groups').attr("style","display:none");
        
//             teamed = false;
//             for(var i=0; i<3*max; i++)
//             {
//                 used[i]=0;
//             }

//             $(".groupmember").html("");
//             $(".score").html("<span>Scores:</span>");
//         }
       
//     });
// })

// //hide team
// $(function() {
//     $('#hideteam').click(function(){

//         if(plusflag){
//             hideplus();
//             plusflag = false;
//         }
//         if(groupdeleteflag){
//             hidegroupdelete();
//             groupdeleteflag = false;
//         }
//         if(deleteflag){
//             hidedelete();
//             deleteflag = false;
//         }

//         if(teamed){
//             $('.groups').attr("style","display:none");      
//             teamed = false;
//         }
       
//     });
// })

// change star image
var starflag = true;
var src,xc, yc;
// initiate currentstar as sticker
$(function() {
    src = $('#currentstar').find('img').attr('src');
    src = src.replace(".svg","_selected.svg");
})


//switch star on/off
$(function() {
$(document).delegate('.star', 'click', function(event) {

    src = $(this).find('img').attr("src");
    $("#currentstar").find('img').attr("src",src);
    src = src.replace(".svg","_selected.svg");
    starflag=false;
    if(!starflag)
        $('#currentstar').addClass('flip animated');

})
})

//show star choice is on
$(function() {
$(document).delegate('#currentstar', 'click', function(event) {

    
    if(!stardeleteflag)
        {
            srcicon = $('#deletestar').find('img').attr('src').replace('_selected.svg','.svg');
            $('#deletestar').find('img').attr('src',srcicon);  
        }
    stardeleteflag = true;
    // $('.scorep').removeClass('flip animated');
    // $('.scoreg').removeClass('flip animated');
    
    starflag = !starflag;
    if(!starflag)
        $('#currentstar').addClass('flip animated');
    else
        $('#currentstar').removeClass('flip animated');
    // var cursor = src.replace("svg","png");
    // cursor = 'url(' + cursor + '), auto';
    // // console.log(cursor);
    // $('body').css('cursor',cursor);
    

    // $('body').on('click', function(e){
    //     if(!starflag){
    //         $('body').css('cursor','auto');
    //         starflag = true;
    //     }
    // })

})
})

//add star function
$(function() {
    $('.member').on('click', function(e){
        if(!starflag){

            xc = e.offsetX - 22;
            yc = e.offsetY - 22;
            classname = $(this).attr("id");
            star = '<img class="scorep ' + classname + '" src="'+ src +'" width="45px" height="45px" style="top:'+yc +'px;left:'+xc+'px">';
            // console.log(classname);
            $(this).parent().append(star);
            // $('.students').append(star);

        // $('body').css('cursor','auto');
        // starflag = true;
        }
    })


    $('.g1 , .g2 , .g3 , .g4').on('click', function(e){
        if(!starflag){
        // if()
            var indexparent = $(this).parent().attr('class');
            var index = $(this).attr('class');
        switch(indexparent)
        {
            case "twogrp":
                if($(this).find('.score-star').children().length < 18){
                    index = '.' + indexparent + '> .' + index + '> .score > .score-star';
                    star = '<img class="scoreg" src="'+ src +'" width="55px" align="absmiddle">';
                    $(index).append(star);
                }
                break;

            case "threegrp":
                if($(this).find('.score-star').children().length < 12){
                    index = '.' + indexparent + '> .' + index + '> .score > .score-star';
                    star = '<img class="scoreg" src="'+ src +'" width="55px" align="absmiddle">';
                    $(index).append(star);
                }
                break;

            case "fourgrp":
                if($(this).find('.score-star').children().length < 9){
                    index = '.' + indexparent + '> .' + index + '> .score > .score-star';
                    star = '<img class="scoreg" src="'+ src +'" width="55px" align="absmiddle">';
                    $(index).append(star);
                }
                break;
        }



        // $('body').css('cursor','auto');
        // starflag = true;
        }
    })
})

//delete star
var stardeleteflag = true;
$(document).delegate('#deletestar', 'click', function(){

    
    if(!starflag)
        $('#currentstar').removeClass('flip animated');
    starflag = true;

    stardeleteflag =  !stardeleteflag;
    // $('.scorep').addClass('flip animated');
    // $('.scoreg').addClass('flip animated');

    $('.scorep , .scoreg').on('click',function(){
        if (!stardeleteflag){
            $(this).remove();
            // stardeleteflag = true;
            // $('.scorep').removeClass('flip animated');
            // $('.scoreg').removeClass('flip animated');
        }  
    })


    // if(stardeleteflag){
    //     $('.scorep').removeClass('flip animated');
    //     $('.scoreg').removeClass('flip animated');
    // }
})


$(document).delegate('#hidestar', 'click', function(){

    if(!stardeleteflag){
            stardeleteflag = true;
            $('.scorep').removeClass('flip animated');
            $('.scoreg').removeClass('flip animated');
        }

    if(!starflag){
            $('body').css('cursor','auto');
            starflag = true;
        }  
})

//top button change color
$(function(){
    $('#morestars').on('click',function(event) {
        if(!starflag)
            $('#currentstar').removeClass('flip animated');
        starflag = true;

        if(!stardeleteflag)
        {
            srcicon = $('#deletestar').find('img').attr('src').replace('_selected.svg','.svg');
            $('#deletestar').find('img').attr('src',srcicon);  
        }
        stardeleteflag = true;

        if(! $(this).find('img').attr('src').includes('selected'))
        {
            srcicon = $(this).find('img').attr('src').replace('.svg','_selected.svg');
            $(this).find('img').attr('src',srcicon);  
        }
        event.stopPropagation();
    })

    $('#deletestar').on('click',function(event) {
        if(! $(this).find('img').attr('src').includes('selected'))
        {
            srcicon = $(this).find('img').attr('src').replace('.svg','_selected.svg');
            $(this).find('img').attr('src',srcicon);  
        }
        else
        {
            srcicon = $(this).find('img').attr('src').replace('_selected.svg','.svg');
            $(this).find('img').attr('src',srcicon); 
        }
    })

    $(document).on('click', function(){
        if($('#morestars').find('img').attr('src').includes('selected'))
        {
            srcicon = $('#morestars').find('img').attr('src').replace('_selected.svg','.svg');
            $('#morestars').find('img').attr('src',srcicon);   
        }
    })   
})


//side button change color
$(function() {
    
    srcicon = $('#list_right').find('img').attr('src');
    srcicon = srcicon.replace('.svg','_selected.svg');
    $('#list_right').find('img').attr('src',srcicon);
    srcicon = $('#list_left').find('img').attr('src');
    srcicon = srcicon.replace('.svg','_selected.svg');
    $('#list_left').find('img').attr('src',srcicon);
    
    var prev = "list";

    $('.active').on('click', function(e){
        //recover last icon
        srcicon = $('#'+prev+'_left').find('img').attr('src');
        srcicon = srcicon.replace('_selected.svg','.svg');
        $('#'+prev+'_left').find('img').attr('src',srcicon);
        srcicon = $('#'+prev+'_right').find('img').attr('src');
        srcicon = srcicon.replace('_selected.svg','.svg');
        $('#'+prev+'_right').find('img').attr('src',srcicon);

        // blue new icon
        id  = $(this).attr('id');
        srcicon = $(this).find('img').attr('src');
        srcicon = srcicon.replace('.svg','_selected.svg');
        $(this).find('img').attr('src',srcicon);
        if(id.includes("left"))
        {
            prev = id.replace("_left","");
            id = id.replace("left","right");    
        }
        else
        {
            prev = id.replace("_right","");
            id = id.replace("right","left");
        }
        srcicon = $("#"+id).find('img').attr('src');
        srcicon = srcicon.replace('.svg','_selected.svg');
        $("#"+id).find('img').attr('src',srcicon);
    })

})


//side button function
$(function(){
    $(".student-menu").click(function() {
        $('.students').show();
        $('.groups').hide();
        $("#map").hide();
        $('#wheel').hide();
        $('.titleImage').attr('src','./media/Students.svg');
        $('body').css('background-image','url(./media/background.jpg)');
        $('.topbutton').show();
        $('#wheel').find("iframe").attr('src', $('#wheel').find("iframe").attr('src'));
        $('#map').find("iframe").attr('src', $('#map').find("iframe").attr('src'));
        
        // hidestudent();
        for(var i=0; i<3*max; i++)
        {
            used[i]=0;
        }

        if(!starflag)
        {
            $('#currentstar').removeClass('flip animated');
            starflag = true;
        }
        
        if(firsttime_team)
            teamed = true;

        // $(".groupmember").html("");
        // $(".score").html("<span>Scores:</span>");
    });
})

$(function(){
    $('.Spin-overlay-menu').click(function () {
        $('#wheel').show();
        $("#map").hide();
        $('.students').hide();
        $('.groups').hide();
        $('body').css('background-image','url(./media/background.jpg)');
        $('#map').find("iframe").attr('src', $('#map').find("iframe").attr('src'));
        $('.topbutton').hide();
        if(!starflag)
        {
            $('#currentstar').removeClass('flip animated');
            starflag = true;
        }
        if(firsttime_team)
            teamed = true;
    });
})

$(function(){
    $('.map-overlay-menu').click(function () {
        $('#map').show();
        $('#wheel').hide();
        $('.students').hide();
        $('.groups').hide();
        $('body').css('background-image','url(./media/background.jpg)');
        $('#wheel').find("iframe").attr('src', $('#wheel').find("iframe").attr('src'));
        $('.topbutton').hide();
        if(!starflag)
        {
            $('#currentstar').removeClass('flip animated');
            starflag = true;
        }
        if(firsttime_team)
            teamed = true;
    });
})

$(function(){
    $('.Timerpopup').click(function () {
        if(!starflag)
        {
            $('#currentstar').removeClass('flip animated');
            starflag = true;
        } 
    });
})


// Drag function
var drake;
$(function(){

    drake = dragula([$('.drag-layer:eq(0)')[0],$('.drag-layer:eq(1)')[0],$('.drag-layer:eq(2)')[0],$('.drag-layer:eq(3)')[0],
    $('.drag-layer:eq(4)')[0],$('.drag-layer:eq(5)')[0],$('.drag-layer:eq(6)')[0],$('.drag-layer:eq(7)')[0],$('.drag-layer:eq(8)')[0],
    $('.drag-layer:eq(9)')[0],$('.drag-layer:eq(10)')[0],$('.drag-layer:eq(11)')[0],$('.drag-layer:eq(12)')[0],$('.drag-layer:eq(13)')[0],$('.drag-layer:eq(14)')[0],$('.drag-layer:eq(15)')[0],
    $('.groupmember:eq(0)')[0],$('.groupmember:eq(1)')[0],$('.groupmember:eq(2)')[0],$('.groupmember:eq(3)')[0],$('.groupmember:eq(4)')[0],$('.groupmember:eq(5)')[0],$('.groupmember:eq(6)')[0],
    $('.groupmember:eq(7)')[0],$('.groupmember:eq(8)')[0]],
    {
      copy: function (el, source) {
        return source.classList.contains('drag-layer');
      },
      // isContainer: function (el) {
      //   return el.classList.contains('.drag');
      // },
      direction: 'horizontal',
      removeOnSpill: true,
      accepts: function (el, target) {return !(target.classList.contains('nodrag'));},
      moves: function (el, source, handle) {
        return el.className != 'grey'; 
      }
    }
    ).on('drop',function(el,target,source,sibling){
        // console.log($('drop').attr('class'));
        // console.log(target.parent.className);
        // console.log(el);
        // console.log(source);
        if(source.classList.contains('drag-layer'))
            {
                // console.log(source.id);
                $('#'+source.id).find('.drag').hide();
                el.id="clone"+source.id;
            }
        checknumber();

    }).on('remove',function(el,container,source){
        if(el.id.includes("clone")){
            idname = el.id.replace("clone","");
            // console.log(idname);
            $('#'+idname).find('.drag').show();
        }
        checknumber();

    }).on('drag',function(el,source){
            if(!starflag)
            {
                $('#currentstar').removeClass('flip animated');
                starflag = true;
            } 
    })
 
})


function checknumber() {
    $('.twogrp > .g1 > .groupmember , .twogrp > .g2 > .groupmember').each(function(){
        if($(this).children().length > 7)
            $(this).addClass('nodrag');
        else
            $(this).removeClass('nodrag');
    });

    $('.threegrp > .g1 > .groupmember , .threegrp > .g2 > .groupmember , .threegrp > .g3 > .groupmember').each(function(){
        if($(this).children().length > 5)
            $(this).addClass('nodrag');
        else
            $(this).removeClass('nodrag');
    });

    $('.fourgrp > .g1 > .groupmember , .fourgrp > .g2 > .groupmember , .fourgrp > .g3 > .groupmember , .fourgrp > .g4 > .groupmember').each(function(){
        if($(this).children().length > 3)
            $(this).addClass('nodrag');
        else
            $(this).removeClass('nodrag');
        // console.log($(this).children().length);
    });
}


// $(function(){
//     document.oncontextmenu = function(){
//         return false;
//     }
//     document.onselectstart = function() {
//         return false;
//     }
//     document.onselectstart = function(){
//         return false;
//     }
// })
