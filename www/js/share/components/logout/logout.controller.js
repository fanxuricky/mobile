/**
 * @name logout controller
 * @author Nazanin Reihani Haghighi
 * @contributors []
 * @since 08/15/2016
 * @copyright Binary Ltd
 */

(function (){
  'use strict';

  angular
    .module('binary.share.components.logout.controllers')
    .controller('LogoutController', Logout);

  Logout.$inject = [
    'websocketService', 'alertService'];

  function Logout( 
      websocketService,
      alertService
    ){
    var vm = this;
		vm.logout = function(res) {
				alertService.confirmRemoveAllAccount(
					function(res){
						if(typeof(res) !== "boolean"){
							if(res == 1)
								res = true;
							else
								res = false;
						}

						if(res){
              websocketService.logout();
						}
					}
				);
			};
	}
})();
