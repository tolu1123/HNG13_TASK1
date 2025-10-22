const header = document.querySelector("header");
const nav = document.querySelector("nav");
const menuButton = document.querySelector("#menu-button");
const closeMenuButton = document.querySelector("#close-nav");

menuButton.addEventListener("click", () => {
  // The reason i made it toggle is due to the fact that some dev users have the audacity to use the inspect tools to undisplay or modify the navigation menu
  const expanded = menuButton.getAttribute("aria-expanded") === "true";

  // Toggle aria attributes
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute(
    'aria-label',
    expanded ? 'Open main menu' : 'Close main menu'
  );
 
  // Show/hide nav
  if (expanded) {
    nav.classList.add("display-none")
  } else {
    nav.classList.remove("display-none")
    header.classList.add("inset-0")
  }
});


closeMenuButton.addEventListener("click", () => {

  menuButton.setAttribute('aria-expanded', "false");
  menuButton.setAttribute(
    'aria-label',
    'Open main menu'
  );

  nav.classList.add("display-none");
  header.classList.remove("inset-0");
});