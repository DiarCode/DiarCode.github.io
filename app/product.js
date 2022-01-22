const navbar = document.querySelector(".navbar__nav");
const navClose = document.querySelector(".navbar__close");
const navOpen = document.querySelector(".navbar__open");
const toCartBtn = document.querySelector(".add__tocart");

//Event Listeners
navOpen.addEventListener("click", show);
navClose.addEventListener("click", close);
toCartBtn.addEventListener("click", addToCart);

//Functions
function show() {
    navbar.style.display = "flex";
}
function close() {
    navbar.style.display = "none";
}
function addToCart() {
    const itemBrand = document.querySelector(".detail__brand").innerHTML;
    const itemName = document.querySelector(".detail__title").innerHTML;
    const itemPrice = document.querySelector(".detail__price").innerHTML;
    const newItemData = [itemBrand, itemName, itemPrice];
    let itemsData = localStorage.getItem("itemsList");

    itemsData += itemsData == "" ? newItemData : "," + newItemData;
    localStorage.setItem("itemsList", itemsData);

    toCartBtn.classList.add("add__tocartPressed");
    toCartBtn.disabled = true;
    toCartBtn.innerHTML = "Added"
}
