const cityFrom = document.getElementById('fromDest');
const cityTo = document.getElementById('toDest');
const depDate = document.getElementById('depDate');
const returnDate = document.getElementById('retDate');
const cabinClass = document.querySelector('.col-cabin a');
const noAdults = document.getElementById('noOfAdults');
const noChildren = document.getElementById('noOfChildren');
const noInfants = document.getElementById('noOfInfants');


const ulSearchDisplay = document.getElementById('resultList');
const searchForm = document.getElementById('searchForm');
const autocompleteSelect = document.querySelectorAll('.autocomplete');
const mainSubmitBtn = document.getElementById('submitBtn');
const formContainerList = document.querySelector('.form-container');


let start = 0,
    end = 5,
    pageId = 1;
const searchParams = {};
let searchResults = [];
const cabins = {
    'M' : 'Economy',
    'W' : 'E-Premium',
    'C' : 'Business',
    'F' : 'First Class'
}
const reverseCabins = {
    'Economy' : 'M',
    'E-Premium' : 'W',
    'Business' : 'C',
    'First Class' : 'F'
}



async function handleSearchSubmit(e){
    pageId = 1;
    start = 0;
    end = 5;
    e.preventDefault();
    ulSearchDisplay.innerHTML = `
            <ul class="slider-cards">
                <div class="slider-loader">
                    <div class="spinner"></div>
                </div>
            </ul>
    `;

    formContainerList.classList.add('search-small-form');

    let sortByS = document.querySelector('.col-sort-by a').textContent.slice(8,).trim().toLowerCase();

    searchParams.depDate = depDate.value;
    searchParams.retDate = returnDate.value;
    searchParams.iataFrom = [];
    searchParams.iataTo = [];
    searchParams.direct = (document.getElementById('searchCheckbox').checked) ? 1 : 0; // direct flight === 1
    searchParams.selected_cabins = reverseCabins[cabinClass.textContent.trim()]; //cabin selection [M, W, C, F]
    searchParams.adults = noAdults.textContent;
    searchParams.children = noChildren.textContent;
    searchParams.infants = noInfants.textContent;
    searchParams.sort = sortByS ? sortByS : 'quality';
    await fetch('../resources/iataCodes/internationalAirports.json')
        .then(res => res.json())
        .then(data => data.forEach(element=> {
            let regexFrom = new RegExp('^'+cityFrom.value, 'i');
            let regexTo = new RegExp('^'+cityTo.value, 'i');

            if(regexFrom.test(element.city)){
                searchParams.iataFrom.push(element.iata);
            }
            if(regexTo.test(element.city)){
                searchParams.iataTo.push(element.iata);
            }
        }))
    
    fetch(`https://api.skypicker.com/flights?partner=picky&fly_from=${searchParams.iataFrom.join(',')}&to=${searchParams.iataTo.join(',')}&direct_flights=${searchParams.direct}&date_from=${searchParams.depDate}&date_to=${searchParams.depDate}&return_from=${searchParams.retDate}&return_to=${searchParams.retDate}&selected_cabins=${searchParams.selected_cabins}&adults=${searchParams.adults}&children=${searchParams.children}&infants=${searchParams.infants}&sort=${searchParams.sort}&limit=100`)
        .then(response => response.json())
        .then(data => {
            if(data.data.length !== 0){
                searchResults = data.data;
                loadFlightResults(data.data.slice(start,end));
            } else {
                ulSearchDisplay.innerHTML = `
                    <div class='slider-loader'>
                        <p class='center-notification'>S<i class="far fa-sad-tear"></i>rry, No Results...</p>
                    </div>
            `;
            }
            
        })
        .catch(error => {
            console.log('Locations and First Date Inputs are Mandatory... Also check if your return date is higher then first departure date');
            ulSearchDisplay.innerHTML = `
            <div class='slider-loader'>
                <p class='center-warning'>Please Provide Valid Data <i class="fas fa-exclamation-triangle"></i></p>
            </div>
            `;
        })
}


