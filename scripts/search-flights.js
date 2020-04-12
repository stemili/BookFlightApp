const formContainer = $(".form-container");

const tripOption = $(".col-trip a");
const travelersOption = $(".col-travelers a");
const cabinOption = $(".col-cabin a");

const tripAllOptions = $(".trip");
const travelersAllOptions = $(".travelers");
const cabinAllOptions = $(".cabin");

const retDate = $(".returnDate");
const searchOptions = document.querySelectorAll(".col-ul");
let adults = 1;
let children = 0;
let infants = 0;
let travelers = 1;

function $(selector) {
  return document.querySelector(selector);
}

(function loadEventListeners() {
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

  formContainer.addEventListener("click", (e) => {
    tripAllOptions.classList.add("hide");
    travelersAllOptions.classList.add("hide");
    cabinAllOptions.classList.add("hide");
  });

  //   document.addEventListener("click",(e)=>{
  //       let selectedOption = e.target.parentElement.children[1]
  //       let isClickedInside = false;
  //     //   console.log(isClickedInside)
  //     //   if(!isClickedInside){
  //     //       travelersAllOptions.classList.add("hide");
  //     //   }
  //       hideIfClickedOutside(e.target,selectedOption)

  //       function hideIfClickedOutside(target,option){
  //           console.log(option)
  //         isClickedInside = option.contains(target);
  //         if(!isClickedInside){
  //             option.classList.add("hide")
  //         }
  //       }

  //   });
  (function eventListenersForLi() {
    let tripUl = tripAllOptions.firstElementChild;
    let travelersUl = travelersAllOptions.firstElementChild;
    let cabinUl = cabinAllOptions.firstElementChild;

    [...tripUl.children].forEach((li) => {
      li.addEventListener("click", (e) => {
        if (li.textContent !== "Round trip") {
          formContainer.classList.add("one-way");
        } else {
          formContainer.classList.remove("one-way");
        }
        switchTextContent(li, tripUl);
        // tripUl.parentElement.classList.add("hide");
        // let icon = tripOption.children[0];
        // tripOption.textContent = li.textContent+" ";
        // tripOption.appendChild(icon)
      });
    });

    [...cabinUl.children].forEach((li) => {
      li.addEventListener("click", (e) => {
        switchTextContent(li, cabinUl);
      });
    });

    let adultsSpan = $("#noOfAdults");
    let childrenSpan = $("#noOfChildren");
    let noOfInfantsSpan = $("#noOfInfants");

    [...travelersUl.children].forEach((li) => {
      let colRightElements = li.lastElementChild.children;
      let minusBtn = colRightElements[0];
      let noOfPeopleSpan = colRightElements[1];
      let plusBtn = colRightElements[2];
      switch (noOfPeopleSpan) {
        case adultsSpan:
          plusMinusEventListenersFor("adults", adultsSpan);
          break;
        case childrenSpan:
          plusMinusEventListenersFor("children", childrenSpan);
          console.log("test2");

          break;
        case noOfInfantsSpan:
          console.log("test3");
          plusMinusEventListenersFor("infants", noOfInfantsSpan);
          break;
      }

      function plusMinusEventListenersFor(no, spanElement) {
        minusBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (no <= 0) {
            return;
          } else {
            no--;
            travelers--;
          }
          changeTravelersText();
          console.log(
            `adults: ${adults},children: ${children},infants${infants}`
          );
          spanElement.textContent = no;
        });

        plusBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          no++;
          travelers++;
          changeTravelersText();
          console.log(
            `adults: ${adults},children: ${children},infants${infants}`
          );

          spanElement.textContent = no;
        });

        function changeTravelersText() {
          let whoTravels = checkIfTravelers();
          let icon = createIcon();
          travelersOption.textContent = `${travelers} ${whoTravels}`;
          travelersOption.appendChild(icon);
        }
      }

      function checkIfTravelers() {
        if (adults > 0 && children === 0 && infants === 0) {
          console.log("test2");

          return "adults";
        } else if (adults === 0 && children > 0 && infants === 0) {
          return "children";
        } else if (adults === 0 && children === 0 && infants > 2) {
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
      optionForChange.textContent = li.textContent + " ";
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
        break;
      case travelersOption.parentElement:
        tripAllOptions.classList.add("hide");
        travelersAllOptions.classList.remove("hide");
        cabinAllOptions.classList.add("hide");
        break;
      case cabinOption.parentElement:
        tripAllOptions.classList.add("hide");
        travelersAllOptions.classList.add("hide");
        cabinAllOptions.classList.remove("hide");
        break;
    }
  }
})();
