(function () {
    'use strict';

    angular
        .module('app.services')
        .service('XchangeService', XchangeService)
        .service('HelloService', HelloService)
    
    function XchangeService($q, $http, CacheFactory) {

        CacheFactory('dataCache', {
            maxAge: 10 * 60 * 1000, // Items added to this cache expire after 15 minutes
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
        });

        return {
            getRatio: getRatio,
        } //END

        function getRatio() {

            var deferred = $q.defer();
            var start = new Date().getTime();
            var dataCache = CacheFactory.get('dataCache');

            if (dataCache.get('data')) {
                console.log('Data from cache!!');
                deferred.resolve(dataCache.get('data'));
            } else {
                $http.get('http://api.fixer.io/latest?base=USD&symbols=EUR').then(function (response) {
                    console.log('Time taken for request: ' + (new Date().getTime() - start) + 'ms!!');
                    dataCache.put('data', response.data);
                    deferred.resolve(response.data);
                });
            }
            return deferred.promise;

        }
    }

    function HelloService() {
        return {
            getHello: getHello,
        } //END

        function getHello() {
            return 'Hola';
        }
    }


})();