function loadFlightResults(data){
    let delay = 1;
    let dfResults = new DocumentFragment();
    data.forEach(ticket => {
        let newItem = document.createElement('li');
        newItem.classList.add('result-li');
        newItem.classList.add('animated' , 'fadeInLeft' , `li-delay-${delay}`);
        delay++;
        let stops;
        if(ticket.routes.length === 2  && ticket.route.length === 2){
            stops = 'Direct Flights';
        } else if (ticket.routes.length === 2  && ticket.route.length > 2){
            stops = `${ticket.route.length-2} Stopovers`
        } else if(ticket.routes.length === 1  && ticket.route.length === 1){
            stops = "Direct"
        } else if(ticket.routes.length === 1  && ticket.route.length > 1){
            stops = `${ticket.route.length-1} Stopovers`
        } else {
            stops = `${ticket.route.length} STOPS`;
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
                      <p><span class="class-li">${cabins[searchParams.selected_cabins]}</span> </p>
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
    let navigationList = document.createElement('div');
    navigationList.classList.add('navigation-list')
    navigationList.innerHTML = `
        <i class="fas fa-caret-left"></i> 
        <i class="fas fa-ellipsis-h"></i>
        <p id='page-id'>${pageId}</p> 
        <i class="fas fa-ellipsis-h"></i>
        <i class="fas fa-caret-right"></i> 
    `;
    dfResults.appendChild(navigationList);
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

  function handleNavigationArrows(e){
    if(e.target.classList.contains('fa-caret-left')){
        if(start > 0 && end > 5){
            start -= 5;
            end -= 5;
            pageId--;
            loadFlightResults(searchResults.slice(start,end));
        } else {
            e.target.classList.add('warning-arrow');
            setTimeout(()=>{
                e.target.classList.remove('warning-arrow');
            },1000)
        }
        
    } else if(e.target.classList.contains('fa-caret-right')){
        if(end < searchResults.length){
            start += 5;
            end += 5;
            pageId++;
            loadFlightResults(searchResults.slice(start,end));
        }
        
    }
}

function handleSearch(e){
    autocompleteFrom = [];
    if(e.target.value !== ''){
        fetch('../resources/iataCodes/internationalAirports.json')
        .then(res => res.json())
        .then(data => {
            let results = [];
            let regex = new RegExp('^'+e.target.value, 'i');
            for(element of data){
                if(regex.test(element.city)){
                    results.push(element.city);
                }
                if(results.length > 3){
                    break;
                }
            }
            return results;
        })
        .then(results => {
            e.target.nextElementSibling.classList.remove('hide-autocomp');
            let dfResults = new DocumentFragment();
            if(results.length>0){
                results.forEach(result=>{
                    let newRes = document.createElement('li');
                    newRes.textContent = result;
                    dfResults.appendChild(newRes);
                })
                e.target.nextElementSibling.innerHTML = '';
                e.target.nextElementSibling.appendChild(dfResults);
            } else {
                e.target.nextElementSibling.innerHTML = '<p class="no-result">No Results</p>';
            }
            
        })
    } else {
        e.target.nextElementSibling.innerHTML = '';
        e.target.nextElementSibling.classList.add('hide-autocomp');
    }
}

function handleBlur(e){
    setTimeout(()=>{
        e.target.nextElementSibling.classList.add('hide-autocomp');
    },100)
}

function passSearchResult(e){
    e.target.parentElement.previousElementSibling.value = e.target.textContent;
}




ulSearchDisplay.addEventListener('click', handleNavigationArrows);

mainSubmitBtn.addEventListener('click', handleSearchSubmit);

searchForm.addEventListener('submit', e =>{
    e.preventDefault();
})

cityFrom.addEventListener('keyup', handleSearch)
cityFrom.addEventListener('blur', handleBlur)

cityTo.addEventListener('keyup', handleSearch)
cityTo.addEventListener('blur', handleBlur)

autocompleteSelect.forEach(element =>{
    element.addEventListener('click', passSearchResult);
})
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