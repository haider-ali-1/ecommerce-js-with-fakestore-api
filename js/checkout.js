import { isUserLoggedIn, qs, storage } from "./utils.js";
import { renderCartItems, cart } from "./cart-logic.js";

const checkoutForm = qs("form");
const cartItemsCo = qs(".cart-items");
const subTotalEl = qs(".cart .subtotal");
const cartCountEl = qs("header .cart span");

let orders = storage.get("orders", []);

function init() {
  !isUserLoggedIn && (location.href = "login.html");
  renderCartItems(cartItemsCo, cartCountEl, subTotalEl);
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const order = {
    orderId: String(orders.length + 1).padStart(3, "0"),
    products: cart,
    subTotal: cart.reduce((s, i) => s + i.price * i.quantity, 0),
    placedAt: new Date().toISOString(),
  };
  orders.push(order);
  storage.set("orders", orders);
  storage.set("cart", []);
  location.href = "profile.html";
});

init();
