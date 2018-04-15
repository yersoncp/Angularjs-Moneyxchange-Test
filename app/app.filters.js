/**
 * @desc Filter personalizados
 * @namespace app.filters
 *
 */

(function(){
  'use strict';

angular
	.module('app.filters', [])
	.filter('limitToCustom', limitToCustom)

	/**
	 * @desc Limita los caracteres que se muestra a "X" y luego completa '...'
	 * @memberOf app.filters
	 * @example {{value | limitToCustom:70}}
	 * @author  Yerson Carhuallanqui
	 */
	function limitToCustom() {
	    'use strict';
	    return function(input, limit) {
	        if (input) {
	            if (limit > input.length) {
	                return input.slice(0, limit);
	            } else {
	                return input.slice(0, limit) + '...';
	            }
	        }
	    };
	}

})();