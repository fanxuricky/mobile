/**
 * @name new-account-real controller
 * @author Nazanin Reihani Haghighi
 * @contributors []
 * @since 08/14/2016
 * @copyright Binary Ltd
 */

(function() {
    'use strict';

    angular
        .module('binary.pages.real-account-opening')
        .controller('RealAccountOpeningController', RealAccountOpening);

    RealAccountOpening.$inject = ['$scope', '$filter', '$ionicModal', 'websocketService', 'appStateService', 'accountService', 'alertService'];

    function RealAccountOpening($scope, $filter, $ionicModal, websocketService, appStateService, accountService, alertService) {
        var vm = this;
        vm.data = {};
        vm.hasResidence = false;
        vm.disableUpdatebutton = false;
        vm.data.linkToTermAndConditions = "https://www.binary.com/" + (localStorage.getItem('language') || "en") + "/terms-and-conditions.html";
        vm.requestData = [
            "salutation",
            "first_name",
            "last_name",
            "date_of_birth",
            "residence",
            "address_line_1",
            "address_line_2",
            "address_city",
            "address_state",
            "address_postcode",
            "phone",
            "secret_question",
            "secret_answer"
        ];

        // set all fields errors to false
        vm.resetAllErrors = function() {
            _.forEach(vm.requestData, (value, key) => {
                vm[value + '_error'] = false;
            });
        }

        $scope.$on('residence_list', (e, residence_list) => {
            vm.residenceList = residence_list;
            websocketService.sendRequestFor.accountSetting();
        });

        $scope.$on('get_settings', (e, get_settings) => {
            if (get_settings.hasOwnProperty('country_code')) {
                $scope.$applyAsync(() => {
                    vm.hasResidence = true;
                });
                vm.data.residence = get_settings.country_code;
                websocketService.sendRequestFor.statesListSend(vm.data.residence);
            }
            if (!get_settings.hasOwnProperty('phone')) {
                vm.phoneCodeObj = vm.residenceList.find(vm.findPhoneCode);
                if (vm.phoneCodeObj.hasOwnProperty('phone_idd')) {
                    $scope.$applyAsync(() => {
                        vm.data.phone = '+' + vm.phoneCodeObj.phone_idd;
                    });
                }
            }
        });

        vm.findPhoneCode = function(country) {
            return country.value === vm.data.residence;
        }

        $scope.$on('states_list', (e, states_list) => {
            vm.statesList = states_list;
        });

        // regexp pattern for name input (pattern in perl API doesn't work in javascript)
        vm.validateGeneral = (function(val) {
            var regex = /[`~!@#$%^&*)(_=+\[}{\]\\\/";:\?><,|\d]+/;
            return {
                test: function(val) {
                    var reg = regex.test(val);
                    return reg == true ? false : true;
                }
            }
        })();

        vm.validateAddress = (function (val) {
            var regex = /[`~!#$%^&*)(_=+\[}{\]\\";:\?><|]+/;
            return {
                test: function (val) {
                    var reg = regex.test(val);
                    return reg == true ? false : true;
                }
            }
        })();

        vm.validateSecretAnswer = (function (val) {
            var regex = /[`~!@#$%^&*)(_=+\[}{\]\\\/";:\?><|]+/;
            return {
                test: function (val) {
                    var reg = regex.test(val);
                    return reg == true ? false : true;
                }
            }
        })();

        vm.submitAccountOpening = function() {
            vm.disableUpdatebutton = true;
            vm.resetAllErrors();
            vm.params = {};
            _.forEach(vm.data, (value, key) => {
                if (vm.requestData.indexOf(key) > -1) {
                    if (key === 'date_of_birth') {
                        vm.params[key] = $filter('date')(value, 'yyyy-MM-dd');
                    } else if (key === 'address_post_code') {
                        vm.params[key] = value.trim();
                    } else {
                        vm.params[key] = value;
                    }
                }
            });
            websocketService.sendRequestFor.createRealAccountSend(vm.params);
        };

        // error handling by backend errors under each input
        $scope.$on('new_account_real:error', (e, error) => {
            vm.disableUpdatebutton = false;
            if (error.hasOwnProperty('details')) {
                $scope.$applyAsync(() => {
                    _.forEach(vm.requestData, (value, key) => {
                        if (error.details.hasOwnProperty(value)) {
                            vm[value + '_error'] = true;
                            vm[value + '_error_message'] = error.details[value];
                        }
                    });
                });
            } else if (error.code) {
                alertService.displayError(error.message);
            }
        });

        $scope.$on('new_account_real', (e, new_account_real) => {
            vm.disableUpdatebutton = false;
            websocketService.authenticate(new_account_real.oauth_token);
            vm.selectedAccount = new_account_real.oauth_token;
            appStateService.newAccountAdded = true;
            accountService.addedAccount = vm.selectedAccount;
        });

        vm.openTermsAndConditions = function() {
            window.open(vm.data.linkToTermAndConditions, '_blank');
        }


        vm.init = function() {
            vm.resetAllErrors();
            websocketService.sendRequestFor.residenceListSend();
        }

        vm.init();
    }
})();
