describe('hakukentta', function(){
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

  it('tulostaa vain sanat joissa esiintyy tekstikentän hakuteksti', function(){
      
      scope.hakuKentta = "aamen";
    
      console.log(scope.hakuKentta);  
      
      //expect(teksti).toBe("aamen");
  });
  
});