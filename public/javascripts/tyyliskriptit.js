var navLinkit = document.querySelectorAll("header>nav>ul>li");

function valiviivat() {
    //Väliviivat kokonaan pois mobiilissa
    if (window.innerWidth < 768 ) {
        for (var i = 0; i < navLinkit.length-1; i++) {
            navLinkit[i].className += " ei-oikeaa-reunaa";
        }
    }
}
valiviivat();

//sisalto-divin korkeus
function resize() {
    var heights = window.innerHeight;
    console.log(window.innerWidth);
    document.getElementsByClassName("container-fluid sisalto")[0].style.height = heights - 290 + "px";
}
resize();
window.onresize = function () {
    resize();
    valiviivat();
};

    