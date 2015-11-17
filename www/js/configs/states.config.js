/**
 * @name states.config
 * @author Massih Hazrati
 * @contributors []
 * @since 11/4/2015
 * @copyright Binary Ltd
 */

angular
	.module('binary')
	.config(
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'templates/pages/home.html',
					controller: 'HomeController'
				})
				.state('signin', {
					url: '/sign-in',
					templateUrl: 'templates/pages/sign-in.html',
					controller: 'SignInController'
				})
				.state('help', {
					url: '/help',
					templateUrl: 'templates/pages/help.html',
					controller: 'HelpController'
				})
				.state('trade', {
					url: '/trade',
					cache: false,
					templateUrl: 'templates/pages/trade.html',
					controller: 'TradeController'
				})
				.state('options', {
					url: '/options',
					cache: false,
					templateUrl: 'templates/pages/options.html',
					controller: 'OptionsController'
				})
				.state('accounts', {
					url: '/accounts',
					cache: false,
					templateUrl: 'templates/pages/accounts.html',
					controller: 'AccountsController'
				});

				$urlRouterProvider.otherwise('/home');
		}
	);
