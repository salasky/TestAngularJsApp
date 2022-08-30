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

            function organizationInfo (department) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/organizations/'+department.organizationId
                }).then(function successCallback(response) {
                    $scope.organization = response.data;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
            };

            $scope.openOrganizationModal=function (){
                var modalInstance = $uibModal.open({
                    templateUrl : 'organization/modalWindow.html',
                    controller  : 'modalController',
                    backdrop:false,
                    size:'m',
                    animation:true,
                    resolve: {
                        syncData: () => $scope.organization,
                    }
                });
                return modalInstance;
            }


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


            $scope.activeTabNo = 0;
            $scope.tabs = [];
            $scope.department="";

            $scope.info = function(department) {
                organizationInfo(department);
                var tabNo = department.shortName+department.id.charCodeAt(0)+department.id.charCodeAt(1);
                $scope.tabs.push(tabNo);
                $scope.activeTabNo = tabNo;
            };
            $scope.remove = function(index) {
                if (index === 0) {
                    if ($scope.activeTabNo === $scope.tabs[0]) {
                        $scope.activeTabNo = 0;
                    }
                } else {
                    if ($scope.activeTabNo === $scope.tabs[index]) {
                        $scope.activeTabNo = $scope.tabs[index - 1];
                    }
                }
                $scope.tabs.splice(index, 1);
            };
            $scope.activeTab = function(tabNo) {
                $scope.activeTabNo = tabNo;
            };

        }]);
