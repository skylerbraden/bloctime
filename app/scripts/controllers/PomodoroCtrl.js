(function() {
    function PomodoroCtrl(WorkTimer, $firebaseArray, $scope) {
        var vm = this;
        var clicked = false;
        var ding = new buzz.sound('/assets/sounds/airplane-ding.wav', {
            preload: true
        });

        
        var ref = new Firebase('https://bloctime-sjb.firebaseio.com/users/1/messages');
		vm.messages = $firebaseArray(ref)
        
        
        vm.workTimer = WorkTimer;
        
        vm.addMessage = function(){
//            vm.workTimer.user.message = vm.message;
//            vm.workTimer.user.$save();
            vm.messages.$add({text: vm.message, time: Firebase.ServerValue.TIMESTAMP});
            vm.message = "";
        }
        
        vm.getMessageTime = function() {
            
        }
        
        vm.removeMessage = function(message) {
            vm.messages.$remove(message);
        }
        
//        (1) Value to watch, 
//        (2) function to call when (1) changes, (2) is a closure, and has access to newValue and oldValue
//        
        
        $scope.$watch(function(){
          return WorkTimer.currentTime
        }, function(newValue, oldValue) {
            if(newValue == 0) {
                ding.play();
            }
        });
        

        

        //jQuery Version
//        vm.slideWorkTopic = function() {
//            if(clicked == false) {
//                $('.work-topic').animate({
//                    left: '0px'
//                }, 1400);
//                $('.slide-button').animate({
//                    left: '400px'
//                }, 1400);
//                clicked = true;
//            }else {
//                $('.work-topic').animate({
//                    left: '-410px'
//                }, 1400);
//                $('.slide-button').animate({
//                    left: '0px'
//                }, 1400);
//                clicked = false;
//            }
//        }
    }
        
    angular
        .module('bloctime')
        .controller('PomodoroCtrl', ['WorkTimer', "$firebaseArray", "$scope", PomodoroCtrl]);
})();