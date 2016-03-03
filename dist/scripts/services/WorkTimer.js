(function() {
    function WorkTimer($interval) {
        var WorkTimer = {};
        var currentInterval;
        var completedPomodoros;
        WorkTimer.currentTime = 5;
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
            WorkTimer.currentTime = 5;
        };
        
        return WorkTimer;
        
        
        
        
        function pomodoroCompleted(){
            WorkTimer.currentTime = 2;
            completedPomodoros++;
        }
    }
           
    
    angular
        .module('bloctime')
        .factory('WorkTimer', ['$interval', WorkTimer]);
})();