const formContainer = $(".form-container");
const fromDest = $("#fromDest");
const toDest = $("#toDest");

const tripOption = $(".col-trip a");
const travelersOption = $(".col-travelers a");
const cabinOption = $(".col-cabin a");
const sortByOption = $(".col-sort-by a");

const tripAllOptions = $(".trip");
const travelersAllOptions = $(".travelers");
const cabinAllOptions = $(".cabin");
const sortByAllOptions = $(".sort-by");

const retDate = $(".returnDate");
const switchDestinationsBtn = $("#switchBtn");
const searchOptions = document.querySelectorAll(".col-ul");

let travelerObj = {
  adults: 1,
  children: 0,
  infants: 0,
  travelers: 1,
};

function $(selector) {
  return document.querySelector(selector);
}

(function loadEventListeners() {
  switchDestinationsBtn.addEventListener("click", (e) => {
    let tempValue = fromDest.value;
    fromDest.value = toDest.value;
    toDest.value = tempValue;
  });

  tripOption.addEventListener("click", (e) => {
    e.stopPropagation();
    hideAllBut(e.currentTarget.parentElement);
  });
  travelersOption.addEventListener("click", (e) => {
    e.stopPropagation();
    hideAllBut(e.currentTarget.parentElement);
  });

  cabinOption.addEventListener("click", (e) => {
    e.stopPropagation();
    hideAllBut(e.currentTarget.parentElement);
  });

  sortByOption.addEventListener("click", (e) => {
    e.stopPropagation();
    hideAllBut(e.currentTarget.parentElement);
  });

  formContainer.addEventListener("click", (e) => {
    tripAllOptions.classList.add("hide");
    travelersAllOptions.classList.add("hide");
    cabinAllOptions.classList.add("hide");
    sortByAllOptions.classList.add("hide");
  });

  (function eventListenersForLi() {
    let tripUl = tripAllOptions.firstElementChild;
    let travelersUl = travelersAllOptions.firstElementChild;
    let cabinUl = cabinAllOptions.firstElementChild;
    let sortByUl = sortByAllOptions.firstElementChild;

    //adding event listeners to list items of drop down options
    [...tripUl.children].forEach((li) => {
      li.addEventListener("click", (e) => {
        if (li.textContent !== "Round trip") {
          formContainer.classList.add("one-way");
        } else {
          formContainer.classList.remove("one-way");
        }
        switchTextContent(li, tripUl);
      });
    });

    [...cabinUl.children].forEach((li) => {
      li.addEventListener("click", (e) => {
        switchTextContent(li, cabinUl);
      });
    });
    [...sortByUl.children].forEach((li) => {
      li.addEventListener("click", (e) => {
        switchTextContent(li, sortByUl);
      });
    });

    let adultsSpan = $("#noOfAdults");
    let childrenSpan = $("#noOfChildren");
    let noOfInfantsSpan = $("#noOfInfants");

    //travelers option logic and event listeners
    [...travelersUl.children].forEach((li) => {
      let colRightElements = li.lastElementChild.children;
      let minusBtn = colRightElements[0];
      let noOfPeopleSpan = colRightElements[1];
      let plusBtn = colRightElements[2];
      switch (noOfPeopleSpan) {
        case adultsSpan:
          minusBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (travelerObj.adults <= 0) {
              return;
            } else {
              travelerObj.adults--;
              travelerObj.travelers--;
            }
            changeTravelersText();
            noOfPeopleSpan.textContent = travelerObj.adults;
          });
          plusBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            travelerObj.adults++;
            travelerObj.travelers++;
            changeTravelersText();
            adultsSpan.textContent = travelerObj.adults;
          });
          break;
        case childrenSpan:
          minusBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (travelerObj.children <= 0) {
              return;
            } else {
              travelerObj.children--;
              travelerObj.travelers--;
            }
            changeTravelersText();
            childrenSpan.textContent = travelerObj.children;
          });
          plusBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            travelerObj.children++;
            travelerObj.travelers++;
            changeTravelersText();

            childrenSpan.textContent = travelerObj.children;
          });
          break;
        case noOfInfantsSpan:
          minusBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (travelerObj.infants <= 0) {
              return;
            } else {
              travelerObj.infants--;
              travelerObj.travelers--;
            }
            changeTravelersText();
            noOfInfantsSpan.textContent = travelerObj.infants;
          });
          plusBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            travelerObj.infants++;
            travelerObj.travelers++;
            changeTravelersText();

            noOfInfantsSpan.textContent = travelerObj.infants;
          });
          break;
          function changeTravelersText() {
            let whoTravels = checkIfTravelers();
            let icon = createIcon();
            travelersOption.textContent = `${travelerObj.travelers} ${whoTravels}`;
            travelersOption.appendChild(icon);
          }
      }
      // no parameter isn't referencing,maybe fix later
      // function plusMinusEventListenersFor(no, spanElement) {
      //   minusBtn.addEventListener("click", (e) => {
      //     e.stopPropagation();
      //     if (no <= 0) {
      //       return;
      //     } else {
      //       no++;
      //       travelerObj.travelers--;
      //     }
      //     changeTravelersText();
      //     spanElement.textContent = no;
      //   });

      //   plusBtn.addEventListener("click", (e) => {
      //     e.stopPropagation();
      //     no++;
      //     travelerObj.travelers++;
      //     changeTravelersText();
      //     spanElement.textContent = no;
      //   });
      // }

      function checkIfTravelers() {
        if (
          travelerObj.adults > 0 &&
          travelerObj.children === 0 &&
          travelerObj.infants === 0
        ) {
          return "adults";
        } else if (
          travelerObj.adults === 0 &&
          travelerObj.children > 0 &&
          travelerObj.infants === 0
        ) {
          return "children";
        } else if (
          travelerObj.adults === 0 &&
          travelerObj.children === 0 &&
          travelerObj.infants > 2
        ) {
          alert("Infants can't go on plane without adult's supervision!");
          return "adults";
        } else {
          return "travelers";
        }
      }
    });

    function switchTextContent(li, ul) {
      ul.parentElement.classList.add("hide");
      let optionForChange = ul.parentElement.parentElement.children[0];
      if (ul === sortByUl) {
        optionForChange.textContent = `Sort by: ${li.textContent} `;
      } else {
        optionForChange.textContent = li.textContent + " ";
      }
      let icon = createIcon();
      optionForChange.appendChild(icon);
    }

    function createIcon() {
      let icon = document.createElement("i");
      icon.classList.add("fas", "fa-chevron-down");
      return icon;
    }
  })();

  function hideAllBut(element) {
    switch (element) {
      case tripOption.parentElement:
        tripAllOptions.classList.remove("hide");
        travelersAllOptions.classList.add("hide");
        cabinAllOptions.classList.add("hide");
        sortByAllOptions.classList.add("hide");
        break;
      case travelersOption.parentElement:
        tripAllOptions.classList.add("hide");
        travelersAllOptions.classList.remove("hide");
        cabinAllOptions.classList.add("hide");
        sortByAllOptions.classList.add("hide");
        break;
      case cabinOption.parentElement:
        tripAllOptions.classList.add("hide");
        travelersAllOptions.classList.add("hide");
        cabinAllOptions.classList.remove("hide");
        sortByAllOptions.classList.add("hide");
        break;
      case sortByOption.parentElement:
        tripAllOptions.classList.add("hide");
        travelersAllOptions.classList.add("hide");
        cabinAllOptions.classList.add("hide");
        sortByAllOptions.classList.remove("hide");
    }
  }
})();
