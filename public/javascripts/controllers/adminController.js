sanakirjaApp.controller('adminController', function ($scope) {

    var eka = {};
    eka.hakusana = 'asd';
    eka.id = 0;
    var toka = {};
    toka.hakusana = '';
    toka.id = 6;
    var objs = [eka, toka];
    
    $scope.hsanat = objs;
    
    objs[objs.length - 1]; 
    $scope.onc = function(id){
        console.log(id);
    };
//    $scope.adminSanaInputs = [{name: 'adminSana1'}];

//
//    console.log(JSON.stringify($scope.adminSanakentta));
//
//    $scope.adminSanakentta.adminSana1.watch(function () {
//        console.log("HELO");
//    });

//    var testi = angular.element(document.getElementsByName("adminSana1"));
//    console.log(JSON.stringify(testi));

//    $scope.lisaaSanarivi = function () {
//        console.log("adminsanakentta " + $scope.adminSanakentta);
//        var newItemNo = $scope.adminSanaInputs.length + 1;
//        $scope.adminSanaInputs.push({name: 'adminSana' + newItemNo});
//    }
});




