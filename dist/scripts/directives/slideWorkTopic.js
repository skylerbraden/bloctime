(function() {
  function slideWorkTopic() {
	     return {
	         replace: true,
	         restrict: 'A',
	         link: function(scope, element, attributes){
                 
                 var clicked = false;
                 
                 slideLeft = attributes.slideLeft
                 
                 $(element).click(function(){
                     
                    if(clicked == false) {
                        $(element).parent().animate({
                            left: '0px'
                        }, 1400);
                        clicked = true;
                    }else {
                        $(element).parent().animate({
                            left: '-410px'
                        }, 1400);
                        clicked = false;
                    }
                     console.log(element)
                 });

	         }
	     };
	 }

 	angular
		.module('bloctime')
		.directive('slideWorkTopic', [slideWorkTopic]);
 })();