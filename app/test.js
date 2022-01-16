//Variables
const navbar = document.querySelector(".navbar__nav");
const navClose = document.querySelector(".navbar__close");
const navOpen = document.querySelector(".navbar__open");
const btnCol = document.querySelectorAll(".btn");

const newItems = document.getElementsByName("new");
const specialItems = document.getElementsByName("special");
const popularItems = document.getElementsByName("popular");

//Event Listeners
navOpen.addEventListener("click", show);
navClose.addEventListener("click", close);
btnCol.forEach(element => {
    element.addEventListener("click", pressed)
});


//Functions
function show() {
    navbar.style.display = "flex";
}

function close() {
    navbar.style.display = "none";
}

function pressed(event){
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