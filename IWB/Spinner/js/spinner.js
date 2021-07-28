
$(function(){
    $(".Spin-overlay-menu").click(function() {
    $(".Spin-overlay").addClass('Spin-overlay-open');
    });

    $(".Spin-overlay-close").click(function() {
        $(".Spin-overlay").removeClass('Spin-overlay-open');
    });
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
// })
