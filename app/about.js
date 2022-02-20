//Navbar
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

function handleWindowScroll() {
  $("body").scroll(function () {
    $("body").scrollTop() > 100
      ? $(".scroll__btn").fadeIn()
      : $(".scroll__btn").fadeOut()
  });
  
}

function scrollUp() {
  const scrollBtn = $(".scroll__icon");

  scrollBtn.click(() => {
    $("html, body").animate({ scrollTop: 0 }, 800);
  });
}