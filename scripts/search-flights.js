const formContainer = $(".form-container");

const tripOption = $(".col-trip a");
const travelersOption = $(".col-travelers a");
const cabinOption = $(".col-cabin a");

const tripAllOptions = $(".trip");
const travelersAllOptions = $(".travelers");
const cabinAllOptions = $(".cabin");

const retDate = $(".returnDate");
console.log(retDate)
const searchOptions = document.querySelectorAll(".col-ul");

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
        if(li.textContent !== "Round trip"){
          formContainer.classList.add("one-way")
        }else{
          formContainer.classList.remove("one-way");
        }
        tripUl.parentElement.classList.add("hide");
        let icon = tripOption.children[0];
        tripOption.textContent = li.textContent+" ";
        tripOption.appendChild(icon)
      });
    });
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
