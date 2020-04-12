(function (){
    const moreInfoButtons = document.querySelectorAll(".pop-up-button");
    [...moreInfoButtons].forEach(button => button.addEventListener("click",moreInfoPop));
    const aboutExitButton = document.querySelector(".about-exit").addEventListener("click",moreInfoClose);
})()

function moreInfoPop(e){
    const aboutWindow = document.querySelector(".about-us-window");
    aboutWindow.style.display = "flex";
}

function moreInfoClose(e){
    const aboutWindow = document.querySelector(".about-us-window");
    aboutWindow.style.display = "none";
    
}