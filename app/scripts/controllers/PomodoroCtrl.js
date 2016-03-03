(function() {
    function PomodoroCtrl(WorkTimer) {
        var vm = this;
        vm.workTimer = WorkTimer;
        
//        $scope.$watch("WorkTimer.currentTime", function() {
//            if(WorkTimer.currentTime === 0) {
//                alert("Your pomodoro is up! Take a break!");
//            }
//        });
    }
    
    angular
        .module('bloctime')
        .controller('PomodoroCtrl', ['WorkTimer', PomodoroCtrl]);
})();