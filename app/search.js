const navbar = document.querySelector(".navbar__nav");
const navClose = document.querySelector(".navbar__close");
const navOpen = document.querySelector(".navbar__open");

const searchInput = document.getElementById("searchInput");
const searchResultTitle = document.querySelector(".result__title")
const searchBtn = document.querySelector(".header__find");
const searchResult = document.querySelector(".result__result");
const searchItems = document.querySelector(".search").querySelectorAll(".goods__item");

const items = document.querySelectorAll(".goods__item");

navOpen.addEventListener("click", show);
navClose.addEventListener("click", close);
searchBtn.addEventListener("click", findItem);

function show() {
    navbar.style.display = "flex";
}

function close() {
    navbar.style.display = "none";
}

function findItem() {
    //Hide all elements
    searchItems.forEach(element => {
        element.classList.add("hideItem")
    });
    let inputValue = searchInput.value;
    if (inputValue !== "") {
        searchResultTitle.style.display = "inline"
        searchResult.style.display = "inline";
        searchResult.innerHTML = '"' + inputValue + '"';
    } else{
        searchResultTitle.style.display = "none";
        searchResult.style.display = "none";
    }

    //Filter by product name
    if(inputValue != undefined) {
        inputValue = inputValue.toLowerCase().split("");
        searchItems.forEach(element => {
            let itemName = element.getElementsByClassName("item__name")[0].innerHTML;
            itemName = itemName.toLowerCase().split("");
            let count = 0;
            for (let index = 0; index < 3; index++) {
                if (inputValue[index] === itemName[index]) count++;
            }
            if (count == 3) element.classList.remove("hideItem");
        });
    }
}