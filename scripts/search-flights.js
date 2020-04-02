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

    addEmptyClassAndListeners(fromElement);
    addEmptyClassAndListeners(toElement)



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

    function removeActiveClassFromAll(input,array){
        Array.from(array).forEach(option => {
            if(option!=input){
                option.classList.remove("active");
            }
        })
    }
})();


