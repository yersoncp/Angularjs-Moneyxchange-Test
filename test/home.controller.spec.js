// 'use strict';

// describe('Modulo app.controllers', function () {

//   beforeEach(function () {
//     module('app.controllers');
//   });

//   describe('Home controller', function () {

//     var $scope, XchangeService;

//     beforeEach(function () {
//       module(function ($provide) {
//         // inyectamos del mock
//         $provide.value('MockedXchangeService', {
//           'getAll': function () {
//             return [];
//           }
//         });
//       });
//     });

//     beforeEach(inject(function ($rootScope) {
//       $scope = $rootScope.$new();
//     }));

//     it('debe retornar valores de conversion', inject(function ($controller, MockedXchangeService) {
//       $controller('CarsController', { '$scope': $scope, 'XchangeService': MockedXchangeService });
//       expect($controller).toBeDefined();
//       expect(XchangeService);
//       expect($scope.cars.length).toBe(MockedXchangeService.getAll().length);
//     }));
//   });

// });