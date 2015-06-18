sanakirjaApp.controller('historyItemsController', function ($scope) {
    if (sessionStorage.getItem('historia')) {
        $scope.historia = JSON.parse(sessionStorage.getItem('historia')).reverse();
    }
});
