/**
Tätä ei käytetä joten tämä on kommentoitu pois
sanakirjaApp.service('sanakirjaAPIservice', function ($http, $q) {
    this.postSana = function (data) {
        $http.post('/api/sanat', data)
                .success(function (data) {
                    console.log(data);
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                });
    };
});
*/