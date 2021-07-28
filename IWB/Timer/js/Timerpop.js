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
var timer;
(function() {

    function TimerPopLayer(args) {
        //初始化参数
        this.title = args.title || "";
        this.content = args.content || "";
        this.isModal = (typeof args.isModal === "boolean") ? args.isModal : true;
        this.moveable = (typeof args.moveable === "boolean") ? args.moveable : true;
        this.document = args.document || document;
        //辅助参数
        this.isDown = false; //鼠标是否在弹层标题栏按下
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

    TimerPopLayer.prototype = {

        init: function() {
            this.initContent(); //初始化内容
            this.initEvent(); //初始化行为
        },

        initContent: function() {
            if (this.isModal) {
                $("body", this.document).append(this.myModal);
                this.myModal.show();
            }
            $("body", this.document).append(this.myPop);
            // $(".TimerPop-title-value", this.myPop).html(this.title);//设置标题
            this.myPop.css("top", (this.document.documentElement.clientHeight - this.myPop.height()) / 2 + "px");
            this.myPop.css("left", (this.document.documentElement.clientWidth - this.myPop.width()) / 2 + "px");
            this.myPop.show();
        },

        initEvent: function() {
            var $this = this;
            //鼠标按下事件
            $(".TimerPop-title", this.myPop).on("mousedown", function(e) {
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
            //关闭事件
            $(".TimerPop-close", this.myPop).on('click', function() {
                $this.destroy();
                //button color
                srcicon = $('#timer_left').find('img').attr('src');
                srcicon = srcicon.replace('_selected.svg', '.svg');
                $('#timer_left').find('img').attr('src', srcicon);
                srcicon = $('#timer_right').find('img').attr('src');
                srcicon = srcicon.replace('_selected.svg', '.svg');
                $('#timer_right').find('img').attr('src', srcicon);

                return false;
            });
            //minimize
            $(".TimerPop-minimize").on('click', function() {
                $('.TimerModal').hide();
                $('.TimerPop').hide();
                $('.mini').show();
                $('.Timerpopup').attr('disabled', true);
            });
        },

        getElement: function() {
            return {
                "myModal": $("<div class='TimerModal'></div>", this.document),
                "myPop": $("<div class='TimerPop'>" +
                    "<h2 class='TimerPop-title'>" +
                        "<span class='TimerPop-title-value'></span>" +

                    "</h2>" + 
                    "<div class='TimerPop-content'>" +
                    "<span class='TimerPop-close'><img src='./media/close.svg' width='38px'></span>" +
                    "<span class='TimerPop-minimize'><img src='./Timer/media/mini.svg' width='40px'></span>" +
                    this.content +
                    "</div>" +
                    "</div>", this.document)
            };
        },

        destroy: function() {
            //清除显示层
            this.myPop.remove();
            //清除存在的遮罩层
            if (this.isModal) {
                this.myModal.remove();
            }
        }
    };



    // top.TimerPopLayer = TimerPopLayer;
    timer = TimerPopLayer;


})();


$(function() {
    $(document).delegate('#maximize', 'click', function(event) {
        $('.TimerModal').show();
        $('.TimerPop').show();
        $('.mini').hide();
        $('.Timerpopup').attr('disabled', false);
    });
});

$(function() {
    $(document).delegate('#close', 'click', function(event) {
        $(".TimerPop-close").click();
        $('.mini').hide();
        $('.Timerpopup').attr('disabled', false);
    });
});


startflag = true;
$(function() {
    $(document).delegate('#play', 'click', function(event) {
        frame = $('#frame').contents();
        // console.log(frame);
        frame.find('#start').click();
        // $('#play').hide();
        // $('#pasue').show();

    });
});


$(function() {
    $(document).delegate('#pause', 'click', function(event) {
        frame = $('#frame').contents();
        frame.find('#pause').click();
        // $('#pause').hide();
        // $('#play').show();
    });
});


$(function() {
    function syn() {
        frame = $('#frame').contents();
        $('#minutes').text(frame.find('.minutes').text());
        $('#seconds').text(frame.find('.seconds').text());
        if (frame.find('#start').css('display') === 'none') {
            $('#play').hide();
            $('#pause').show();
        } else {
            $('#pause').hide();
            $('#play').show();
        }
        // if($('#minutes').text() == "00" && $('#seconds').text() == "00")
        // {
        // 	$('#separator').text("");
        // }
    };
    var interval = setInterval(syn, 500);
})

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
// });
$(document).delegate('.Timerpopup', 'click', function() {
    new timer({
        "title": "",
        "content": "<iframe id='frame' src='./Timer/html/countdown.html' frameborder='0' scrolling='no' height='100%' width='100%'></iframe>"
    });

    srcicon = $('#timer_left').find('img').attr('src');
    srcicon = srcicon.replace('.svg', '_selected.svg');
    $('#timer_left').find('img').attr('src', srcicon);
    srcicon = $('#timer_right').find('img').attr('src');
    srcicon = srcicon.replace('.svg', '_selected.svg');
    $('#timer_right').find('img').attr('src', srcicon);
});


//drag mini window
$(function() {
    dragElement(document.getElementById("mini"));

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id)) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
})


$(function() {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var touched = false;
    var elmnt = $('.mini')[0];

    $('.minitimer').on('touchstart', function(e) {
        // get the mouse cursor position at startup:
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        touched = true;

    });
    $('.minitimer').on('touchmove', function(e) {
        
        // calculate the new cursor position:
        if (touched) {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            // set the element's new position:
            $('.mini').css('top', (elmnt.offsetTop - pos2) + "px");
            $('.mini').css('left', (elmnt.offsetLeft - pos1) + "px");
        }
        e.preventDefault();

    });

    $('.minitimer').on('touchend', function(e) {
        touched = false;
        e.preventDefault();
    });

})