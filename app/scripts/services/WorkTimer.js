(function() {
    function WorkTimer() {
        var WorkTimer = {};
        
        WorkTimer.startTimer = function(duration, display) {
            var timer = duration, minutes, seconds;
            $interval(function() {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                
                display.textContent = minutes + ":" + seconds;
                
                if(--timer < 0) {
                    timer = duration;
                }
                
                
            }, 1000);
        }
        
        var twentyFiveMinutes = 60 * 25;
        
        WorkTimer.startTimer(twentyFiveMinutes, display);
    }
            
    };
           
        return WorkTimer;
    }
    
    angular
        .module('bloctime')
        .factory('WorkTimer', WorkTimer);
})();