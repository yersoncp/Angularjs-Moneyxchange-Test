(function(){
  'use strict';

	angular
		.module('app.route', [
			'ui.router'
		])

		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$stateProvider

			//- Welcome
			.state('home', {
			  url: '/',
			  templateUrl: 'views/home.html',
			  controller: 'home',
			  controllerAs: 'vm'
			})

			// END STATE
			$urlRouterProvider.otherwise('/');
			// END FUNCT

    	}])

})();
