(function () {
    'use strict';

    angular
        .module('app')
        .controller('About.IndexController', Controller);

    function Controller($scope) {
        var vm = this;

        initController();

        function initController() {
            $scope.text='Look! I am an about page.'
        }
    }

})();