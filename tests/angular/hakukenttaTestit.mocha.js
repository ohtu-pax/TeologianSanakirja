describe('tyhjenna hakukentta', function(){
  var controller, scope;
  
  beforeEach(function(){
    module('sanakirjaApp');

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('hakuKenttaController', {
        $scope: scope,
        $routeParams: {sana: 'kissa'}
      });
    });
  });

  it('tyhjentaa hakukentan kun painetaan tyhjenna hakukentta painiketta', function(){
      
      scope.hakuKentta = "aamen";    
      scope.tyhjennahaku();
      expect(scope.hakuKentta).to.eql("");
  });
  
  it('asettaa sanan hakukenttaan', function(){
      expect(scope.hakuKentta).to.eql("kissa");
  });
  
});