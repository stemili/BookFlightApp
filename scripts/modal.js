const cardsUl = document.querySelector('.slider-cards');
const modalWindow = document.getElementById('modal-win');
const modalContentTop = document.querySelector('.modal-content-top');


const closeBtn = document.getElementById('close-modal-btn')


cardsUl.addEventListener('click', (e)=>{
    if(e.target.classList.value === 'details-btn'){
        // sliderContent from slide.js contains latest 12 flights
        let requestedFlight = sliderContent.filter(element => element.id === e.target.parentElement.parentElement.id ? true : false);
        if(requestedFlight[0] !== ''){
            fillModalWindow(requestedFlight[0]);
            handleModalIn();
        }
        
    }
})

closeBtn.addEventListener('click', handleCloseBtn);

function handleModalIn(e){
    modalWindow.classList.add('modal-active');
}

function handleCloseBtn(e){
    modalWindow.classList.remove('modal-active');
}

function fillModalWindow(flight){
    const cityFrom = document.getElementById('cityFrom');
    const cityTo = document.getElementById('cityTo');
    const airlinesModTop = document.getElementById('modal-airlines-code');
    const departureDate = document.getElementById('flightDate');
    const airlinesBottom = document.querySelector('.md-air-code');
    const iataFrom = document.getElementById('modal-iataFrom');
    const iataTo = document.getElementById('modal-iataTo');
    const depTime = document.getElementById('modal-dep-time');
    const arrTime = document.getElementById('modal-arr-time');
    const durTime = document.getElementById('modal-duration');
    const oneBagPrice = document.getElementById('modal-oneb-price');
    const twoBagPrice = document.getElementById('modal-twob-price');
    const price = document.getElementById('md-price');
    const currencies = document.querySelectorAll('.md-currency');

    cityFrom.textContent = flight.cityFrom;
    cityTo.textContent = flight.cityTo;
    airlinesModTop.textContent = flight.airline;
    departureDate.textContent = flight.flightDate;
    airlinesBottom.textContent = flight.airline+' Airlines';
    iataFrom.textContent = flight.iataFrom;
    iataTo.textContent = flight.iataTo;
    depTime.textContent = flight.depTime;
    arrTime.textContent = flight.arrTime;
    durTime.textContent = flight.flyDur;
    currencies.forEach(element => {element.textContent = Object.keys(flight.price)[0]});
    if(flight.bagsPrice['1'] != 0){
        oneBagPrice.textContent = flight.bagsPrice['1'] 
    } else {
        oneBagPrice.textContent = 'FREE';
        currencies[0].textContent = '';
    }
    if(!flight.bagsPrice['2']){
        currencies[1].textContent = '';
        twoBagPrice.textContent = 'N/A';
    } else {
        twoBagPrice.textContent = flight.bagsPrice['2'];
    }
    price.textContent = Object.values(flight.price)[0];
    modalContentTop.style.backgroundImage = `url('../resources/${flight.cityTo}.jpg')`;
    
    
}