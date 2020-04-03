const topDestinations = {
    'Barcelona' : 'BCN',
    'Berlin': 'BER',
    'Rome': 'ROM',
    'Istanbul': 'IST',
    'Paris': 'PAR',
    'Budapest' : 'BUD',
    'Zagreb': 'ZAG',
    'Belgrade': 'BEG',
    'Athens': 'ATH',
    'Warsaw': 'WAW', 
    'London': 'LON', 
    'Lisbon': 'LIS'
};

const defaultQuery = 'https://api.skypicker.com/flights?';

//IIFE da popuni slikama top-rated boxove po imenu grada

(function placeImages(){
    
    let topBoxes = document.querySelectorAll(".top-rated-box");
    let keys = Object.keys(topDestinations);
    for(let i=0;i<topBoxes.length;i++){
        [...topBoxes][i].style.backgroundImage = "url(./resources/" + keys[i].toLowerCase() + ".jpg";
    }
    const button = document.querySelector(".top-rated-button");
    button.addEventListener("click",loadMoreItems);
    const popBoxes = document.querySelectorAll(".top-rated-pop");
    [...popBoxes].forEach(box => {
        updateTopRated(box.firstElementChild.textContent);
    })

})();



//Vrace string (UTC format datuma) za uneseni UNIX broj(unix broj se dobija recimo iz parametra dTime)
function convertUNIXtoUTC(number){
    let dateObj = new Date(number * 1000); 
    return dateObj.toUTCString();
}


function updateTopRated(cityName){

    const podgoricaQuery = 'fly_from=TGD&fly_to=';
    const finalUrl = defaultQuery + podgoricaQuery + topDestinations[cityName] + '&date_from=15/04/2020&date_to=15/12/2020&flight_type=oneway&adults=1&curr=EUR&price_to=1500&direct_flights=1&partner=picky&limit=1';
    fetch(finalUrl,{method: 'GET'})
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("Error: Problem with Query");
            }
        })
        .then(flight => {

            let date = convertUNIXtoUTC(flight.data[0].dTime);
            let shortDate = date.slice(4,17);
            let price = flight.data[0].price;
            const topBoxes = document.querySelectorAll(".top-rated-pop");
            [...topBoxes].forEach(box => {
                
                if(box.firstElementChild.textContent === cityName){
                    box.lastElementChild.children[2].innerHTML = shortDate;
                    box.lastElementChild.lastElementChild.style.display = "none";
                    box.lastElementChild.children[4].innerHTML = price + '<sup>' + flight.currency + '</sup>';
                    box.parentNode.id = flight.data[0].id;
                    
                }
            });
            const topRatedBoxes = document.querySelectorAll(".top-rated-content");
            topRatedBoxes.forEach(box => box.addEventListener("click",handleTopBoxClick));
            letovi.push({
                id : flight.data[0].id,
                cityFrom : flight.data[0].route[0].cityFrom,
                cityTo : flight.data[0].route[0].cityTo,
                countryTo : flight.data[0].countryTo.name,
                iataFrom : flight.data[0].route[0].flyFrom,
                iataTo : flight.data[0].route[0].flyTo,
                airline : flight.data[0].route[0].airline,
                price : flight.data[0].conversion,
                bagsPrice : flight.data[0].bags_price,
                depTime : convertUNIXtoUTC(flight.data[0].dTime).slice(17,22),
                arrTime : convertUNIXtoUTC(flight.data[0].aTime).slice(17,22),
                flyDur : flight.data[0].fly_duration,
                distance : flight.data[0].distance,
                flightDate : convertUNIXtoUTC(flight.data[0].dTime).slice(4,17),
                bookLink : flight.data[0].deep_link
            });
            
        })
        
        .catch(err => console.log(err))
};

let letovi = [];

function handleTopBoxClick(e){
    let flights = letovi.filter(element => element.id === e.target.id ? true : false);
   
        if(flights[0] !== ''){
            fillModalWindow(flights[0]);
            handleModalIn();
        }
    fillModalWindow(flights[0]);
    handleModalIn();
    }



function loadMoreItems(e){
    const topBoxes = document.querySelectorAll(".top-rated-box");
    
    let keys = Object.keys(topDestinations);
    // let j; innerWidth > 985 ? j=3 : (innerWidth>650? j=2 : j=1); i<topBoxes.length+j;
    // ^ da uvijek dodaje po jednu vrstu u zavisnosti od velicine windowa.
    if(topBoxes.length !== 12){
        for(let i=topBoxes.length;i<topBoxes.length+3;i++){
            let topBoxCopy = topBoxes[0].cloneNode(true);
            topBoxCopy.firstElementChild.firstElementChild.lastElementChild.children[4].innerHTML = "";
            topBoxCopy.firstElementChild.firstElementChild.lastElementChild.children[2].innerHTML = "";
            topBoxCopy.firstElementChild.firstElementChild.lastElementChild.lastElementChild.style.display = "block";
            topBoxCopy.classList.add("animated");
            topBoxCopy.classList.add("fadeIn");
            topBoxCopy.style.backgroundImage = "url(./resources/" + keys[i].split(" ").join(""
            ).toLowerCase() + ".jpg";
            topBoxCopy.firstElementChild.firstElementChild.firstElementChild.textContent = keys[i];
            let button = document.querySelector(".top-rated-button");
            topBoxes[0].parentNode.insertBefore(topBoxCopy, button);
            updateTopRated(keys[i]);
        }
    }
    if(topBoxes.length+3 === 12){
        const button = document.querySelector(".top-rated-button");
        button.style.display = 'none'; 
    }
}