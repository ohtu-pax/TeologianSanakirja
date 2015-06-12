sanakirjaApp.controller('adminController', function ($scope, sanakirjaAPIservice) {
    
    if (sessionStorage.getItem('sanalista') === null) {
        var servicePromise = sanakirjaAPIservice.getSanalista();

        servicePromise.then(function (result) {
            $scope.sanalista = result;
        }).catch(function (error) {
            console.log("Error at getController: " + error);
        });
    } else {
        var sanalista = JSON.parse(sessionStorage.getItem('sanalista'));
        $scope.sanalista = sanalista;
    }
    
    $scope.adminSanat = [];
    
    $scope.ekaIndeksi = 1;

    $scope.hallinnoiRiveja = function (id) {
        if ($scope.adminSanat.length === 0) {
            $scope.adminSanat.push({id: $scope.ekaIndeksi + 1 +""});
        }else if ((id-1) === $scope.adminSanat.length) {
            var newItemNo = $scope.adminSanat.length + 2;
            $scope.adminSanat.push({id: newItemNo});
        }else if (id === 1 && $scope.adminSanat.length === 1 && $scope.adminSanahaku === '') {
            $scope.adminSanat = [];                       
        }else if (id !== 1 && id === $scope.adminSanat.length) {
            console.log("ID: " + id);
            if ($scope.adminSanat[id-2].hakusana === '') {
                $scope.adminSanat.splice(id-2, 1);
            }
        }        
    };
});




