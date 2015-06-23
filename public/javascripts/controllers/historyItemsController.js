sanakirjaApp.controller('historyItemsController', function ($scope) {
    //tyhjennetaan hakukentta siirryttäessa historia-sivulle
    $scope.hakuKentta.sana = "";
        
    if (sessionStorage.getItem('historia')) {
        $scope.historia = JSON.parse(sessionStorage.getItem('historia')).reverse();
    }
});
