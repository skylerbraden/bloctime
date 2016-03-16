(function() {
    function WorkTimer($interval) {
        var WorkTimer = {};
        var currentInterval;
        WorkTimer.completedPomodoros = 0;
        WorkTimer.currentTime = 8;
        WorkTimer.maxTime = 8;
        WorkTimer.counting = false;
        
        WorkTimer.startWork = function() {
            currentInterval = $interval(function(){
                
                if(WorkTimer.currentTime > 0) {
                    WorkTimer.currentTime--;
                    WorkTimer.counting = true;
                }else {
                    $interval.cancel(currentInterval);
                    workCompleted();
                    WorkTimer.counting = false;
                }
            }, 1000);
            
        };
        
        WorkTimer.startBreak = function() {
        	currentInterval = $interval(function(){
                
                if(WorkTimer.currentTime > 0) {
                    WorkTimer.currentTime--;
                    WorkTimer.counting = true;
                }else {
                    $interval.cancel(currentInterval);
                    WorkTimer.counting = false;
					breakCompleted();
                }
            }, 1000);
        };
        
        WorkTimer.pauseWork = function() {
            $interval.cancel(currentInterval);
            WorkTimer.counting = false;
        };
        
        WorkTimer.resetWork = function() {
            $interval.cancel(currentInterval);
			if(WorkTimer.maxTime == 8) {
				WorkTimer.currentTime = 8;
				WorkTimer.maxTime = 8;
				WorkTimer.counting = false;
			} else{
				WorkTimer.currentTime = 5;
				WorkTimer.maxTime = 5;
				WorkTimer.counting = false;
			}
        };
		
		WorkTimer.clearPomodoros = function() {
			$interval.cancel(currentInterval);
			WorkTimer.completedPomodoros = 0;
			WorkTimer.currentTime = 8;
			WorkTimer.maxTime = 8;
			WorkTimer.counting = false;
		};
        
        function workCompleted() {
            WorkTimer.currentTime = 5;
            WorkTimer.maxTime = 5;
            WorkTimer.completedPomodoros++;
			console.log(WorkTimer.completedPomodoros);
        }
        
        function breakCompleted() {
            WorkTimer.currentTime = 8;
            WorkTimer.maxTime = 8;
        }
        
        return WorkTimer;
    }
           
    
    angular
        .module('bloctime')
        .factory('WorkTimer', ['$interval', WorkTimer]);
})();