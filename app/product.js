//Navbar
const navbar = document.querySelector(".navbar__nav");
const navClose = document.querySelector(".navbar__close");
const navOpen = document.querySelector(".navbar__open");

//Add to cart
const toCartBtn = document.querySelector(".add__tocart");

//Check if item is already in cart
isExist();


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
  const newItemData = {
    brand: itemBrand,
    name: itemName,
    price: itemPrice,
    count: 1,
  };

  const itemsData = JSON.parse(localStorage.getItem("itemsList")) || [];

  let isExists = false;
  itemsData.forEach(item => {
    if (item.name === itemName) {
      isExists = true;
    }
  });

  isExists
    ? alert("This item is already in the cart")
    : localStorage.setItem(
        "itemsList",
        JSON.stringify([...itemsData, newItemData]));

  toCartBtn.classList.add("add__tocartPressed");
  toCartBtn.disabled = true;
  toCartBtn.innerHTML = "Added";
}

function isExist() {
  const itemName = document.querySelector(".detail__title").innerHTML;
  const itemsData = JSON.parse(localStorage.getItem("itemsList")) || [];

  let isExists = false;
  itemsData.forEach(item => {
    if (item.name === itemName) {
      isExists = true;
    }
  });

  if(isExists){
    toCartBtn.classList.add("add__tocartPressed");
    toCartBtn.disabled = true;
    toCartBtn.innerHTML = "Added";
  }

}
