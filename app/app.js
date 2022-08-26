

 angular.module('app', ['ui.router','ngTouch','ngAnimate','ui.bootstrap'])
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
            })
            .state('organization', {
                url: '/organization',
                templateUrl: 'organization/index.view.html',
                controller: 'Organization.IndexController',
                controllerAs: 'vm'
            })
            .state('department', {
                url: '/department',
                templateUrl: 'department/index.view.html',
                controller: 'Department.IndexController',
                controllerAs: 'vm'
            });
    }

    function run() {
    };

    app.directive('compileHtml', ['$sce', '$parse', '$compile',
     function($sce, $parse, $compile) {
         return {
             restrict: 'A',
             compile: function ngBindHtmlCompile(tElement, tAttrs) {
                 var ngBindHtmlGetter = $parse(tAttrs.compileHtml);
                 var ngBindHtmlWatch = $parse(tAttrs.compileHtml, function getStringValue(value) {
                     return (value || '').toString();
                 });
                 $compile.$$addBindingClass(tElement);

                 return function ngBindHtmlLink(scope, element, attr) {
                     $compile.$$addBindingInfo(element, attr.compileHtml);

                     scope.$watch(ngBindHtmlWatch, function ngBindHtmlWatchAction() {

                         element.html($sce.trustAsHtml(ngBindHtmlGetter(scope)) || '');
                         $compile(element.contents())(scope);
                     });
                 };
             }
         };
     }
 ]);