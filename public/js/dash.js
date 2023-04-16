let subMenu = document.getElementById("subMenu");

function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}

document.querySelector(".logo")?.addEventListener("click", function goHome() {
  window.location.href = "/home";
});


