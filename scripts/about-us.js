(function (){
    const moreInfoButtons = document.querySelectorAll(".pop-up-button");
    [...moreInfoButtons].forEach(button => button.addEventListener("click",moreInfo));
    const aboutExitButton = document.querySelector(".about-exit").addEventListener("click",moreInfoClose);
})()

function moreInfo(e){
    //const aboutWindow = document.querySelector(".about-us-window");
    //aboutWindow.style.display = "flex";
    //aboutWindow.style.opacity = "100";
    console.log(this);
}

function moreInfoClose(e){
    const aboutWindow = document.querySelector(".about-us-window");
    aboutWindow.style.display = "none";
    
}