const toggleButton = document.getElementById("toggle");
const nav = document.getElementsByTagName("nav")[0];

toggleButton.addEventListener("click", () => {
  nav.classList.toggle("active");
});
