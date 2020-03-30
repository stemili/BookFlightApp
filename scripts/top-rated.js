const topDestinations = [
    'Barcelona','Berlin','Rome',
    'Istanbul','Paris','Amsterdam',
    'Miami','Havana','Moscow',
    'Buenos Aires', 'Tokyo', 'Hong Kong'
];


//IIFE da popuni slikama top-rated boxove po imenu grada

(function placeImages(){
    
    let topBoxes = document.querySelectorAll(".top-rated-box");
    for(let i=0;i<topBoxes.length;i++){
        [...topBoxes][i].style.backgroundImage = "url(./resources/" + topDestinations[i] + ".jpg";
    }
    const button = document.querySelector(".top-rated-button");
    button.addEventListener("click",loadMoreItems);
})();

function loadMoreItems(e){
    const topBoxes = document.querySelectorAll(".top-rated-box");
    let j;
    innerWidth > 985 ? j=3 : (innerWidth>650? j=2 : j=1); 
    // ^ da uvijek dodaje po jednu vrstu u zavisnosti od velicine windowa.
    if(topBoxes.length !== 12){
        for(let i=topBoxes.length;i<topBoxes.length+j;i++){
            let topBoxCopy = topBoxes[0].cloneNode(true);
            topBoxCopy.style.backgroundImage = "url(./resources/" + topDestinations[i].split(" ").join(""
            ).toLowerCase() + ".jpg";
            topBoxCopy.firstElementChild.firstElementChild.firstElementChild.textContent = topDestinations[i];
            let button = document.querySelector(".top-rated-button");
            topBoxes[0].parentNode.insertBefore(topBoxCopy, button);
        }
    }
}