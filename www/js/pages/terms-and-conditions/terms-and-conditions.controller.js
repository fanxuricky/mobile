/**
 * @name accept terms and conditions controller
 * @author Nazanin Reihani Haghighi
 * @contributors []
 * @since 12/14/2016
 * @copyright Binary Ltd
 */

(function() {
    'use strict';

    angular
        .module('binary.pages.terms-and-conditions.controllers')
        .controller('TermsAndConditionsController', TermsAndConditions);

    TermsAndConditions.$inject = ['$scope', 'websocketService', 'alertService'];

    function TermsAndConditions($scope, websocketService, alertService) {
        var vm = this;
        vm.data = {};
        vm.data.landingCompanyName = localStorage.getItem('landingCompanyName');
        vm.data.linkToTermAndConditions = "https://www.binary.com/" + (localStorage.getItem('language') || "en") + "/terms-and-conditions.html";

        vm.updateUserTermsAndConditions = function() {
            websocketService.sendRequestFor.TAndCApprovalSend();
        }

        vm.openTermsAndConditions = function() {
            window.open(vm.data.linkToTermAndConditions, '_blank');
        }

        $scope.$on('tnc_approval:error', (e, error) => {
            alertService.displayError(error.message);
        });
    }
})();
