//Otetaan navin viimeisen linkin oikea reuna pois ja pienellä näytöllä kaikista
var navLinkit = document.querySelectorAll("header>nav>ul>li");
if(document.querySelector(".logout").className.indexOf("ng-hide") > -1) {
    navLinkit[navLinkit.length-1].className = "ei-oikeaa-reunaa";
}
else if(window.innerWidth < 768){
    for (var i = 0; i < navLinkit.length; i++) {
        navLinkit[i].className += " ei-oikeaa-reunaa";
    }
}
else {
    navLinkit[navLinkit.length-3].className += " ei-oikeaa-reunaa";
}

//sisalto-divin korkeus
function resize()   {
    var heights = window.innerHeight;
    document.getElementsByClassName("container-fluid sisalto")[0].style.height = heights - 250 + "px";
    console.log(window.innerWidth);
    console.log("header: " + document.getElementsByTagName('header')[0].offsetHeight);
}
resize();
window.onresize = function() {
    resize();
};


    