import { qs, isUserLoggedIn } from "./utils.js";

const links = document.querySelectorAll(".nav-items a");
const cartEl = qs("header .cart");
const profileEl = qs("header .profile");
const logoEl = qs("header .logo");

const mainCartEl = qs("main .cart");

const currentPage = location.href.split("/").at(-1);
const overlay = ["checkout.html", "cart.html"].includes(currentPage)
  ? null
  : qs(".overlay");

// toggler
const toggleCart = () => {
  mainCartEl.classList.toggle("active");
  overlay.classList.toggle("active");
};

function init() {
  for (const link of links) {
    const activePageHref = location.pathname.split("/").at(-1);
    const linkHref = link.getAttribute("href").split("/").at(-1);
    const isFirstPage = activePageHref === "";
    if (linkHref === activePageHref || isFirstPage) {
      link.classList.add("active");
      break;
    }
  }

  if (!isUserLoggedIn) {
    cartEl.style.display = "none";
    profileEl.style.display = "none";
    logoEl.style.justifyContent = "center";
  }

  cartEl.addEventListener("click", toggleCart);

  if (overlay) {
    overlay.addEventListener("click", toggleCart);
  }
}

init();
