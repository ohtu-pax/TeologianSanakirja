sanakirjaApp.controller('postController', function ($scope, sanakirjaAPIservice) {
    $scope.formData = {};

    $scope.lisaaSana = function () {
        sanakirjaAPIservice.postSana({
            sana: $scope.formData.sana,
            selitys: $scope.formData.selitys
        });
        $scope.formData.sana = '';
        $scope.formData.selitys = '';
    };
});

