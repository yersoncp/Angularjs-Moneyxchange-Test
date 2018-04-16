(function(){
  'use strict';

	angular
	.module('app.controllers')
	.controller('homeCtrl', homeCtrl);

	/* @ngInject */
	function homeCtrl($scope, XchangeService) {
		/*jshint validthis: true */
		var vm = this;

		vm.calculate = function(valueUSD){
			vm.spinner = true;
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
