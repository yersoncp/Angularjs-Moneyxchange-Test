/**
 * @desc Modulo principal
 * @namespace app
 * @author Yerson Carhuallanqui
 */

(function(){
  'use strict';

  angular
    .module('main', [
      'app.controllers',
      'app.directives',
      'app.services',
      'app.filters',
      'app.route',
      // 'ngMessages',
      // 'ngAnimate',
      // 'ngAria',
      'ngResource',
      // 'ngStorage',
      // 'ngMask',
      // 'ui.bootstrap',
      'angular-cache',
      // 'blockUI',
    ]).config(["CacheFactoryProvider", function (CacheFactoryProvider) {
      angular.extend(CacheFactoryProvider.defaults, { maxAge: 10 * 60 * 1000 });
    }])

})();
