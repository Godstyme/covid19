// ======== js code preloader here ========
let showPage = () =>{
  document.querySelector(".preload").style.display = "none";
  document.querySelector("main").style.display = "block";
}
function dispalDelay() {
  const myVar = setTimeout(showPage, 3000);
}
document.addEventListener('load',showPage())
// ======== js code preloader end here ========
