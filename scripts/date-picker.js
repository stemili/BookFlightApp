const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const depart_element = document.querySelector("#depDate")
const return_element = document.querySelector("#retDate")
const bodyEl = document.querySelector('body');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let activeDate;

mth_element.textContent = months[month] + ' ' + year;

depart_element.addEventListener("click",(e)=>{
	activeDate = depart_element;
	date_picker_element.classList.remove("show")
	date_picker_element.classList.remove("return");
	date_picker_element.classList.add("depart");
	date_picker_element.classList.add("show")
})

return_element.addEventListener("click",(e)=>{
	activeDate = return_element;
	date_picker_element.classList.remove("show")
	date_picker_element.classList.remove("depart");
	date_picker_element.classList.add("return");
	date_picker_element.classList.add("show")
})

// removing date element on 'blur' FIX
bodyEl.addEventListener('mouseup', e => {
	if(!(e.target.classList.contains('next-mth') || e.target.classList.contains('prev-mth'))){
		date_picker_element.classList.remove("show");
	}
})

populateDates();

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
	populateDates(e);
}

function goToPrevMonth (e) {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates(e);
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

			activeDate.value = formatDate(selectedDate)
			populateDates();
			date_picker_element.classList.remove("show");
		});
		// date_picker_element.classList.remove("show");
		days_element.appendChild(day_element);

	}
}

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

	return day + '/' + month + '/' + year;
}
