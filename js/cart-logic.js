import { storage } from "./utils.js";

const isCheckoutPage = location.href.split("/").at(-1) === "checkout.html";

export let cart = storage.get("cart", []);

export const renderCartItems = (container, countEl, subtotalEl) => {
  container.innerHTML = cart
    .map((item) => {
      return `<div class="cart-item">
                <img src=${item.image} alt=${item.title} />
                <div style="flex:1">
                  <div style="font-weight:700">${item.title}</div>
                  <div class="price muted">$${item.price} x ${item.quantity}
                              = $${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                ${
                  isCheckoutPage
                    ? ``
                    : `<div class="qty" style="display:flex;gap:0.75rem">
                        <button data-id=${item.id} class="inc">+</button>
                        <div>${item.quantity}</div>
                        <button data-id=${item.id} class="dec">-</button>
                        <button data-id=${item.id} class="remove">✖</button>
                      </div>`
                }
              </div>`;
    })
    .join("");

  countEl.textContent = cart.length;
  subtotalEl.textContent =
    "$" +
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
};

export const addToCart = (product) => {
  const foundItemIndex = cart.findIndex((item) => item.id === product.id);
  foundItemIndex !== -1
    ? cart[foundItemIndex].quantity++
    : cart.push({ ...product, quantity: 1 });
};

export const saveCart = () => {
  storage.set("cart", cart);
};

export const clearCart = () => {
  cart = [];
};

class CartStore {
  constructor() {
    this.items = storage.get("cart", []);
  }

  add(product) {
    const foundItemIndex = this.items.findIndex(
      (item) => item.id === product.id
    );
    
    foundItemIndex !== -1
      ? this.items[foundItemIndex].quantity++
      : this.items.push({ ...product, quantity: 1 });

    this.save();
  }

  updateQuantity(id, delta) {
    const item = this.items.find((item) => item.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.remove(id);
    }
    this.save();
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.save();
  }

  save() {
    storage.set(this.items);
  }

  clear() {
    storage.set(cart, []);
  }
}

const cartStore = new CartStore();
