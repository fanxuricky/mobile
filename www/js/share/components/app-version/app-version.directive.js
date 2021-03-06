/**
 * @name app version directive
 * @author Nazanin Reihani Haghighi
 * @contributors []
 * @since 12/19/2016
 * @copyright Binary Ltd
 */

(function() {
    'use strict';

    angular
        .module('binary.share.components.app-version.directives')
        .directive('bgAppVersion', AppVersion);

    function AppVersion() {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/share/components/app-version/app-version.template.html',
            controller: 'AppVersionController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {}

        };
        return directive;
    }
})();
