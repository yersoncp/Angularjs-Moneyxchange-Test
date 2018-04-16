(function(){
  'use strict';

	homeCtrl.$inject = ["$scope", "XchangeService"];
	angular
	.module('app.controllers')
	.controller('homeCtrl', homeCtrl);

	/* @ngInject */
	function homeCtrl($scope, XchangeService) {
		/*jshint validthis: true */
		var vm = this;

		vm.calculate = function(valueUSD){

			// vm.valueUSD = $filter('currency')(valueUSD, '', 4);
			vm.spinner = true;
			if (!valueUSD) {
				vm.spinner = false;
				return false;
			}
			XchangeService.getRatio().then(function (response) {
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
