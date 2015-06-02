describe('tyhjenna hakukentta', function(){
  var controller, scope;
  
  beforeEach(function(){
    module('sanakirjaApp');

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('hakuKenttaController', {
        $scope: scope
      });
    });
  });

  it('tyhjentaa hakukentan kun painetaan tyhjenna hakukentta painiketta', function(){
      
      scope.hakuKentta = "aamen";    
      scope.tyhjennahaku();
      expect(scope.hakuKentta).to.eql("");
  });
  
});