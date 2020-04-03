const bestOfDom = document.querySelector('.best-of .best-of-content');

let bestOfContent = [];
// informations from fetch we are getting from slider.js
const bestFetch = fetch(`https://api.skypicker.com/flights?partner=picky&fly_from=${userLocation.iata}&date_from=${dateFrom}&date_to=30%2F12%2F2020&sort=price&max_stopovers=0`);

bestFetch.then(response => response.json())
         .then(parsed => parsed.data)
         .then(flights => removeRepeatedCities(flights).slice(0,3))
         .then(arr => arr.map(flight => {
            return {
                id : flight.id,
                cityFrom : flight.cityFrom,
                cityTo : flight.cityTo,
                countryTo : flight.countryTo.name,
                iataFrom : flight.flyFrom,
                iataTo : flight.flyTo,
                airline : flight.airlines[0],
                price : flight.conversion,
                bagsPrice : flight.bags_price,
                depTime : convertUNIXtoUTC(flight.dTime).slice(17,22),
                arrTime : convertUNIXtoUTC(flight.aTime).slice(17,22),
                flyDur : flight.fly_duration,
                distance : flight.distance,
                flightDate : convertUNIXtoUTC(flight.dTime).slice(4,17),
                bookLink : flight.deep_link

            }
        }))
         .then(filteredArr => {
             createBestCards(filteredArr)
             bestOfContent = filteredArr;
         })


function removeRepeatedCities (flights){
    return flights.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.cityTo === thing.cityTo
    ))
  )
}

function createBestCards(bestContentArr){
    bestOfDom.innerHTML = `<h4>The world's best flight deals</h4>
    <p>Save heaps on your next summer vacation, holiday getaway or dream trip to a bucket list destination.</p>`;
    let dfBestSlider = new DocumentFragment();
    bestContentArr.forEach(card => {
        let newCard = document.createElement('div');
        newCard.classList.add('best-card');
        newCard.id = card.id;
        newCard.innerHTML = `
            <img src="./resources/${card.cityTo.toLowerCase()}.jpg" alt="">
            <div>
                <div>
                    <p><span class="best-of-city">${card.cityTo}</span>, <span class="best-of-country">${card.countryTo}</span></p>
                    <p>As low as <span class="best-of-price">${Object.values(card.price)[0]}</span><span class="best-of-currency">${Object.keys(card.price)[0]}</span></p>
                </div>
                <button class="best-of-btn">Details</button>
            </div>`;
        dfBestSlider.appendChild(newCard);
        })
        bestOfDom.appendChild(dfBestSlider);
}
