(function (){
    const moreInfoButtons = document.querySelectorAll(".pop-up-button");
    const closeInfoButtons = document.querySelectorAll("#about-close-button");
    [...closeInfoButtons].forEach(button => button.addEventListener("click",moreInfo));
    [...moreInfoButtons].forEach(button => {if(button.id !== "about-close-button")button.addEventListener("click",moreInfo)});
})()

function moreInfo(e){
    if(this.textContent !== "CLOSE"){
    this.parentNode.parentNode.style.transform = "rotateY(180deg)";
    this.parentNode.nextElementSibling.addEventListener("mouseleave",handleMouseOut);
    }
    else
    this.parentNode.parentNode.style.transform = "rotateY(0deg)";

    
}

function handleMouseOut(e){
    this.parentNode.style.transform = "rotateY(0deg)";
    this.removeEventListener("mouseleave",handleMouseOut);
}

