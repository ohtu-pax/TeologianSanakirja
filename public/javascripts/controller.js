
sanakirjaApp.controller('sanalistaController', function ($scope, $http, sanakirjaAPIservice) {
 $scope.title = "Teologian sanakirja";
    $http.get('api/sanat')
            .success(function (data) {
                $scope.sanalista = data;
            })
            .error(function (error) {
                console.log('Error: ' + error);
            });
});


sanakirjaApp.controller('postController', function ($scope, sanakirjaAPIservice) {
   

    $scope.lisaaSana = function () {
        sanakirjaAPIservice.postSana({
            sana: $scope.formData.sana,
            selitys: $scope.formData.selitys
        });
        $scope.formData.sana = '';
        $scope.formData.selitys = '';
    };
});