sanakirjaApp.service('sanakirjaAPIservice', function($http) {
    
    this.getSanat = function(){
       return $http.get('/api/sanat');
    };
    
});
  