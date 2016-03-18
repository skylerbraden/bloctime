(function() {
    function PomodoroCtrl(WorkTimer) {
        var vm = this;
        vm.workTimer = WorkTimer;
		
		
		this.list = [];
		this.text = 'hello';
		this.submit = function() {
			if (this.submit) {
				this.list.push(this.text);
				this.text = '';
			}
		};
    }
        
    angular
        .module('bloctime')
        .controller('PomodoroCtrl', ['WorkTimer', PomodoroCtrl]);
})();