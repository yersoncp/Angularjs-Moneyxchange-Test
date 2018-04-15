(function(){
  'use strict';

	home.$inject = ["$scope", "$state", "msgflash", "blockUI", "$localStorage", "xchange"];
	angular
	.module('app.controllers')
	.controller('home', home);

	/* @ngInject */
	function home($scope, $state, msgflash, blockUI, $localStorage, xchange) {
		/*jshint validthis: true */
		var vm = this;

		vm.calculate = function(valueUSD){
			vm.spinner = true;
			xchange.getRatio().then(function (response) {
				console.log(response);
				vm.valueEUR = valueUSD * response.rates.EUR;

				vm.spinner = false;
			}, function (e) {
				console.log(e);
			});
		}
				
	};

//END
})();
