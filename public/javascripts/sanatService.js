'use strict';

sanakirjaApp.service('sanatService', function ($http, $q) {

    var jsonres = null;

    var mainPromise = null;

    var sanatEsiteltava = null;

    var selitysLinkit = null;

    var tekijat = null;
    var hakusanat = null;
    var selitykset = null;

    this.sanalista = function () {
        if (mainPromise !== null) {
            var promise = $q(function (resolve, reject) {
                mainPromise.then(function () {
                    resolve(sanatEsiteltava);
                });
            });
            return promise;
        } else {
            var resolved = false;
            var main = $q(function (resolve, reject) {
                if (sanatEsiteltava !== null) {
                    resolved = true;
                    resolve(sanatEsiteltava);
                } else {
                    $http.get('api/sanatuusi')
                            .success(function (data) {
                                console.time('linkitys');
                                selitysLinkit = data.linkit;
                                hakusanat = data.hakusanat;
                                tekijat = data.tekijat;
                                selitykset = data.selitykset;


                                var linkitSelitykseen = new Array(selitysLinkit.length);
                                for (var i = 0; i < selitysLinkit.length; i++) {
                                    var curr = selitysLinkit[i];
                                    var linkitSelityksessa = linkitSelitykseen[curr.selitys];
                                    if (!linkitSelityksessa) {
                                        linkitSelityksessa = [];
                                        linkitSelitykseen[curr.selitys] = linkitSelityksessa;
                                    }
                                    linkitSelityksessa.push(curr);
                                }

                                function toMap(objects) {
                                    var map = new Array(objects.length);
                                    for (var i = 0; i < objects.length; i++) {
                                        var curr = objects[i];
                                        map[curr.id] = curr;
                                    }
                                    return map;
                                }


                                var hakusanatMap = toMap(hakusanat);

                                var selityksetMap = toMap(selitykset);
                                var res = new Array(hakusanat.length);
                                var lyhentaja = new lyhentajaClass();
                                for (var i = 0; i < hakusanat.length; i++) {

                                    var sana = {};
                                    res[i] = sana;
                                    var hakusana = hakusanat[i];
                                    sana.hakusana = hakusana.hakusana;

                                    var selitys = selityksetMap[hakusana.selitys];
                                    if (!selitys) {
                                        console.log(hakusana);
                                        console.log(hakusana.selitys);
                                        console.log(i);
                                    }
                                    sana.selitys = lyhentaja.lisaaLyhenne(selitys.selitys);
                                    var linkit = linkitSelitykseen[selitys.id];
                                    if (!linkit) {
                                        continue;
                                    }
                                    var linkittaja = new linkittajaClass(linkit, hakusanatMap);
                                    sana.selitys = linkittaja.linkita(sana.selitys);
                                }

                                sanatEsiteltava = res;
                                jsonres = JSON.stringify(res);
                                sessionStorage.setItem('sanalista', jsonres);
                                console.timeEnd('linkitys');
                                mainPromise = null;
                                resolve(res);
                            })
                            .error(function (error) {
                                console.log('Yhteyttä ei saada palvelimeen: ' + error);
                                reject(error);
                            });
                }
            });
            if (resolved === false) {
                mainPromise = main;
            }
            return main;
        }
    };
});

