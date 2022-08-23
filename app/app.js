(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('test-page', {
                url: '/test-page',
                templateUrl: 'test-page/index.view.html',
                controller: 'TestPage.IndexController',
                controllerAs: 'vm'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'about/index.view.html',
                controller: 'About.IndexController',
                controllerAs: 'vm'
            })
            .state('job', {
                url: '/job',
                templateUrl: 'job/index.view.html',
                controller: 'Job.IndexController',
                controllerAs: 'vm'
            });




    }

    function run() {
    }
})();