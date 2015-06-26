
sanakirjaApp.service('sanakirjaAPIservice', function ($http, $q) {

    var checked = false;
    var loggedIn = false;

    this.getTekstit = function (nimi) {
        return $q(function (resolve, reject) {
            $http.get('api/data/' + nimi)
                    .success(function (data) {
                        sessionStorage.setItem(nimi, JSON.stringify(data));
                        resolve(data);
                    })
                    .error(function (error) {
                        console.log('Error at services.js at getSanalista: ' + error);
                        reject(error);
                    });
        });
    };


    this.isLoggedIn = function () {
        return $q(function (resolve, reject) {
            if (checked === true) {
                resolve(loggedIn ? '1' : '0');
            } else {
                $http.get('api/admin/loggedin')
                        .success(function (data) {
                            checked = true;
                            loggedIn = !!parseInt(data, 10);
                            resolve(data);
                        })
                        .error(function (error) {
                            checked = true;
                            loggedIn = false;
                            reject(error);
                        });
            }
        });
    };

    this.login = function (name, password) {
        var msg = '{"username":"' + name + '","password":"' + password + '"}';
        return $q(function (resolve, reject) {
            checked = false;
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
                        checked = false;
                        resolve(data);
                    })
                    .error(function (error) {
                        checked = false;
                        reject(error);
                    });
        });
    };
});
