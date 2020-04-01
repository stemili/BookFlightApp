// setting user location STATIC
const userLocation = {city: 'Podgorica', iata: 'TGD'};

const ulSlider = document.querySelector('.slider-cards');


// defining default DATE
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
let dateFrom = `${dd}%2F${mm}%2F${yyyy}`;

// future date (30 days advance)
today.setDate(today.getDate() + 30);
dd = String(today.getDate()).padStart(2, '0');
mm = String(today.getMonth() + 1).padStart(2, '0'); 
yyyy = today.getFullYear();
let dateTo = `${dd}%2F${mm}%2F${yyyy}`;

let sliderContent = [];

const newestTwelve = fetch(`https://api.skypicker.com/flights?partner=picky&fly_from=${userLocation.iata}&direct_flights=1&date_from=${dateFrom}&date_to=${dateTo}&sort=date`);
newestTwelve.then( response => response.json())
            .then(obj => obj.data)
            // .then(flightArr => {
            //     return flightArr.map(flight => [flight.cityTo, flight.airlines[0]]); 
            // })
            .then(arr => arr.map(flight => {
                return {
                    id : flight.id,
                    cityFrom : flight.route[0].cityFrom,
                    cityTo : flight.route[0].cityTo,
                    countryTo : flight.countryTo.name,
                    iataFrom : flight.route[0].flyFrom,
                    iataTo : flight.route[0].flyTo,
                    airline : flight.route[0].airline,
                    price : flight.conversion,
                    bagsPrice : flight.bags_price,
                    depTime : convertUNIXtoUTC(flight.dTime).slice(17,22),
                    arrTime : convertUNIXtoUTC(flight.aTime).slice(17,22),
                    flyDur : flight.fly_duration,
                    distance : flight.distance,
                    flightDate : convertUNIXtoUTC(flight.dTime).slice(4,17)

                }
            })).then(some => {
                sliderContent = some;
                handleSliderImages(some);
            })




function handleSliderImages(data){
    let first12 = [data.slice(0,3), data.slice(3,6), data.slice(6,9), data.slice(9, 12)];
    console.log(data);
    let slide = 1;
    let dfSlider = new DocumentFragment();
    
    // first12.forEach(group => {
        first12[0].forEach(card => {
            let newCard = document.createElement('li');
            newCard.classList.add('slider-card');
            newCard.id = card.id;
            newCard.innerHTML = `
                    <div class="card-hover-in">
                        <h3><i class="fas fa-plane"></i> ${card.cityTo}</h3>
                        <div>
                            <p>from <span class="price-slider">${Object.values(card.price)[0]} </span><span class="price-currency">${Object.keys(card.price)[0]}</span></p>
                            <p class='slider-date'>${card.flightDate}</p>  
                        </div>
                        <button class='details-btn'>More Details</button>
                    </div>`;
                    newCard.style.backgroundImage = `url(./resources/${card.cityTo}.jpg)`;
            dfSlider.appendChild(newCard);
        })
        newCard = document.createElement('li');
        newCard.classList.add('sd-card-blank');
        newCard.innerHTML = '<i class="fas fa-search-location"></i>';
        dfSlider.appendChild(newCard)
        ulSlider.innerHTML = '';
        console.log(ulSlider)
        ulSlider.appendChild(dfSlider);

    // })
    
}