sanakirjaApp.controller('historyController', function ($scope) {

    $scope.$watch('hakuKentta', function (newVal, oldVal) {
        var historia = [];

        if (newVal.sana !== undefined && newVal.sana !== '') {

            if (sessionStorage.getItem('historia')) {
                historia = JSON.parse(sessionStorage.getItem('historia'));
            }

            historia.push(newVal.sana);
            sessionStorage.setItem('historia', JSON.stringify(historia));
        }
    }, true); 
});
