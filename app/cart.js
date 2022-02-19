//Add to cart
const cart = document.querySelector(".cart__items");
addToCart();

//Cart
const cartTotal = document.querySelector(".total__price");
const cartCountAdd = document.querySelectorAll(".counter__plus");
const cartCountSubstract = document.querySelectorAll(".counter__minus");
const cartDelete = document.querySelectorAll(".item__delete");

//Calculate total price
calculateTotal();

//Promocode
const saleInput = document.querySelector(".promo__input");
const saleBtn = document.querySelector(".promo__submit");

//Event Listeners
cartCountAdd.forEach(element => {
  element.addEventListener("click", countAdd);
});
cartCountSubstract.forEach(element => {
  element.addEventListener("click", countSubs);
});
cartDelete.forEach(element => {
  element.addEventListener("click", removeFromCart);
});
saleBtn.addEventListener("click", usePromocode);

//Functions
jQuery(document).ready(() => {
  handleNavbar();
});

function handleNavbar(){
  const navbar = $(".navbar__nav");
  const navClose = $(".navbar__close");
  const navOpen = $(".navbar__open");

  navOpen.click(() => {
    navbar.css({
      display: "flex"
    });
  });

  navClose.click(() => {
    navbar.css({
      display: "none"
    });
  })
}

function countAdd(event) {
  const currentNumElement =
    event.target.parentElement.querySelector(".counter__num");
  const currentPriceElement =
    event.target.parentElement.parentElement.querySelector(".item__price");
  const currentNameElement =
    event.target.parentElement.parentElement.querySelector(".name__name");
  let constItemPrice = currentPriceElement.dataset.price;
  let currentNumDigit = parseInt(currentNumElement.innerHTML);
  if (currentNumDigit != 10) {
    currentNumDigit += 1;
    currentNumElement.innerHTML = currentNumDigit;
    let newPrice = currentNumDigit * constItemPrice;
    if (newPrice < 100) {
      currentPriceElement.innerHTML = "£" + newPrice.toPrecision(4);
    } else currentPriceElement.innerHTML = "£" + newPrice.toPrecision(5);
  } else alert("You have reached maximum count of this product!");
  calculateTotal();
  changeCountInLocal(currentNameElement.innerHTML, currentNumDigit);
}

function countSubs(event) {
  const currentNumElement =
    event.target.parentElement.querySelector(".counter__num");
  const currentPriceElement =
    event.target.parentElement.parentElement.querySelector(".item__price");
  const currentNameElement =
    event.target.parentElement.parentElement.querySelector(".name__name");
  let constItemPrice = currentPriceElement.dataset.price;
  let currentItemPrice = parseFloat(
    currentPriceElement.innerHTML.split("£")[1]
  );
  let currentNumDigit = parseInt(currentNumElement.innerHTML);
  if (currentNumDigit != 1) {
    currentNumDigit -= 1;
    let newPrice = currentNumDigit * constItemPrice;
    currentNumElement.innerHTML = currentNumDigit;
    if (newPrice < 100) {
      currentPriceElement.innerHTML = "£" + newPrice.toPrecision(4);
    } else currentPriceElement.innerHTML = "£" + newPrice.toPrecision(5);
  } else alert("You have reached minimun count of this product!");
  calculateTotal();
  changeCountInLocal(currentNameElement.innerHTML, currentNumDigit);
}

function removeFromCart(event) {
  const deleteBtn = event.target;
  const itemDetails = deleteBtn.parentElement;
  const currentItem = itemDetails.parentElement;

  currentItem.remove();

  const itemName = itemDetails.querySelector(".name__name").innerHTML;
  const itemBrand = itemDetails.querySelector(".name__brand").innerHTML;
  const itemPrice = itemDetails.querySelector(".item__price").dataset.price;

  let localData = JSON.parse(localStorage.getItem("itemsList"));
  localData = localData.filter(item => item.name !== itemName);

  localStorage.setItem("itemsList", JSON.stringify(localData));
  calculateTotal();
}

function calculateTotal() {
  const cartItems = document.querySelectorAll(".cart__item");
  let result = 0;
  cartItems.forEach(element => {
    let price = parseFloat(
      element.querySelector(".item__price").innerHTML.split("£")[1]
    );
    result += price;
  });
  if (result < 100 && result > 0)
    cartTotal.innerHTML = "£" + result.toPrecision(4);
  else if (result >= 100) cartTotal.innerHTML = "£" + result.toPrecision(5);
  else cartTotal.innerHTML = "£" + result.toPrecision(1);
}

function addToCart() {
  let itemData = JSON.parse(localStorage.getItem("itemsList"));
  itemData.forEach(item => {
    if (item !== null) {
      let itemBrand = item.brand;
      let itemName = item.name;
      let itemPrice = item.price;
      let itemCount = item.count;

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
      counterNum.innerHTML = itemCount;
      itemCounter.appendChild(counterNum);

      const counterAdd = document.createElement("button");
      counterAdd.classList.add("counter__plus");
      counterAdd.innerHTML = "+";
      itemCounter.appendChild(counterAdd);

      const price = document.createElement("div");
      price.classList.add("item__price");
      let dataPrice = itemPrice.split("£")[1];
      price.setAttribute("data-price", dataPrice);
      price.innerHTML =
        "£" + (parseFloat(itemPrice.split("£")[1]) * itemCount).toPrecision(5);

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
  });
}

function changeCountInLocal(name, newCount) {
  let localData = JSON.parse(localStorage.getItem("itemsList")) || [];
  if (localData.length !== 0) {
    localData.forEach(element => {
      let elementName = element.name;
      if (elementName === name) element.count = newCount;
    });
  }
  localStorage.setItem("itemsList", JSON.stringify(localData));
}

function usePromocode() {
  const promo = saleInput.value.toLowerCase();
  const REAL_PROMO = "sale";
  const totalPriceElement = document.querySelector(".total__price");
  const totalPriceNumber = totalPriceElement.innerHTML.split("£")[1];

  if (promo == "" && totalPriceNumber == "0") return;
  if (promo === REAL_PROMO) {
    const newPrice = totalPriceNumber - totalPriceNumber * 0.5;
    totalPriceElement.innerHTML = "£" + newPrice;
  }
  promo === REAL_PROMO
    ? alert("Success! Your sale is 50%")
    : alert("Wrong promocode!");
}
