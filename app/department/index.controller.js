angular
    .module('app')
    .controller('Department.IndexController', ['$scope', '$http', '$uibModal',

        function ($scope, $http, $uibModal, uiGridConstants) {


            _refreshCustomerData();

            $scope.deleteDepartment = function (department) {
                $http({
                    method: 'DELETE',
                    url: 'http://localhost:8080/departments/' + department.id
                }).then(_success, _error);
            };

            /* Private Methods */
            //HTTP GET- get all organizations collection
            function _refreshCustomerData() {
                $scope.departments=[];
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/departments'
                }).then(function successCallback(response) {
                    $scope.departments = response.data;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
            }

            function _success(response) {
                _refreshCustomerData();
            }

            function _error(response) {
                console.log(response);
                alert($scope.error_message = "Error! " + response.data.errorMessage + response.data.timestamp);

            }

            $scope.openInfo=function (department) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/organizations/' + department.organizationId
                }).then(_success, _error);
            };


            $scope.openModal = function (department) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'department/modalWindow.html',
                    controller  : 'DepartmentModalController',
                    backdrop:false,
                    size:'m',
                    animation:true,
                    resolve: {
                        syncData: () => department,
                    }
                });
                return modalInstance;
            };

            $scope.tabs = [{
                title: 'Tab 01',
                content: 'Dynamic content 1'
            }];

            $scope.removeTab = function(i) {
                console.log("Removing tab: " + i);
                $scope.tabs.splice(i, 1);
            };

            $scope.foo = 'FOO';
            $scope.bar = 'BAR';

            $scope.addTab = function() {
                var len = $scope.tabs.length + 1;
                var numLbl = '' + ((len > 9) ? '' : '0') + String(len);

                var mrkUp = '<div>' +
                    '<h1>New Tab ' + numLbl + ' {{foo}}</h1>' +
                    '<div ng-include="tab.tabUrl"></div>' +
                    '</div>';

                $scope.tabs.push({
                    title: 'Tab ' + numLbl,
                    content: mrkUp,
                    tabUrl: 'includeFile.html'
                });
            };
        }]);

