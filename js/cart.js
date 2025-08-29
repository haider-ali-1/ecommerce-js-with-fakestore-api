import { getProducts } from "./api.js";
import { qs, storage } from "./utils.js";
import { renderCartItems, saveCart, cart, clearCart } from "./cart-logic.js";

const overlay = qs(".overlay");
const mainCartEl = qs("main .cart");
const cartItemsCo = qs(".cart-items");
const subTotalEl = qs(".cart .subtotal");
const cartCountEl = qs("header .cart span");

let products = [];

async function init() {
  products = await getProducts();
  renderCartItems(cartItemsCo, cartCountEl, subTotalEl);
  attachEvents();
}

function attachEvents() {
  mainCartEl.addEventListener("click", (e) => {
    const inc = e.target.closest(".inc");
    if (inc) {
      const id = +inc.dataset.id;
      handleQty(id, "inc");
      return;
    }

    const dec = e.target.closest(".dec");
    if (dec) {
      const id = +dec.dataset.id;
      handleQty(id, "dec");
      return;
    }

    const remove = e.target.closest(".remove");
    if (remove) {
      const id = +remove.dataset.id;
      handleQty(id, "del");
      return;
    }

    if (e.target.id === "checkout") {
      location.href = "checkout.html";
    }

    if (e.target.id === "clear") {
      console.log("clicked");
      clearCart();
      saveCart();
      renderCartItems(cartItemsCo, cartCountEl, subTotalEl);
      return;
    }

    if (e.target.closest(".close-cart")) {
      toggleCart();
    }
  });
}

function toggleCart() {
  overlay.classList.toggle("active");
  mainCartEl.classList.toggle("active");
}

function handleQty(id, action) {
  const foundItemIndex = cart.findIndex((item) => item.id === id);

  if (action === "inc") {
    cart[foundItemIndex].quantity++;
  } else if (action === "dec") {
    const quantity = cart[foundItemIndex].quantity;
    quantity === 1
      ? cart.splice(foundItemIndex, 1)
      : cart[foundItemIndex].quantity--;
  } else if (action === "del") {
    cart.splice(foundItemIndex, 1);
  }

  saveCart();
  renderCartItems(cartItemsCo, cartCountEl, subTotalEl);
}

init();
