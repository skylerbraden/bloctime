(function() {
    function WorkTimer($interval) {
        var WorkTimer = {};
        var currentInterval;
        var completedPomodoros;
        WorkTimer.currentTime = 5;
        
        WorkTimer.startWork = function() {
            currentInterval = $interval(function(){
                
                if(WorkTimer.currentTime > 0){
                    WorkTimer.currentTime--;
                }else{
                    $interval.cancel(currentInterval);
                    pomodoroCompleted();
                }
                console.log(WorkTimer.currentTime);
            }, 1000);
            
            // Why is this not working? Do we need some sort of a promise?
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