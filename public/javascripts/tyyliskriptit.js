//Otetaan navin viimeisen linkin oikea reuna pois
var navLinkit = document.querySelectorAll("li");
if(document.querySelector(".logout").className.includes("ng-hide"))   {
    navLinkit[navLinkit.length-1].className = "ei-oikeaa-reunaa";
}
else {
    navLinkit[navLinkit.length-2].className = "ei-oikeaa-reunaa";
}

    