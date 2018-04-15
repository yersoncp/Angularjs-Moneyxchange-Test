describe('SimpleTest', function() {
  'use strict';
  
  var scope;
  beforeEach(function(){
    module('main');
  });

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
  }));

  describe("test scope", function() {
    it("should have a scope defined", function() {
      expect(scope).toBeDefined();
    });
  });
});


