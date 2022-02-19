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

//Functions
jQuery(document).ready(() => {
  handleNavbar();
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

function findItem() {
  //Filtering product name
  let inputValue = searchInput.value;
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
    inputValue = inputValue.toLowerCase();
    searchItems.forEach(element => {
      if (element.innerHTML.search(inputValue) === -1)
        element.classList.add("hideItem");
      else element.classList.remove("hideItem");
    });
  } else {
    searchItems.forEach(element => {
      element.classList.remove("hideItem");
    });
  }
}
