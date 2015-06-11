sanakirjaApp.controller('adminController', function ($scope) {
    $scope.adminSanaInputs = [{name:'adminSana1'}];

    
    $scope.lisaaSanarivi = function () {
        var newItemNo = $scope.adminSanaInputs.length + 1;
        $scope.adminSanaInputs.push({name: 'adminSana' + newItemNo});
          //  console.log(JSON.stringify($scope.adminSanaInputs));
    }
});




