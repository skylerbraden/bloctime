(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        
        $stateProvider
            .state('pomodoro', {
                url: '/',
                controller: 'PomodoroCtrl as pomodoro',
                templateUrl: '/templates/pomodoro.html'
            });
    }
    
    angular
        .module('bloctime', ['ui.router', 'firebase'])
        .config(config);
 })();