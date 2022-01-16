const navbar = document.querySelector(".navbar__nav");
const navClose = document.querySelector(".navbar__close");
const navOpen = document.querySelector(".navbar__open");

const cartTotal = document.querySelector(".total__price");
const cartItems = document.querySelectorAll(".cart__item");
const cartCountAdd = document.querySelectorAll(".counter__plus");
const cartCountSubstract = document.querySelectorAll(".counter__minus");


//Event Listeners
navOpen.addEventListener("click", show);
navClose.addEventListener("click", close);
cartCountAdd.forEach(element => {
    element.addEventListener("click", countAdd);
});
cartCountSubstract.forEach(element => {
    element.addEventListener("click", countSubs);
});


//Functions
calculateTotal(); //Calculate total current price

function show() {
    navbar.style.display = "flex";
}

function close() {
    navbar.style.display = "none";
}

function countAdd(event) {
    const currentNumElement = event.target.parentElement.querySelector(".counter__num");
    const currentPriceElement = event.target.parentElement.parentElement.querySelector(".item__price");
    let constItemPrice = currentPriceElement.dataset.price; 
    let currentNumDigit = parseInt(currentNumElement.innerHTML);
    if (currentNumDigit != 10) {
        currentNumDigit+=1;
        currentNumElement.innerHTML = currentNumDigit;
        let newPrice = currentNumDigit * constItemPrice;
        if (newPrice < 100) {
            currentPriceElement.innerHTML = "£" + newPrice.toPrecision(4);
        } else currentPriceElement.innerHTML = "£" + newPrice.toPrecision(5);
        
    } else alert("You reached maximum count of this product!");
    calculateTotal();
}

function countSubs(event) {
    const currentNumElement = event.target.parentElement.querySelector(".counter__num");
    const currentPriceElement = event.target.parentElement.parentElement.querySelector(".item__price");
    let constItemPrice = currentPriceElement.dataset.price; 
    let currentItemPrice = parseFloat(currentPriceElement.innerHTML.split("£")[1]);
    let currentNumDigit = parseInt(currentNumElement.innerHTML);
    if (currentNumDigit != 1) {
        currentNumDigit-=1;
        let newPrice = currentNumDigit * constItemPrice;
        currentNumElement.innerHTML = currentNumDigit;
        if (newPrice < 100) {
            currentPriceElement.innerHTML = "£" + newPrice.toPrecision(4);
        } else currentPriceElement.innerHTML = "£" + newPrice.toPrecision(5);
    } else alert("You reached minimun count of this product!");
    calculateTotal();
}

function calculateTotal() {
    let result = 0;
    cartItems.forEach(element => {
        let price = parseFloat(element.querySelector(".item__price").innerHTML.split("£")[1]);
        result+=price;
    });
    if (result < 100) {
        cartTotal.innerHTML = "£" + result.toPrecision(4);
    } else cartTotal.innerHTML = "£" + result.toPrecision(5);
}




