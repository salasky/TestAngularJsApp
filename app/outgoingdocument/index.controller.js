angular
    .module('app')
    .controller('OutgoingDocument.IndexController', ['$scope', '$http', '$uibModal',

        function ($scope, $http, $uibModal) {
            _refreshOutgoingDocuments();

            function _refreshOutgoingDocuments() {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/outgoingdocuments'
                }).then(function successCallback(response) {
                    $scope.outgoingdocuments = response.data;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
            }


            function personInfo (outgoingDocument) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/persons/'+outgoingDocument.authorId
                }).then(function successCallback(response) {
                    $scope.author = response.data;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
            };




            $scope.openModal = function (outgoingDocument) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'outgoingdocument/modalWindow.html',
                    controller  : 'OutgoingDocumentModalController',
                    backdrop:false,
                    size:'m',
                    animation:true,
                    resolve: {
                        syncData: () => outgoingDocument,
                    }
                });
                return modalInstance;
            };


            $scope.activeTabNo = 0;
            $scope.tabs = [];
            $scope.outgoingDocument="";

            $scope.info = function(outgoingDocument) {
                personInfo(outgoingDocument);
                $scope.outgoingdocument=outgoingDocument;
                var tabNo = outgoingDocument.name+outgoingDocument.id.charCodeAt(0)+outgoingDocument.id.charCodeAt(1);
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



