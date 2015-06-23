var navLinkit = document.querySelectorAll("header>nav>ul>li");
function valiviivat() {
//Otetaan navin viimeisen linkin oikea reuna pois ja pienellä näytöllä kaikista
    navLinkit[navLinkit.length - 1].className += " ei-oikeaa-reunaa";
    if (window.innerWidth < 768) {
        for (var i = 0; i < navLinkit.length-1; i++) {
            navLinkit[i].className += " ei-oikeaa-reunaa";
        }
    }
    else if (navLinkit[navLinkit.length - 1].is(':visible')) {
        navLinkit[navLinkit.length - 3].className += " ei-oikeaa-reunaa";
    }

}
valiviivat();

//sisalto-divin korkeus
function resize() {
    var heights = window.innerHeight;
    document.getElementsByClassName("container-fluid sisalto")[0].style.height = heights - 290 + "px";
    //headerin pienennys jos ei olla kirjauduttu adminina
    if (window.innerWidth < 860 && navLinkit[navLinkit.length - 1].className === "logout ei-oikeaa-reunaa ng-hide") {
        var korkeus = document.getElementsByTagName("header")[0].style.height;
        document.getElementsByTagName("header")[0].style.height = korkeus - 30 + "px";
    }
}
resize();
window.onresize = function () {
    resize();
    valiviivat();
};


    