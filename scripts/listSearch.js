const cityFrom = document.getElementById('fromDest');
const cityTo = document.getElementById('toDest');
const depDate = document.getElementById('depDate');
const retDate = document.getElementById('retDate');
//request direct flight

const ulSearchDisplay = document.getElementById('resultList');

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', handleSearchSubmit);

const searchParams = {};

const cabins = {
    'M' : 'Economy',
    'W' : 'E-Premium',
    'C' : 'Business',
    'F' : 'First Class'
}

async function handleSearchSubmit(e){
    e.preventDefault();
    searchParams.depDate = depDate.value;
    searchParams.retDate = retDate.value;
    searchParams.iataFrom = [];
    searchParams.iataTo = [];
    searchParams.direct = 1; //static direct flight
    searchParams.round = 0; // static round flight
    searchParams.selected_cabins = 'M'; //cabin selection [M, W, C, F]
    searchParams.adults = 1;
    searchParams.children = 0;
    searchParams.infants = 0;
    await fetch('../resources/iataCodes/internationalAirports.json')
        .then(res => res.json())
        .then(data => data.forEach(element=> {
            let regexFrom = new RegExp(cityFrom.value, 'i');
            let regexTo = new RegExp(cityTo.value, 'i');

            if(regexFrom.test(element.city)){
                searchParams.iataFrom.push(element.iata);
            }
            if(regexTo.test(element.city)){
                searchParams.iataTo.push(element.iata);
            }
        }))
    
    fetch(`https://api.skypicker.com/flights?partner=picky&fly_from=${searchParams.iataFrom.join(',')}&to=${searchParams.iataTo.join(',')}&direct_flights=${searchParams.direct}&date_from=${searchParams.depDate}&date_to=${searchParams.depDate}&return_from=${searchParams.retDate}&return_to=${searchParams.retDate}&selected_cabins=${searchParams.selected_cabins}&adults=${searchParams.adults}&children=${searchParams.children}&infants=${searchParams.infants}&sort=quality&limit=50`)
        .then(response => response.json())
        .then(data => {
            console.log(data.data)
            loadFlightResults(data.data);
        });
}


function loadFlightResults(data){
    let dfResults = new DocumentFragment();
    data.forEach(ticket => {
        let newItem = document.createElement('li');
        newItem.classList.add('result-li');
        let stops;
        if(ticket.routes.length === 2  && ticket.route.length === 2){
            stops = 'Direct Flights';
        } else if(ticket.routes.length === 1  && ticket.route.length === 1){
            stops = "Direct"
        } else {
            stops = `${ticket.routes[0].length} stops`;
        }
        newItem.innerHTML = `
            <div class="li-main">
                      <p class="date-li"><i class="far fa-calendar-alt"></i> ${(new Date(ticket.dTime * 1000)).toDateString().slice(0,10)}</p>
                      <div class="li-flight-info">
                        <div class="location-li-dep">
                            <p class="time-dep-li">${parseTime(ticket.dTime)}</p>
                            <p><span class="city-dep-li">${ticket.cityFrom}</span> <span class="airport-dep-li">${ticket.flyFrom}</span></p>
                        </div>
                        <div class="middle-line">
                            <div>
                                <div></div>
                                <div>
                                    <span>${ticket.fly_duration}</span>
                                    <span><i class="fas fa-plane"></i></span>
                                    <span>${stops}</i></span>
                                </div>
                                <div></div>
                            </div>
                        </div>
                        <div class="location-li-arr">
                            <p class="time-arr-li">${parseTime(ticket.aTime)}</p>
                            <p><span class="city-arr-li">${ticket.cityTo}</span> <span class="airport-arr-li">${ticket.flyTo}</span></p>
                        </div>
                      </div>
                      <p><span class="class-li">${cabins[searchParams.selected_cabins]}</span> <button>More<i class="fas fa-chevron-down"></i></button></p>
                  </div>
                  <span class="line-li-result"></span>
                  <div class="li-price">
                    <p><span class="price-amount">${ticket.price}</span><span class="price-currency">EUR</span></p>
                    <a href="${ticket.deep_link}" target="_blank">Book</a>
                    <p class="${ticket.routes.length === 2 ? 'return-li show-return' : 'return-li'}">RETURN TICKET</p>
            </div>
        `;
        dfResults.appendChild(newItem);
    })
    ulSearchDisplay.innerHTML = '';
    ulSearchDisplay.appendChild(dfResults);
}

function parseTime(date){
    let timeDate = new Date(date * 1000);
    let h = addZero(timeDate.getHours());
    let m = addZero(timeDate.getMinutes());
    return h + ":" + m;
}
function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }


//formating JSON file
// fetch('../resources/iataCodes/airports.json')
//         .then(response => response.json())
//         .then(data => Object.values(data))
//         .then(data => data.map(element => {
//             return {
//                 "iata" : element['iata'],
//                 "city" : element['city']
//             }
//         }))
//         .then(data => data.filter(element=>{
//             if(element['iata'] === '' || element['city'] === ''){
//                 return false;
//             }else {
//                 return true;
//             }
//         }))
//         .then(data => console.log(JSON.stringify(data)))