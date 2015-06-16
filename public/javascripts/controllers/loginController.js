sanakirjaApp.controller('loginController', function ($scope, sanakirjaAPIservice, $location) {

    $scope.name = '';
    $scope.password = '';

    $scope.login = function () {
        console.log('Yritetään kirjautua');

        sanakirjaAPIservice.login($scope.name, $scope.password).then(function (res) {
            var isLoggedIn = !!res;
            console.log('Kirjautuminen onnistui: ' + isLoggedIn);
            if (isLoggedIn === true) {
                $location.path('/');
            }
        });
    };
});
