const fligtOptions = document.querySelector(".flight-options");
const options = fligtOptions.children;
const searchQuery = document.querySelector(".search-query");
const queryItems = searchQuery.children;
const fromElement = document.querySelector("#from");
const toElement = document.querySelector("#to");

//IIF to add event listeners to travel options
(function addEventListenersToFlightOptions(){

    Array.from(options).forEach(option => {
        option.addEventListener("click",()=>{
            removeActiveClassFromAll(option,options);
            addActiveClass(option);
        });
    });

    Array.from(queryItems).forEach(item => {
        item.addEventListener("click",()=>{
            removeActiveClassFromAll(item,queryItems);
            addActiveClass(item);
        })
    })

    console.log("test")
    addEmptyClass(fromElement);
    addEmptyClass(toElement)

    function addEmptyClass(element){
        element.addEventListener("keyup",(e)=>{
            if(e.target.value === ""){
                element.classList.add("empty")
            }else{
                element.classList.remove("empty")
            }
        })
    }

    function addActiveClass(input){
        input.classList.add("active");
    }

    function removeActiveClassFromAll(input,array){
        Array.from(array).forEach(option => {
            if(option!=input){
                option.classList.remove("active");
            }
        })
    }
})();


