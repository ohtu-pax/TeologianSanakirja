
sanakirjaApp.service('sanakirjaAPIservice', function ($http, $q) {


    this.getSanalista = function () {
        return $q(function (resolve, reject) {
            $http.get('api/sanat/')
                    .success(function (data) {
                        sessionStorage.setItem('sanalista', JSON.stringify(data));
                        resolve(data);
                    })
                    .error(function (error) {
                        console.log('Error at services.js at getSanalista: ' + error);
                        reject(error);
                    });
        });
    };
});

