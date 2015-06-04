sanakirjaApp.controller('historyController', function ($scope) {

    $scope.$watch('hakuKentta', function (newVal, oldVal) {
        var historia = [];

        if (newVal !== undefined) {

            if (sessionStorage.getItem('historia')) {
                historia = JSON.parse(sessionStorage.getItem('historia'));
            }

            historia.push(newVal);
            sessionStorage.setItem('historia', JSON.stringify(historia));
        }
    });
    
    if (sessionStorage.getItem('historia')) {
        $scope.historia = JSON.parse(sessionStorage.getItem('historia')).reverse();
    }
});