function lyhentajaClass() {

    var lyhenteet = [
        'Vat II', 'Sacrosanctum Concilium Oecumenicum Vaticanum Secundum, Constitutiones, decreta, declarationes, 1966',
        'CA', 'Augsburgin tunnustus',
        'Apol', 'Apologia',
        'VK', 'Vähä katekismus',
        'IK', 'lso katekismus',
        'SK', 'Schmalkaldenin kappaleet',
        'TP', 'Traktaatti paavin vallasta',
        'FC', 'Sovinnonkaava',
        'Ep', 'Epitome',
        'SD', 'Solida declaratio',
        'CT', 'Catalogus testimoniorum',
        'BCP', 'Book of Common Prayer',
        'CHP', 'Confessio Helvetica posterior',
        'HK', 'Heidelbergin katekismus',
        'WC', 'Westminster Confession',
        'R', 'Raamattu',
        'LXX', 'Septuaginta',
        'DSM', 'Ta dogmatika kai symbolika mnemeia tes orthodo-xou katholikes ekklesias, ed. Johannes N. Karmiris',
        'CIC', 'Codex luris Canonici',
        'DS', 'Denzinger - Schönmetzer, ed. 34',
        'R', 'Rouët de Journel, ed. 22',
        'Gn', 'Genesis',
        'Ex', 'Exodus',
        'Lv', 'Leviticus',
        'Nm', 'Numeri',
        'Dt', 'Deuteronomium',
        'Jos', 'Joosuan kirja',
        'Tu', 'Tuomarien kirja',
        'Rt', 'Ruutin kirja',
        '1 Sm', 'Ensimmäinen Samuelin kirja',
        '2 Sm', 'Toinen Samuelin kirja',
        '1 Kn', 'Ensimmäinen kuninkaiden kirja',
        '2 Kn', 'Toinen kuninkaiden kirja',
        '1 Ak', 'Ensimmäinen aikakirja',
        '2 Ak', 'Toinen aikakirja',
        'Esr', 'Esran kirja',
        'Nh', 'Nehemian kirja',
        'Est', 'Esterin kirja',
        'Jb', 'Jobin kirja',
        'Ps', 'Psalmien kirja',
        'Sl', 'Sananlaskujen kirja',
        'Sr', 'Saarnaajan kirja',
        'Kv', 'Laulujen laulu',
        'Js', 'Jesajan kirja',
        'Jr', 'Jeremian kirja',
        'Va', 'Valitusvirret',
        'Hs', 'Hesekielin kirja',
        'Dn', 'Danielin kirja',
        'Ho', 'Hoosean kirja',
        'Jl', 'Joelin kirja',
        'Am', 'Aamoksen kirja',
        'Ob', 'Obadjan kirja',
        'Jn', 'Joonan kirja',
        'Mi', 'Miikan kirja',
        'Nh', 'Nahumin kirja',
        'Hb', 'Habakukin kirja',
        'Sf', 'Sefanjan kirja',
        'Hg', 'Haggain kirja',
        'Sk', 'Sakarjan kirja',
        'Ml', 'Malakian kirja',
        'Mt', 'Evankeliumi Matteuksen mukaan',
        'Mk', 'Evankeliumi Markuksen mukaan',
        'Lk', 'Evankeliumi Luukkaan mukaan',
        'Jh', 'Evankeliumi Johanneksen mukaan',
        'Apt', 'Apostolien teot',
        'Rm', 'Kirje roomalaisille',
        '1 Kr', 'Ensimmäinen kirje korinttilaisille',
        '2 Kr', 'Toinen kirje korinttilaisille',
        'Gl', 'Kirje galatalaisille',
        'Ef', 'Kirje efesolaisille',
        'Fl', 'Kirje filippiläisille',
        'Kl', 'Kirje kolossalaisille',
        '1 Ts', 'Ensimmäinen kirje tessalonikalaisille',
        '2 Ts', 'Toinen kirje tessalonikalaisille',
        '1 Tm', 'Ensimmäinen kirje Timoteukselle',
        '2 Tm', 'Toinen kirje Timoteukselle',
        'Tt', 'Kirje Titukselle',
        'Flm', 'Kirje Filemonille',
        'Hbr', 'Kirje heprealaisille',
        'Jk', 'Jaakobin kirje',
        '1 Pt', 'Ensimmäinen Pietarin kirje',
        '2 Pt', 'Toinen Pietarin kirje',
        '1 Jh', 'Ensimmäinen Johanneksen kirje',
        '2 jh', 'Toinen Johanneksen kirje',
        '3 Jh', 'Kolmas Johanneksen kirje',
        'Jd', 'Juudaksen kirje',
        'Ilm', 'Johanneksen ilmestys',
        'UT', 'Uusi testamentti',
        'VT', 'Vanha testamentti',
        'adj', 'adjektiivi',
        'aik', 'aikaisemmin',
        'Akv', 'Akvinolainen',
        'arab', 'arabia, arabian',
        'aram', 'aramea, aramean',
        'Aristot', 'Aristoteles, Aristoteleen',
        'dogm', 'dogmatiikka, dogmatiikassa, dogmaattinen',
        'ed', 'edellä, edellinen',
        'ekseg', 'eksegetiikka, eksegetiikassa, eksegeettinen',
        'engl', 'englanti, englannin',
        'erit', 'erityisesti',
        'esim', 'esimerkiksi',
        'ev', 'evankelinen, evankelisessa kirkossa',
        'fil', 'filosofia, filosofiassa, filosofinen',
        'hepr', 'heprea, hepreassa',
        'hist', 'historia, historiassa, historiallinen',
        'ital', 'italia, italian',
        'jne', 'ja niin edelleen',
        'jälk', 'jälkimmäinen, jälkeen',
        'k', 'kuoli, kuollut',
        'ka', 'keskiaika, keskiajalla, keskiaikainen',
        'kat', 'katolinen',
        'khist', 'kirkkohistoria, kirkkohistoriassa, kirkkohistoriallinen',
        'kirkoll', 'kirkollinen',
        'kr', 'kreikka, kreikan',
        'krist', 'kristillinen',
        'ks', 'katso',
        'lat', 'latina, latinan',
        'lit', 'liturgia, liturginen',
        'lut', 'luterilainen',
        'lyh', 'lyhenne, lyhennettynä',
        'mon', 'monikko, monikossa',
        'myöh', 'myöhempi, myöhemmin',
        'nim', 'nimittäin',
        'nyk', 'nykyään, nykyinen',
        'ort', 'ortodoksia, ortodoksiassa, ortodoksinen',
        'p', 'pyhä',
        'puhd opp', 'puhdasoppisuus, puhdasoppisuudessa, puhdasoppinen',
        'ransk', 'ranska,ranskan',
        'ref', 'reformoitu',
        'rkat', 'roomalaiskatolinen',
        'saks', 'saksa, saksan',
        'sanskr', 'sanskrit, sanskritin',
        'seur', 'seuraava, seuraavassa',
        'skol', 'skolastiikka, skolastiikassa, skolastinen',
        'syn', 'synonyymi',
        't', 'tai',
        'teol', 'teologia, teologiassa, teologinen',
        'usk', 'uskonto, uskonnollinen',
        'vast', 'vastaava',
        'vastak', 'vastakohta',
        'ven', 'venäjä, venäjän',
        'vs', 'vuosisata, vuosisadalla, vuosisadan',
        'vrt', 'vertaa',
        'yks', 'yksikkö, yksikössä',
        'yl', 'yleinen, yleisesti, yleensä',
        'ym', 'ynnä muuta'
    ];

    var map = new Object();

    for (var i = 0; i < lyhenteet.length; i += 2) {
        var lyhenne = lyhenteet[i].toLowerCase();
        var selitys = lyhenteet[i + 1];
        for (var k = 1; k < lyhenne.length; k++) {
            var lyhenteenAlku = lyhenne.substring(0, k);
            if (map[lyhenteenAlku] === undefined) {
                map[lyhenteenAlku] = true;
            }
        }
        map[lyhenne] = selitys;
    }

    var LISA_PITUUS = toSpan('', '').length;

    var isAlphanumeric = /^[a-zäåö]+$/i;

    function replaceString(origin, start, end, what) {
        return origin.substring(0, start) + what + origin.substring(end);
    }

    function toSpan(lyhenne, selitys) {
        return '<span class="lyhenne" title="' + selitys + '">' + lyhenne + '</span>';
    }

    lyhentajaClass.prototype.lisaaLyhenne = function (str) {
        var currentString = '';
        var extraLength = 0;
        var beforeStartCharacter = '';
        for (var i = 0, max = str.length; i < max; i++) {
            var realPosition = i + extraLength;
            var curr = str.charAt(realPosition);
            currentString += curr;
            var selitys = map[currentString.toLowerCase()];
            if (selitys !== true) {
                if (typeof selitys === 'string') {
                    var nextCharacter = str.charAt(realPosition + 1);
                    if (isAlphanumeric.test(nextCharacter) === true
                            || isAlphanumeric.test(beforeStartCharacter) === true) {
                        continue;
                    }
                    var alku = realPosition - currentString.length + 1;
                    var loppu = realPosition + 1;
                    var lyhenne = currentString;
                    str = replaceString(str, alku, loppu, toSpan(lyhenne, selitys));
                    var pituusKasvu = LISA_PITUUS + selitys.length;
                    extraLength += pituusKasvu;
                }
                currentString = '';
                beforeStartCharacter = curr;
            }
        }
        return str;
    };
}

function linkittajaClass(linkit, hakusanat) {
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

    linkittajaClass.prototype.linkita = function (selitys) {

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
