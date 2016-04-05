(function() {
    function PomodoroCtrl(WorkTimer, $firebaseArray) {
        var vm = this;
        var clicked = false;

        
        var ref = new Firebase('https://bloctime-sjb.firebaseio.com/users/1/messages');
		vm.messages = $firebaseArray(ref)
        
        
        vm.workTimer = WorkTimer;
        
        
//        window.foo = WorkTimer;
        
        window.foo = vm.messages;
        
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
        .controller('PomodoroCtrl', ['WorkTimer', "$firebaseArray", PomodoroCtrl]);
})();