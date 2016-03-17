(function() {
    function WorkTimer($interval, $firebaseObject, $firebaseArray) {
		var ref = new Firebase('https://bloctime-sjb.firebaseio.com/users/1');
		var user = $firebaseObject(ref)
		var WorkTimer = {};
		
		user.$loaded().then(function(){
			if(user.completedPomodoros == null){
				user.completedPomdoros = 0;
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
			WorkTimer.completedPomodoros = 0;
			WorkTimer.currentTime = 8;
			WorkTimer.maxTime = 8;
			WorkTimer.counting = false;
		};
        
        function workCompleted() {
            WorkTimer.currentTime = 5;
            WorkTimer.maxTime = 5;
            WorkTimer.user.completedPomodoros++;
			WorkTimer.user.$save();
			console.log(WorkTimer.user.completedPomodoros);
        }
        
        function breakCompleted() {
            WorkTimer.currentTime = 8;
            WorkTimer.maxTime = 8;
        }
		
		
		
//		//firebase
//		return function($firebaseObject) {
//			var randomSessionId = math.round(Math.random() * 1000);
//			var ref = new Firebase('https://bloctime-sjb.firebaseio.com/data/1');
////		}
//		foo = $firebaseObject(ref)
//		
//		window.foo = foo;
//        foo.zebra = "value"
//		
//		var ref2 = new Firebase('https://bloctime-sjb.firebaseio.com/data/2');
//		
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
        .factory('WorkTimer', ['$interval', '$firebaseObject', '$firebaseArray', WorkTimer]);
})();