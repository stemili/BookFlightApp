(function (){
    const moreInfoButtons = document.querySelectorAll(".pop-up-button");
    const closeInfoButtons = document.querySelectorAll("#about-close-button");
    const allBoxes = document.querySelectorAll(".about-box");
    [...closeInfoButtons].forEach(button => button.addEventListener("click",moreInfo));
    [...moreInfoButtons].forEach(button => {if(button.id !== "about-close-button")button.addEventListener("click",moreInfo)});
    [...allBoxes].forEach(box => box.addEventListener("animationend",deleteAnimations));

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

function deleteAnimations(){
    this.classList.remove("animated","fadeInLeft","fadeInUp","fadeInRight","about-delay-03","about-delay-06");
}

