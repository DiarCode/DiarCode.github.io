//Search
const searchInput = document.getElementById("searchInput");
const searchResultTitle = document.querySelector(".result__title");
const searchResult = document.querySelector(".result__result");
const searchItems = document
  .querySelector(".search")
  .querySelectorAll(".goods__item");

//Goods
const items = document.querySelectorAll(".goods__item");

//Event Listeners
searchInput.addEventListener("input", findItem);

//Setting Cart indicator
const cartIndicatorElement = document.querySelector(".cart__indicator");
const cartIndicatorNum = document.querySelector(".indicator__num");
setCartIndicator();

//Functions
$(document).ready(() => {
  handleWindowScroll();
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
      : $(".scroll__btn").fadeOut();
  });
}

function scrollUp() {
  const scrollBtn = $(".scroll__icon");

  scrollBtn.click(() => {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });
}

function findItem() {
  //Filtering product name
  const inputValue = searchInput.value;
  if (inputValue != "") {
    searchResultTitle.style.display = "inline";
    searchResult.style.display = "inline";
    searchResult.innerHTML = '"' + inputValue + '"';
  } else {
    searchResultTitle.style.display = "none";
    searchResult.style.display = "none";
  }

  //Filter by product name
  if (inputValue != "") {
    const adjuctedinputValue = inputValue.toLowerCase();
    
    searchItems.forEach(element => {
      if (element.innerHTML.search(adjuctedinputValue) === -1)
        element.classList.add("hideItem");
      else element.classList.remove("hideItem");
    });
  } else {
    searchItems.forEach(element => {
      element.classList.remove("hideItem");
    });
  }
}

function setCartIndicator() {
  const localData = JSON.parse(localStorage.getItem("itemsList"));
  const localDataSize = localData.length;

  cartIndicatorNum.innerHTML = localDataSize;
  localDataSize
    ? cartIndicatorElement.classList.remove("indicator__hide")
    : cartIndicatorElement.classList.add("indicator__hide");
}
