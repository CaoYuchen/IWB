$(function() {
	
	
$(document).delegate('#reset', 'click', function() {
        $('.clothes').show();
        $('.boyDress').hide();
        $('.girlDress').hide();
    })


// Drag function
var drakeBoy, drakeGirl;
$(function(){

    drakeBoy = dragula([$('.clothesBox1')[0], $('.boyBox')[0]],
    {
      copy: function (el, source) {
        return el.classList.contains('clothes');
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
        return el.className != 'background' && el.className != 'boyDress'; 
      }
    }
    ).on('drop',function(el,target,source,sibling){
        // console.log($('drop').attr('class'));
        // console.log(target.className);
        // console.log(el);
        // console.log(source);
        if(source.classList.contains('clothesBox1'))
        {
            $('#'+el.id).hide();
            $('#'+el.id+'Dress').show();
            el.id='clone'+el.id;
            $('#'+el.id).remove();			
        }
        // if(source.classList.contains('boyBox'))
        // {
        // 	var name= el.id.replace('Dress','');
        //     $('#'+el.id).hide();
        //     $('#'+name).show();
        //     el.id='clone'+el.id;
        //     $('#'+el.id).remove();
        // }

    })


    drakeGirl = dragula([$('.clothesBox2')[0], $('.girlBox')[0]],
    {
      copy: function (el, source) {
        return el.classList.contains('clothes');
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
        return el.className != 'background' && el.className != 'girlDress'; 
      }
    }
    ).on('drop',function(el,target,source,sibling){
        // console.log($('drop').attr('class'));
        // console.log(target.className);
        // console.log(el);
        // console.log(source);

        if(source.classList.contains('clothesBox2'))
        {
            $('#'+el.id).hide();
            $('#'+el.id+'Dress').show();
            //switch skirt, dress and shorts
            if(el.id == 'skirt' || el.id == 'shorts')
            {
              // console.log("choose mode");
              $('#skirt,#dress,#shorts').show();
              $('#'+el.id).hide();
              $('#skirtDress,#dressDress,#shortsDress').hide();
              $('#'+el.id+'Dress').show();
            }
            else if(el.id == 'dress')
            {
              $('#skirt,#sweater,#shorts').show();
              $('#'+el.id).hide();
              $('#skirtDress,#sweaterDress,#shortsDress').hide();
              $('#'+el.id+'Dress').show();
            }
            else if(el.id == 'sweater')
            {
              $('#dress').show();
              $('#'+el.id).hide();
              $('#dressDress').hide();
              $('#'+el.id+'Dress').show();
            }

            el.id='clone'+el.id;
            $('#'+el.id).remove();      
        }


    })
 
})



})

