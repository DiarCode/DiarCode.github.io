//Sorting
const btnCol = document.querySelectorAll(".btn");
const newItems = document.getElementsByName("new");
const specialItems = document.getElementsByName("special");
const popularItems = document.getElementsByName("popular");

//Brand Sorting
const brandSelector = document.querySelector(".brand-selector");
const allItems = document
  .querySelector(".goods")
  .querySelectorAll(".goods__item");

//Setting Cart indicator
const cartIndicatorElement = document.querySelector(".cart__indicator");
const cartIndicatorNum = document.querySelector(".indicator__num");
setCartIndicator();

//Event Listeners
btnCol.forEach(element => {
  element.addEventListener("click", pressed);
});
brandSelector.addEventListener("change", sortByBrand);

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

function scrollUp() {
  const scrollBtn = $(".scroll__icon");

  scrollBtn.click(() => {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });
}

function handleWindowScroll() {
  $("body").scroll(function () {
    $("body").scrollTop() > 100
      ? $(".scroll__btn").fadeIn()
      : $(".scroll__btn").fadeOut()
  });
  
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

function sortByBrand() {
  const selectedBrand = brandSelector.value;

  allItems.forEach(element => {
    const itemBrand = element
      .querySelector(".item__brand")
      .innerHTML.toLowerCase();

    if (itemBrand !== selectedBrand) element.classList.add("hideItem");
    else element.classList.remove("hideItem");
  });
}

function setCartIndicator() {
  const localData = JSON.parse(localStorage.getItem("itemsList"));
  const localDataSize = localData.length;

  cartIndicatorNum.innerHTML = localDataSize;
  localDataSize
    ? cartIndicatorElement.classList.remove("indicator__hide")
    : cartIndicatorElement.classList.add("indicator__hide");
}
