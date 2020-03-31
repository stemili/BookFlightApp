const toggleButton = document.getElementById("toggle");
const nav = document.getElementsByTagName("nav")[0];
const moreBtn = document.getElementById("moreBtn");
const dropdown = document.getElementsByClassName("dropdown")[0];
console.log("mrk")

toggleButton.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggleButton.classList.toggle("active")
});

moreBtn.addEventListener("click", ()=>{
  dropdown.classList.toggle("active")
  console.log(dropdown)
})
