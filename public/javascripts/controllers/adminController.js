sanakirjaApp.controller('adminController', function ($scope) {
    $scope.adminSanat = [{id: '1'}];

    $scope.hallinnoiRiveja = function (id) {
        if (id === $scope.adminSanat.length) {
            var newItemNo = $scope.adminSanat.length + 1;
            $scope.adminSanat.push({id: newItemNo});
         } else if (id ===  $scope.adminSanat.length - 1) {
            if ($scope.adminSanat[id - 1].hakusana === '') {
                $scope.adminSanat.splice(id, 1);
            }
        }
    };
});




