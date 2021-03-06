/**
 * @name digits controller
 * @author Morteza Tavnarad
 * @contributors []
 * @since 08/26/2016
 * @copyright Binary Ltd
 */

(function(){
    'use strict';

    angular
        .module('binary.pages.trade.components.options.controllers')
        .controller('DigitsController', Digits);

    Digits.$inject = [];

    function Digits(){
        var vm = this;

        vm.digits = [];

        vm.selectDigit = function(digit){
            vm.select()(digit);
        }

        function init(){
            var tradeTypes = JSON.parse(sessionStorage.tradeTypes)[vm.tradeType];
            vm.digits = _.union(tradeTypes[0].last_digit_range, tradeTypes[1].last_digit_range);
        }

        init();
    }
})();
