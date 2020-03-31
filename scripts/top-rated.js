const topDestinations = {
    'Barcelona' : 'BCN',
    'Berlin': 'BER',
    'Rome': 'ROM',
    'Istanbul': 'IST',
    'Paris': 'PAR',
    'Amsterdam' : 'AMS',
    'Miami': 'MIA',
    'Belgrade': 'BEG',
    'Moscow': 'DME',
    'Buenos Aires': 'BUE', 
    'Tokyo': 'TYO', 
    'Hong Kong': 'HKG'
};

const defaultQuery = 'https://api.skypicker.com/flights?';

//IIFE da popuni slikama top-rated boxove po imenu grada

(function placeImages(){
    
    let topBoxes = document.querySelectorAll(".top-rated-box");
    let keys = Object.keys(topDestinations);
    for(let i=0;i<topBoxes.length;i++){
        [...topBoxes][i].style.backgroundImage = "url(./resources/" + keys[i] + ".jpg";
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
    const finalUrl = defaultQuery + podgoricaQuery + topDestinations[cityName] + '&date_from=15/04/2020&date_to=15/12/2020&flight_type=oneway&adults=1&curr=EUR&price_to=1500&partner=picky&limit=1';
    fetch(finalUrl,{method: 'GET'})
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error("Error: Problem with Querry");
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
                    box.lastElementChild.children[4].innerHTML = price + '&euro;';
                }
            });    
        })
        .catch(err => console.log(err))
};





function loadMoreItems(e){
    const topBoxes = document.querySelectorAll(".top-rated-box");
    
    let keys = Object.keys(topDestinations);
    // let j; innerWidth > 985 ? j=3 : (innerWidth>650? j=2 : j=1); i<topBoxes.length+j;
    // ^ da uvijek dodaje po jednu vrstu u zavisnosti od velicine windowa.
    if(topBoxes.length !== 12){
        for(let i=topBoxes.length;i<topBoxes.length+3;i++){
            let topBoxCopy = topBoxes[0].cloneNode(true);
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