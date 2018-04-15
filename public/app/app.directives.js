(function(){
  'use strict';

	selectclick.$inject = ["$window"];
	enter.$inject = ["$window"];
    currency.$inject = ["$filter"];
	capsLock.$inject = ["$document", "$log", "capslockService"];
angular
	.module('app.directives', [])
	.directive('uppercase', uppercase)
	.directive('selectclick', selectclick)
	.directive('enter', enter)
	.directive('currency', currency)
	.directive('capsLock', capsLock)
	.directive('decimalPlaces', decimalPlaces)

	function uppercase() {
	    return {
	      require: 'ngModel',
	      link: function(scope, element, attrs, modelCtrl) {
	        var capitalize = function(inputValue) {
	          if (inputValue == undefined) inputValue = '';
	          var capitalized = inputValue.toUpperCase();
	          if (capitalized !== inputValue) {
	            modelCtrl.$setViewValue(capitalized);
	            modelCtrl.$render();
	          }
	          return capitalized;
	        }
	        modelCtrl.$parsers.push(capitalize);
	        capitalize(scope[attrs.ngModel]); // capitalize initial value
	      }
	    };
	}

	function selectclick($window) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            element.on('click', function () {
	                if (!$window.getSelection().toString()) {
	                    // Required for mobile Safari
	                    this.setSelectionRange(0, this.value.length)
	                }
	            });
	        }
	    };
	}

	function enter($window) {
	    return function(scope,element,attrs){

			element.bind("keydown keypress",function(event){
				if(event.which===13){

					event.preventDefault();
					var fields=$(this).parents('form:eq(0),body').find('input[type="text"], input[type="email"], input[type="number"], textarea, select');

					var index=fields.index(this);
					if(index> -1&&(index+1)<fields.length){
						fields.eq(index+1).focus();
						fields.eq(index+1).select();
					}
				}
			});
	    };
	}

	function currency($filter) {
    function link(scope, el, attrs, ngModelCtrl) {

				var symbol = function(){
					if(attrs.currency.toString() === 'PEN'){
						return 'S/'
					} else if(attrs.currency.toString() === 'USD'){
						return '$'
					} else if (attrs.currency.toString() === 'EUR') {
						return '€'
					}
				}

			var formatNumber = function(value) {
				value = value.toString();
				value = value.replace(/[^0-9\.]/g, "");
				var parts = value.split('.');

				parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
				if (parts[1] && parts[1].length > 2) {
				parts[1] = parts[1].substring(0, 2);
				}
				return parts.join(".");
			};

			var applyFormatting = function() {
				var value = el.val();
				var original = value;
				if (!value || value.length === 0) {
					return
				}
				value = formatNumber(value);
				if (value != original) {
					el.val(value);
					el.triggerHandler('input')
				}
			};

          el.bind('keyup', function(e) {
		        var keycode = e.keyCode;
		        var isTextInputKey =
		          (keycode > 47 && keycode < 58) || // number keys
		          keycode == 32 || keycode == 8 || // spacebar or backspace
		          (keycode > 64 && keycode < 91) || // letter keys
		          (keycode > 95 && keycode < 112) || // numpad keys
		          (keycode > 218 && keycode < 223); // [\]' (in order)
		        if (isTextInputKey) {
		        	applyFormatting()
		        }
		    });

            scope.$watch(function(){
            	return attrs.currency
            }, function(value){
            	formatter(el.val())
            });

            function formatter(value) {
                value = value ? parseFloat(value.toString().replace(/[^0-9._-]/g, '')) || 0 : 0;

                //console.log(attrs.currency.toString());
                var _symbol = symbol();
                //console.log(_symbol);

                var formattedValue = $filter('currency')(value, _symbol);
                el.val(formattedValue);
                ngModelCtrl.$setViewValue(value);
                return formattedValue;
            }

            ngModelCtrl.$formatters.push(formatter);

            el.bind('blur', function () {
                formatter(el.val());
            });
        }

        return {
            require: '^ngModel',
            scope: true,
            link: link
        };
    }

  function capsLock($document, $log, capslockService) {
	    var directive = {
	      restrict: 'A',
	      link: function(scope, el, attrs) {
	        var warningElement;
	        if (attrs.capsLockWarning) {
	          $document.ready(function() {
	            warningElement = $(attrs.capsLockWarning);
	            $log.log("Using custom element " + attrs.capsLockWarning);
	          });
	        } else {
	          var warningId = 'warning-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
	          warningElement = $('<div id=\"' + warningId + '\" class=\"warning\">Mayúsculas activado!!</div>');
	          el.after(warningElement);
	        }
	        var hideOrShow = function() {
	          var isEnabled = capslockService.checkWarning();
	          if (isEnabled && el.is(":focus")) {
	            warningElement.show();
	            //$log.log("Show warning");
	          } else {
	            warningElement.hide();
	            //$log.log("Hide warning");
	          }
	        }
	        el.keyup(function(e) {
	          //$log.log("Keyup");
	          hideOrShow();
	        });

	        el.on("focus", function(e) {
	          //$log.log("Focus");
	          hideOrShow();
	        });

	        el.on("blur", function(e) {
	          //$log.log("Blur");
	          hideOrShow();
	        });
	      }
	    };
	    return directive;
	};

	function decimalPlaces() {
		return {
			link: function (scope, ele, attrs) {
				ele.bind('keypress', function (e) {
					var newVal = $(this).val() + (e.charCode !== 0 ? String.fromCharCode(e.charCode) : '');
					if ($(this).val().search(/(.*)\.[0-9][0-9][0-9][0-9]/) === 0 && newVal.length > $(this).val().length) {
						e.preventDefault();
					}
				});
			}
		};

	};

 })();