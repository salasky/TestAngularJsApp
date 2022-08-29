angular
    .module('app')
    .controller('Person.IndexController', ['$scope', '$http', '$uibModal',
        function ($scope, $http, $uibModal) {
            _refreshCustomerData();
            $scope.department="";
            $scope.job="";
            $scope.organization="";

            /* Private Methods */
            //HTTP GET- get all organizations collection
            function _refreshCustomerData() {
                $scope.persons=[];
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/persons'
                }).then(function successCallback(response) {
                    $scope.persons = response.data;
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

            $scope.openModal = function (person) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'person/modalWindow.html',
                    controller  : 'PersonModalController',
                    backdrop:false,
                    size:'m',
                    animation:true,
                    resolve: {
                        syncData: () => person,
                    }
                });
                return modalInstance;
            };

            function staffInfoGet(person) {


                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/departments/'+person.departmentId
                }).then(function successCallback(response) {
                    $scope.department = response.data;
                    //После загрузки информации о департаменте, загружаем информацию о организации
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8080/organizations/'+ $scope.department.organizationId
                    }).then(function successCallback(response) {
                        $scope.organization = response.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });

                }, function errorCallback(response) {
                    console.log(response.statusText);
                });

                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/jobs/'+person.jobTittleId
                }).then(function successCallback(response) {
                    $scope.job = response.data;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
            };

            $scope.activeTabNo = 0;
            $scope.tabs = [];

            $scope.info = function(person) {
                staffInfoGet(person);
                var tabNo = person.secondName+person.id.charCodeAt(0)+person.id.charCodeAt(2);
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


            $scope.openDepartmentModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl : 'department/modalWindow.html',
                    controller  : 'DepartmentModalController',
                    backdrop:false,
                    size:'m',
                    animation:true,
                    resolve: {
                        syncData: () => $scope.department,
                    }
                });
                return modalInstance;
            };

            $scope.openJobModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl : 'job/modalWindow.html',
                    controller  : 'jobsModalController',
                    backdrop:false,
                    size:'m',
                    animation:true,
                    resolve: {
                        syncData: () => $scope.job,
                    }
                });
                return modalInstance;
            };

        }]);



