//Sorting
const newItems = document.getElementsByName("new");
const specialItems = document.getElementsByName("special");
const popularItems = document.getElementsByName("popular");
const btnCol = document.querySelectorAll(".btn");

//Setting local Storage
setLocalstorage();

//Switch Home Content

//Event Listeners
btnCol.forEach(element => {
  element.addEventListener("click", pressed);
});

//Functions
$(document).ready(() => {
  handleWindowScroll()
  handleNavbar();
  scrollUp();
});

function handleNavbar() {
  const navbar = $(".navbar__nav");
  const navClose = $(".navbar__close");
  const navOpen = $(".navbar__open");

  navOpen.click(() => {
    navbar.css({
      display: "flex",
    });
  });

  navClose.click(() => {
    navbar.css({
      display: "none",
    });
  });
}

function handleWindowScroll() {
  $("body").scroll(function () {
    $("body").scrollTop() > 100
      ? $(".scroll__btn").fadeIn()
      : $(".scroll__btn").fadeOut()
  });
  
}

function scrollUp() {
  const scrollBtn = $(".scroll__icon");

  scrollBtn.click(() => {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });
}

function show() {
  navbar.style.display = "flex";
}

function close() {
  navbar.style.display = "none";
}

function pressed(event) {
  const pressedBtnID = event.target.id;
  const pressedBtn = document.getElementById(pressedBtnID);

  btnCol.forEach(element => {
    element.classList.remove("pressed");
  });

  switch (pressedBtnID) {
    case "special":
      newItems.forEach(element => {
        element.classList.add("hideItem");
      });
      specialItems.forEach(element => {
        element.classList.remove("hideItem");
      });
      popularItems.forEach(element => {
        element.classList.add("hideItem");
      });
      break;
    case "popular":
      newItems.forEach(element => {
        element.classList.add("hideItem");
      });
      specialItems.forEach(element => {
        element.classList.add("hideItem");
      });
      popularItems.forEach(element => {
        element.classList.remove("hideItem");
      });
      break;
    case "new":
      newItems.forEach(element => {
        element.classList.remove("hideItem");
      });
      specialItems.forEach(element => {
        element.classList.add("hideItem");
      });
      popularItems.forEach(element => {
        element.classList.add("hideItem");
      });
      break;
  }

  pressedBtn.classList.toggle("pressed");
}

function setLocalstorage() {
  localStorage.getItem("itemsList") ||
    localStorage.setItem("itemsList", JSON.stringify([]));
}
