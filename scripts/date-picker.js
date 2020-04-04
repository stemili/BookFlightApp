const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const depart_element = document.querySelector("#departure")
const return_element = document.querySelector("#return")


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let activeElement;

mth_element.textContent = months[month] + ' ' + year;

depart_element.addEventListener("click",(e)=>{
	activeElement = null;
	
	activeElement = depart_element

	date_picker_element.classList.add("show")
	date_picker_element.getElementsByClassName.left = "40%"
})

return_element.addEventListener("click",(e)=>{
	activeElement = null;
	activeElement = return_element

	date_picker_element.classList.add("show")
	date_picker_element.getElementsByClassName.left = "50%"
})


function dateEventListenersCheck(element){
	if(element===depart_element){}
}


populateDates();
console.log(formatDate(date))

// EVENT LISTENERS
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS

function goToNextMonth (e) {
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function goToPrevMonth (e) {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function populateDates (e) {
	days_element.innerHTML = '';
	let amount_days = 31;

	if (month == 1) {
		amount_days = 28;
	}

	for (let i = 0; i < amount_days; i++) {
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
			day_element.classList.add('selected');
		}

		day_element.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

			activeElement.children[0].value = formatDate(selectedDate)
			activeElement.classList.remove("empty")
			date_picker_element.classList.remove("show")
			populateDates();
		});

		days_element.appendChild(day_element);
	}
}

// HELPER FUNCTIONS
// function checkEventPathForClass (path, selector) {
// 	for (let i = 0; i < path.length; i++) {
// 		if (path[i].classList && path[i].classList.contains(selector)) {
// 			return true;
// 		}
// 	}
	
// 	return false;
// }
function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let month = d.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = d.getFullYear();

	return day + ' / ' + month + ' / ' + year;
}
