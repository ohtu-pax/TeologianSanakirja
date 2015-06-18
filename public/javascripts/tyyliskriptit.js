//Otetaan navin viimeisen linkin oikea reuna pois ja pienellä näytöllä kaikista
var navLinkit = document.querySelectorAll("header>nav>ul>li");
if(document.querySelector(".logout").className.includes("ng-hide"))   {
    navLinkit[navLinkit.length-1].className = "ei-oikeaa-reunaa";
}
else if(window.innerWidth < 768){
    for (var i = 0; i < navLinkit.length; i++) {
        navLinkit[i].className += " ei-oikeaa-reunaa";
    }
}
else {
    navLinkit[navLinkit.length-2].className = "ei-oikeaa-reunaa";
}

//sisalto-divin korkeus
function resize()   {
    var heights = window.innerHeight;
    document.getElementsByClassName("container-fluid sisalto")[0].style.height = heights - 300 + "px";
}
resize();
window.onresize = function() {
    resize();
};


    