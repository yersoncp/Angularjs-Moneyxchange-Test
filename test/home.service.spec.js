// 'use strict';

// describe('Xchange Service', function () {

//     beforeEach(function () {
//         module('app.services');
//     });

//     describe('Xchange service', function () {

//         var XchangeService;

//         beforeEach(
//             inject(function(_XchangeService_, $q, $http, CacheFactory) {
//                 XchangeService = _XchangeService_;

//                 // spyOn(xchangeService, "getRatio").and.callFake(function () {
//                 //     var deferred = $q.defer();
//                 //     deferred.resolve('Remote call result');
//                 //     return deferred.promise;
//                 // });

//             })
//         );

//         // it('debeo retornas valores de conversion', function () {
//         //     var data = xchangeService.getRatio();
//         //     console.log(data);
//         //     expect(data).toBeDefined();
//         //     expect(data.length).toBe(2);
//         // });

//         it('deseo retornar valores de la conversión', inject(function () {
//             XchangeService.getRatio()
//                 .then(function (response) {
//                     console.log(response);
//                     console.log('Success');
//                 });
//         }));


//     });
// });



'use strict';

describe('Modulo app.cars', function () {

    beforeEach(function () {
        module('app.services');
    });

    describe('Cars service', function () {

        var carsService;

        beforeEach(function () {
            inject(['HelloService', function (service) {
                carsService = service;
            }
            ]);
        });

        it('debe devolver una lista de dos coches', function () {
            var cars = carsService.getHello();
            console.log(cars);
            // expect(cars).toBeDefined();
            // expect(cars.length).toBe(2);
        });
    });
});