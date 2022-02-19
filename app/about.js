//Navbar
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