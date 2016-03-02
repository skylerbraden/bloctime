(function() {
    function PomodoroCtrl(WorkTimer) {
        this.countdownClock = "25:00";
        this.workTimer = WorkTimer;
    }
    
    angular
        .module('bloctime')
        .controller('PomodoroCtrl', ['WorkTimer', PomodoroCtrl]);
})();