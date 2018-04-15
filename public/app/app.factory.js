/**
 * Factory personalizados
 * @namespace app.factory
 */

(function(){
  'use strict';

	contanex.$inject = ["$q", "$kinvey"];
	focus.$inject = ["$timeout", "$window"];
	msgflash.$inject = ["$rootScope"];
	capslockService.$inject = ["$rootScope", "$document", "$log"];
	sfUtil.$inject = ["$filter"];
	angular
	.module('app.factory', [])
	.factory('contanex', contanex)
	.factory('inputState', inputState)
	.factory('focus', focus)
	.factory('msgflash', msgflash)
	.factory('sharedata', sharedata)
   .factory('capslockService', capslockService)
	.factory('sfUtil', sfUtil)

	function contanex($q, $kinvey) {
	    return {
	    	getPeriodos: function(){
	    		var deferred = $q.defer();
			   var query = new $kinvey.Query();
				var dataStore = $kinvey.DataStore.collection('cash-cuentas');
				dataStore.find(query).subscribe(function(data) {

               deferred.resolve({type: "error", message: "Error de algo"})
               return false;

				 	deferred.resolve(data);
				}, function(error) {
					console.log(error);
				});

			   return deferred.promise;
	    	},

         // Incluir data.username (nombre de usuario activo)
         // Incluir data.codigo (codigo de cuenta)
         createTransaccion: function(type, data){
            var deferred = $q.defer();

   			var dataStore = $kinvey.DataStore.collection('cash-cuentas', $kinvey.DataStoreType.Network);
   			dataStore.findById(data.cuenta_id).subscribe(function(entity) {

               // Set tipo de transaccion
               if (type === 'ingreso') {
                  entity.monto = Number(entity.monto + Number(data.importe));
               } else if (type === 'egreso') {
                  entity.monto = Number(entity.monto - Number(data.importe));
               } else{
                  deferred.resolve({resolve: "error", message: "Tipo de transacción incorrecto."});
                  return false;
               }

   				if (entity.monto >= 0) {
   					$kinvey.DataStore.collection('cash-cuentas').save(entity).then(function onSuccess(entity) {
   						console.log("Success update account.");
   					}).catch(function onError(error) {
   						deferred.resolve(error);
   					});

   					//Convertir fecha de string a date
   					data.fecha = moment(data.fecha, 'DD/MM/YYYY').toDate();
   					data.fecha_display = {
   						year: moment(data.fecha, 'DD/MM/YYYY').format("YYYY"),
   						month: moment(data.fecha, 'DD/MM/YYYY').format("MM"),
   						day: moment(data.fecha, 'DD/MM/YYYY').format("DD")
   					}

   					var dataStore = $kinvey.DataStore.collection('cash-movimientos');
   					var promise = dataStore.save(data).then(function onSuccess(entity) {
                     // $state.go('cuenta', {id: vm.param.account, tab: 0})
                     deferred.resolve(entity);
   					}).catch(function onError(error) {
   						deferred.resolve(error);
   					});

   				} else{
                  deferred.resolve({resolve: "info", message: "Saldo insuficiente"});
                  return false;
   				}
   			}, function(error) {
   			   deferred.resolve(error);
   			});

            return deferred.promise;
         },

	    }
	}

	function inputState(){
		var history = {};
		var state = {};
		return {
			// Call to push the current values in the history
			pushState: function() {
			  // Loop through all properties of the form state
			  angular.forEach(state, function(value, key) {
			    // Ensure we've got an array for the field value
			    if(history[key] === undefined) {
			      history[key] = [];
			    }

			    // Skip duplicate values.
			    if(history[key].indexOf(value) === -1) {
			      history[key].push(value);
			    }
			  });
			},
			// Call to get the input state object
			getState: function() {
			  return state;
			},
			// Call to get the input history
			getHistory: function() {
			  return history;
			}
		};
	}

	function focus($timeout, $window) {
	    return function(id) {
	      // timeout makes sure that it is invoked after any other event has been triggered.
	      // e.g. click events that need to run before the focus or
	      // inputs elements that are in a disabled state but are enabled when those events
	      // are triggered.
	      $timeout(function() {
	        var element = $window.document.getElementById(id);
	        if(element){
	        	element.focus();
	        }
	      });
	    };
	}

	function msgflash($rootScope){
	    return {
	        success : function(message){
	            $rootScope.success = message;
	        },
	        error : function(message){
	            $rootScope.error = message;
	        },
	        warning : function(message){
	            $rootScope.warning = message;
	        },
	        clear : function(){
	            $rootScope.success = "";
	            $rootScope.error = "";
	            $rootScope.warning = "";
	        }
	    }
	}

	function sharedata() {
		return {
			data: {}
		};
	}

	function capslockService($rootScope, $document, $log) {
	    var capsLockEnabled = null;
	    $document[0].msCapsLockWarningOff = true; // Set this to true to turn off default IE behavior.
	    var isCheckEnabled = $document[0].msCapsLockWarningOff === undefined || $document[0].msCapsLockWarningOff;

	    var checkWarning = function() {
	      return capsLockEnabled;
	    }

	    if (isCheckEnabled) {
	      $document.keydown(function(e) {
	        if (e.which == 20 && capsLockEnabled !== null) {
	          capsLockEnabled = !capsLockEnabled;
	          //console.log("Keydown. CapsLock enabled: " + capsLockEnabled.toString());
	          $rootScope.$broadcast('capslockToggle');
	        } else if (e.which == 20) {
	          //$log.log("Keydown. Initial state not set.");
	        }
	      });

	      $document.keypress(function(e) {
	        var str = String.fromCharCode(e.which);
	        if (!str || str.toLowerCase() === str.toUpperCase()) {
	          //$log.log("Keypress. Some control key pressed.");
	          return;
	        }
	        capsLockEnabled = (str.toLowerCase() === str && e.shiftKey) || (str.toUpperCase() === str && !e.shiftKey);
	        //console.log("Keypress. CapsLock enabled: " + capsLockEnabled.toString());
	        $rootScope.$broadcast('capslockToggle');
	      });
	    }

	    return {
	      checkWarning: checkWarning
	    };
	};

    function sfUtil($filter) {
	    return {

            /*
            ID Generator
            */
	    	generateId: function(id){
			    var fechainf = new Date();
                return $filter("date")(fechainf, 'yyMMddHHmmss');
	    	},

            /*
            Add Value In Object
            */
            addValueInObject: function(object, key, value) {
               var res = {};
               var textObject = JSON.stringify(object);
               if (textObject === '{}') {
                  res = JSON.parse('{"' + key + '":"' + value + '"}');
               } else {
                  res = JSON.parse('{' + textObject.substring(1, textObject.length - 1) + ',"' + key + '":' + value + '}');
               }
               return res;
            },

            /*
            Remove Value In Object
            */
            removeValueInObject: function(object, key){
               delete object[key];
               return object;
           },

            /*
            Get Size Object
            */
            getSizeObjetc: function(object){
                return Object.keys(object).length;
            }
	    }
	}

})();
