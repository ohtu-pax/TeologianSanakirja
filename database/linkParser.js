'use strict';

function linkittaja(linkit, hakusanat) {
    var linkit = linkit;
    var hakusanat = hakusanat;

    var linkkiSanat = {};

    for (var i = 0, max = linkit.length; i < max; i++) {
        var linkki = linkit[i];
        var lsana = linkki.linkkisana;
        var curr = '';
        for (var k = 0, maxK = lsana.length - 1; k < maxK; k++) {
            curr += lsana.charAt(k);
            if (linkkiSanat[curr] === undefined) {
                linkkiSanat[curr] = true;
            }
        }
        linkkiSanat[lsana] = linkki;
    }

    var LISA_PITUUS = toHref('', '').length;

    function toHref(linkkiSana, hakusana) {
        return '<a href="/#/sanat/' + hakusana + '">' + linkkiSana + '</a>';
    }

    function replaceString(origin, start, end, what) {
        return origin.substring(0, start) + what + origin.substring(end);
    }

    this.linkita = function (selitys) {

        var openTag = false;
        var closeTag = false;

        function setTags(value) {
            if (openTag === value) {
                openTag = !value;
            } else {
                closeTag = !value;
            }
            currSana = '';
        }

        var extraLength = 0;
        var currSana = '';
        for (var i = 0, max = selitys.length; i < max; i++) {
            var realPosition = i + extraLength;
            var currChar = selitys.charAt(realPosition);
            if (currChar === '<') {
                setTags(false);
            } else if (currChar === '>') {
                setTags(true);
            }
            if (openTag === true || closeTag === true) {
                continue;
            }
            currSana += currChar;
            var linkki = linkkiSanat[currSana];
            if (linkki !== true) {
                if (linkki !== undefined) {
                    var alku = realPosition - currSana.length + 1;
                    var loppu = realPosition + 1;
                    var lyhenne = currSana;
                    var hakusana = hakusanat[linkki.hakusana].hakusana;

                    selitys = replaceString(selitys, alku, loppu,
                            toHref(lyhenne, hakusana));
                    var pituusKasvu = LISA_PITUUS + hakusana.length;
                    extraLength += pituusKasvu;
                }
                currSana = '';
            }
        }
        return selitys;
    };
}

module.exports.linkittaja = linkittaja;
