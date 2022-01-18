const navbar = document.querySelector(".navbar__nav");
const navClose = document.querySelector(".navbar__close");
const navOpen = document.querySelector(".navbar__open");

const cart = document.querySelector(".cart__items");
addToCart();

const cartTotal = document.querySelector(".total__price");
const cartCountAdd = document.querySelectorAll(".counter__plus");
const cartCountSubstract = document.querySelectorAll(".counter__minus");
const cartDelete = document.querySelectorAll(".item__delete");


//Event Listeners
navOpen.addEventListener("click", show);
navClose.addEventListener("click", close);
cartCountAdd.forEach(element => {
    element.addEventListener("click", countAdd);
});
cartCountSubstract.forEach(element => {
    element.addEventListener("click", countSubs);
});
cartDelete.forEach(element => {
    element.addEventListener("click", remove);
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

function remove(event) {
    const deleteBtn = event.target;
    const itemDetails = deleteBtn.parentElement;
    const currentItem = itemDetails.parentElement;
    currentItem.remove();

    const itemName = itemDetails.querySelector(".name__name").innerHTML;
    const itemBrand = itemDetails.querySelector(".name__brand").innerHTML;
    const itemPrice = itemDetails.querySelector(".item__price").innerHTML;

    let localData = localStorage.getItem("itemsList")
    if (localData != "") {
        localData = localData.split(",");
        for (let i = 0; i < localData.length; i+=3) {
            if (localData[i] == itemBrand && localData[i+1] == itemName && localData[i+2] == itemPrice) {
                localData.splice(i,3);
            }
        }
    }
    
    console.log(localData);
    localStorage.setItem("itemsList", localData);
    calculateTotal();
}

function calculateTotal() {
    const cartItems = document.querySelectorAll(".cart__item");
    let result = 0;
    cartItems.forEach(element => {
        let price = parseFloat(element.querySelector(".item__price").innerHTML.split("£")[1]);
        result+=price;
    });
    if (result < 100 && result > 0) cartTotal.innerHTML = "£" + result.toPrecision(4);
    else if (result >= 100) cartTotal.innerHTML = "£" + result.toPrecision(5);
    else cartTotal.innerHTML = "£" + result.toPrecision(1);
}

function addToCart() {
    let itemData = localStorage.getItem("itemsList");
    if (itemData != "") {
        let splittedItemData = itemData.split(",");
        for (let index = 0; index < splittedItemData.length; index+=3) {
            let itemBrand = splittedItemData[index];
            let itemName = splittedItemData[index+1];
            let itemPrice = splittedItemData[index+2];
    
            const newItem = document.createElement("div");
            newItem.classList.add("cart__item");
    
            const itemDetails = document.createElement("div");
            itemDetails.classList.add("item__details");
    
            const nameDiv = document.createElement("div");
            nameDiv.classList.add("item__name");
    
            const nameBrand = document.createElement("div");
            nameBrand.classList.add("name__brand");
            nameBrand.innerHTML = itemBrand;
            nameDiv.appendChild(nameBrand);
    
            const nameName = document.createElement("div");
            nameName.classList.add("name__name");
            nameName.innerHTML = itemName;
            nameDiv.appendChild(nameName);
    
            const itemCounter = document.createElement("div");
            itemCounter.classList.add("item__counter");
    
            const counterMinus = document.createElement("button");
            counterMinus.classList.add("counter__minus");
            counterMinus.innerHTML = "-";
            itemCounter.appendChild(counterMinus);
    
            const counterNum = document.createElement("div");
            counterNum.classList.add("counter__num");
            counterNum.innerHTML = "1";
            itemCounter.appendChild(counterNum);
    
            const counterAdd = document.createElement("button");
            counterAdd.classList.add("counter__plus");
            counterAdd.innerHTML = "+";
            itemCounter.appendChild(counterAdd);
    
            const price = document.createElement("div");
            price.classList.add("item__price");
            let dataPrice = itemPrice.split("£")[1];
            price.setAttribute("data-price", dataPrice);
            price.innerHTML = itemPrice;
    
            const itemDelete = document.createElement("button");
            itemDelete.classList.add("item__delete");
            itemDelete.innerHTML = "+";
    
            itemDetails.appendChild(nameDiv);
            itemDetails.appendChild(itemCounter);
            itemDetails.appendChild(price);
            itemDetails.appendChild(itemDelete);
            newItem.appendChild(itemDetails);
            cart.appendChild(newItem);
        }
    }
}




