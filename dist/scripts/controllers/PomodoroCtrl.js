(function() {
    function PomodoroCtrl(WorkTimer, $firebaseObject) {
        var vm = this;
        vm.workTimer = WorkTimer;
		var ref = new Firebase("https://bloctime-sjb.firebaseio.com");
    }
        
    angular
        .module('bloctime')
        .controller('PomodoroCtrl', ['WorkTimer', PomodoroCtrl]);
})();