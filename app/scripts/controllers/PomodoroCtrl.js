(function() {
    function PomodoroCtrl(WorkTimer) {
        var vm = this;
        vm.workTimer = WorkTimer;


    }
    
    angular
        .module('bloctime')
        .controller('PomodoroCtrl', ['WorkTimer', PomodoroCtrl]);
})();