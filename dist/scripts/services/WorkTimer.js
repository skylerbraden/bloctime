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
     
        WorkTimer.currentTime = 8;
        WorkTimer.maxTime = 8;
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
			if(WorkTimer.maxTime == 8) {
				WorkTimer.currentTime = 8;
				WorkTimer.maxTime = 8;
				WorkTimer.counting = false;
			} else{
				WorkTimer.currentTime = 5;
				WorkTimer.maxTime = 5;
				WorkTimer.counting = false;
			}
        };
		
		WorkTimer.clearPomodoros = function() {
			$interval.cancel(currentInterval);
			WorkTimer.user.completedPomodoros = 0;
			WorkTimer.user.$save();
			WorkTimer.currentTime = 8;
			WorkTimer.maxTime = 8;
			WorkTimer.counting = false;
		};
        
        function workCompleted() {
            WorkTimer.currentTime = 5;
            WorkTimer.maxTime = 5;
			//firebase
            WorkTimer.user.completedPomodoros++;
			WorkTimer.user.$save();
			console.log(WorkTimer.user.completedPomodoros);
        }
        
        function breakCompleted() {
            WorkTimer.currentTime = 8;
            WorkTimer.maxTime = 8;
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