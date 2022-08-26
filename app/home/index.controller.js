(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(ModalService) {
        var vm = this;

        vm.openModal = openModal;
        vm.closeModal = closeModal;

        initController();

        function initController() {
        }

        function openModal(id){
            ModalService.Open(id);
        }

        function closeModal(id){
            ModalService.Close(id);
        }
    }

})();