angular
    .module('app')
    .controller('Department.IndexController', ['$scope', '$http', '$uibModal','restapi',

        function ($scope, $http, $uibModal, restapi) {

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
        }])
