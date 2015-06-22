sanakirjaApp.controller('historyController', function ($scope) {

    $scope.$watch('hakuKentta', function (newVal, oldVal) {
        console.log("History controller nappaa hakukentasta watchilla newVal: " + newVal.sana);
        var historia = [];

        if (newVal.sana !== undefined) {

            if (sessionStorage.getItem('historia')) {
                historia = JSON.parse(sessionStorage.getItem('historia'));
            }

            historia.push(newVal.sana);
            sessionStorage.setItem('historia', JSON.stringify(historia));
        }
    }, true); 
});
