
sanakirjaApp.service('sanakirjaAPIservice', function ($http, $q, sanatService) {

    this.isLoggedIn = function () {
        return $q(function (resolve, reject) {
            $http.get('api/admin/loggedin')
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (error) {
                        reject(error);
                    });
        });
    };

    this.login = function (name, password) {
        var msg = '{"username":"' + name + '","password":"' + password + '"}';
        return $q(function (resolve, reject) {
            $http.post('api/admin/login', msg)
                    .success(function (data) {
                        console.log('Kirjautuminen onnistui');
                        resolve(data);
                    })
                    .error(function (error) {
                        console.log('Kirjautuminen epäonnistui: ' + error);
                        reject(error);
                    });
        });
    };

    this.logout = function () {
        return $q(function (resolve, reject) {
            $http.post('api/admin/logout')
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (error) {
                        reject(error);
                    });
        });
    };
});
