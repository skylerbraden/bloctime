(function() {
    function WorkTimer($interval) {
        var WorkTimer = {};
        var currentInterval;
        WorkTimer.currentTime = 999;
        
        WorkTimer.startWork = function() {
            currentInterval = $interval(function(){
                WorkTimer.currentTime--;
            }, 1000)
        }
        
        WorkTimer.resetWork = function() {
            $interval.cancel(currentInterval);
            WorkTimer.currentTime = 999;
        }
        
        return WorkTimer;
    }
           
    
    angular
        .module('bloctime')
        .factory('WorkTimer', ['$interval', WorkTimer]);
})();