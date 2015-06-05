'use strict';

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

module.exports.lisaaLyhenne = function (str) {
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
