(function() {
    function WorkTimer($interval) {
        var WorkTimer = {};
        var currentInterval;
        var completedPomodoros;
        WorkTimer.currentTime = 8;
        WorkTimer.maxTime = 8;
        WorkTimer.pomComplete = false;
        WorkTimer.counting = null;
        
        WorkTimer.startWork = function() {
            currentInterval = $interval(function(){
                
                if(WorkTimer.currentTime > 0) {
                    WorkTimer.currentTime--;
                    WorkTimer.counting = true;
                }else {
                    $interval.cancel(currentInterval);
                    pomodoroCompleted();
                    WorkTimer.counting = false;
                }
            }, 1000);
            
        };
        
        WorkTimer.pauseWork = function() {
            $interval.cancel(currentInterval);
            WorkTimer.counting = false;
        };
        
        WorkTimer.resetWork = function() {
            $interval.cancel(currentInterval);
            WorkTimer.currentTime = 8;
            WorkTimer.maxTime = 8;
        };
                
        
        function pomodoroCompleted(){
            WorkTimer.currentTime = 5;
            WorkTimer.maxTime = 5;
            WorkTimer.pomComplete = true;
            completedPomodoros++;
        }
        
        return WorkTimer;
    }
           
    
    angular
        .module('bloctime')
        .factory('WorkTimer', ['$interval', WorkTimer]);
})();