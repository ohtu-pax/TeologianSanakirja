'use strict';

function init($q) {
    var defer = $q.defer();
    var sanalista = [{hakusana: 'koira', selitys: 'haukkuu'}];
    defer.resolve(sanalista);
    return defer.promise;
}
