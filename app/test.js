const navbar = document.querySelector(".navbar__nav");
const navClose = document.querySelector(".navbar__close");
const navOpen = document.querySelector(".navbar__open");

navOpen.addEventListener("click", show);
navClose.addEventListener("click", close);

function show() {
    navbar.style.display = "flex";
}

function close() {
    navbar.style.display = "none";
}

