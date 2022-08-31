angular
    .module('app')
    .controller('TaskDocument.IndexController', ['$scope', '$http', '$uibModal',

        function ($scope, $http, $uibModal) {
            _refreshDocuments();

            function _refreshDocuments() {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/taskdocuments'
                }).then(function successCallback(response) {
                    $scope.taskdocuments = response.data;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
            }


            function personInfo (taskDocument) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/persons/'+taskDocument.authorId
                }).then(function successCallback(response) {
                    $scope.author = response.data;

                    let tabNo =  taskDocument;
                    tabNo.author=$scope.author;
                    tabNo.index= taskDocument.name+' '+taskDocument.id.substring(0,3)
                    $scope.tabs.push(tabNo);
                    $scope.activeTabNo =  tabNo;

                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
            };




            $scope.openModal = function (taskDocument) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'taskdocument/modalWindow.html',
                    controller  : 'TaskDocumentModalController',
                    backdrop:false,
                    size:'m',
                    animation:true,
                    resolve: {
                        syncData: () => taskDocument,
                    }
                });
                return modalInstance;
            };


            $scope.activeTabNo = 0;
            $scope.tabs = [];


            $scope.info = function(taskDocument) {
                personInfo(taskDocument);
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



