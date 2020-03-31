const newestTwelve = fetch('https://api.skypicker.com/flights?partner=picky&fly_from=TGD&direct_flights=1&date_from=01%2F04%2F2020&date_to=01%2F05%2F2020&sort=date&limit=12');
let cityToArr = [];
newestTwelve.then( response => response.json())
            .then(obj => obj.data)
            .then(flightArr => {
                return flightArr.map(flight => [flight.cityTo, flight.airlines[0]]); 
            })
            .then(arr => {
                cityToArr = [...arr];
                // document.querySelector('.card-hover-in h3').textContent = cityToArr[0][0]
            });



            