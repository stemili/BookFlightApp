const fligtOptions = document.querySelector(".flight-options");
const options = fligtOptions.children;
const searchQuery = document.querySelector(".search-query");
const queryItems = searchQuery.children;
const fromElement = document.querySelector("#from");
const toElement = document.querySelector("#to");
const flightDateElement = document.querySelector("#departure");
const returnDateElement = document.querySelector("#return");
const returnElementX = returnDateElement.lastElementChild; 
let activeFlightOption;

//IIF to add event listeners to travel options
(function addEventListenersToFlightOptions(){

    document.addEventListener("click",()=>{
        if(activeFlightOption==options[0]){
            queryItems[1].lastElementChild.style.display="none";
        }else{
            queryItems[1].lastElementChild.style.display="block";
    
        }
    })

    returnDateElement.addEventListener("click",()=>{
        removeActiveClassFromAll(options);
        addActiveClass(options[1]);
    })

    returnElementX.addEventListener("click",(e)=>{
        e.stopImmediatePropagation();
        returnDateElement.classList.remove("notEmpty");
        returnDateElement.classList.add("empty");
        removeActiveClassFromAll(options);
        addActiveClass(options[0]);
        activeFlightOption = options[0];
        queryItems[1].lastElementChild.style.display="none";

        returnDateElement.firstElementChild.value = "";

    })

    Array.from(options).forEach(option => {
        option.addEventListener("click",()=>{
            removeActiveClassFromAll(options);
            addActiveClass(option);
            activeFlightOption = option;
        });
    });

    Array.from(queryItems).forEach(item => {
        item.addEventListener("click",()=>{
            removeActiveClassFromAll(queryItems);
            addActiveClass(item);
        })
    })

    addEmptyClassAndListeners(fromElement);
    addEmptyClassAndListeners(toElement);
    addEmptyClassAndListeners(flightDateElement);
    addEmptyClassAndListeners(returnDateElement);



    function addEmptyClassAndListeners(element){
        
        
        element.addEventListener("keyup",(e)=>{
            if(e.target.value === ""){
                element.classList.add("empty")
            }else{
                element.classList.remove("empty")
            }
        })

        // element.addEventListener("click",(e)=>{
        //     console.log(e.target.value)
        //     if(e.target.value === ""){
        //         element.classList.remove("empty")
        //     }
        // })

        // element.addEventListener("mouseleave",(e)=>{
        //     console.log("test")
        //     console.log(e.target)
        //     if(e.target.children[0].value === ""){
        //         element.classList.add("empty");
        //     }
        // })

        // document.addEventListener("click",()=>{
        //     if(fromElement.children[0].value === ""){
        //         fromElement.classList.add("empty");
        //     }
        //     if(toElement.children[0].value === ""){
        //         toElement.classList.add("empty");
        //     }
        // })
        
        

    }

    function addActiveClass(input){
        input.classList.add("active");
    }

    function removeActiveClassFromAll(array){
        Array.from(array).forEach(option => {
            
                option.classList.remove("active");
            
        })
    }
})();

