(function() {
    function WorkTimer($interval, $firebaseObject) {
		var ref = new Firebase('https://bloctime-sjb.firebaseio.com/users/1');
		var user = $firebaseObject(ref)
		var WorkTimer = {};
		
		user.$loaded().then(function(){
			if(user.completedPomodoros == null){
				user.completedPomodoros = 0;
                user.message = "Test";
				user.$save();
			}
			
		 	WorkTimer.user = user;			
		})
		
        var currentInterval;

        WorkTimer.WORK_SESSION = (25*60);
        WorkTimer.BREAK_SESSION = (5*60);
        WorkTimer.currentTime = WorkTimer.WORK_SESSION;
        WorkTimer.maxTime = WorkTimer.WORK_SESSION;
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
			if(WorkTimer.maxTime == WorkTimer.WORK_SESSION) {
				WorkTimer.currentTime = WorkTimer.WORK_SESSION;
				WorkTimer.maxTime = WorkTimer.WORK_SESSION;
				WorkTimer.counting = false;
			} else{
				WorkTimer.currentTime = WorkTimer.BREAK_SESSION;
				WorkTimer.maxTime = WorkTimer.BREAK_SESSION;
				WorkTimer.counting = false;
			}
        };
		
		WorkTimer.clearPomodoros = function() {
			$interval.cancel(currentInterval);
			WorkTimer.user.completedPomodoros = 0;
			WorkTimer.user.$save();
			WorkTimer.currentTime = WorkTimer.WORK_SESSION;
			WorkTimer.maxTime = WorkTimer.WORK_SESSION;
			WorkTimer.counting = false;
		};
        
        function workCompleted() {
            WorkTimer.currentTime = WorkTimer.BREAK_SESSION;
            WorkTimer.maxTime = WorkTimer.BREAK_SESSION;
			//firebase
            WorkTimer.user.completedPomodoros++;
			WorkTimer.user.$save();
			console.log(WorkTimer.user.completedPomodoros);
        }
        
        function breakCompleted() {
            WorkTimer.currentTime = WorkTimer.WORK_SESSION;
            WorkTimer.maxTime = WorkTimer.WORK_SESSION;
        }
        
//        WorkTimer.userUpdate = function() {
//            alert(pomodoro.workTimer.user.message)
////            WorkTimer.user.message = angular.copy(message);
////            WorkTimer.user.$save();
//        };
        		
		

//		foo2 = $firebaseArray(ref2);
//		
//		foo2.$add("test1")
//		
//		window.giraffe = foo2;
//		
        return WorkTimer;
    }
           
    
    angular
        .module('bloctime')
        .factory('WorkTimer', ['$interval', '$firebaseObject', WorkTimer]);
})();