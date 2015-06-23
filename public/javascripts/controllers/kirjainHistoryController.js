sanakirjaApp.controller('kirjainHistoryController', function ($scope) {

    $scope.$watch('kirjainHakuKentta', function (newVal, oldVal) {
        var historia = [];

        if (newVal !== undefined && newVal !== '' ) {

            if (sessionStorage.getItem('historia')) {
                historia = JSON.parse(sessionStorage.getItem('historia'));
            }

            historia.push(newVal);
            sessionStorage.setItem('historia', JSON.stringify(historia));
        }
    }, true);
   
});