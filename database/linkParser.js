'use strict';

function linkittaja(linkit, hakusanat) {
    var linkit = linkit;
    var hakusanat = hakusanat;

    this.linkita = function (selitys) {
        var kaytetyt = [];
        var res = selitys;
        for (var i = 0; i < linkit.length; i++) {
            var linkki = linkit[i];
            var lsana = linkki.linkkisana;
            var hsana = linkki.hakusana;
            if (kaytetyt[lsana]) {
                continue;
            }
            kaytetyt[lsana] = true;
            res = res.replace(lsana,
                    '<a href="/#/sanat/' + hakusanat[hsana].hakusana + '">'
                    + lsana + '</a>');
        }
        return res;
    };
}

module.exports.linkittaja = linkittaja;
