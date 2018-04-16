'use strict';

describe('Modulo app.cars', function () {

    beforeEach(function () {
        module('app.services');
    });

    describe('Hello service', function () {

        var helloService;

        beforeEach(function () {
            inject(['HelloService', function (service) {
                helloService = service;
            }]);
        });

        it('debe devolver una mensaje de Hola', function () {
            var cars = helloService.getHello();
            console.log(cars);
            expect(cars).toBeDefined();
            expect(cars).toBe('Hola');
        });
    });
   
});