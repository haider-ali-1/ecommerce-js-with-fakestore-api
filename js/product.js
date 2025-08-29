import { getProducts } from "./api.js";
import { getStarsFromRate, isUserLoggedIn, qs } from "./utils.js";
import { addToCart, renderCartItems, saveCart } from "./cart-logic.js";

const productContainerEl = qs(".product-container");
const cartItemsCo = qs(".cart-items");
const subTotalEl = qs(".cart .subtotal");
const cartCountEl = qs("header .cart span");

let product;

async function init() {
  const id = +new URLSearchParams(location.search).get("id");
  if (!id) throw new Error("Missing product ID");

  const products = await getProducts();
  product = products.find((p) => p.id === id);
  if (!product) {
    alert("Product not found");
    location.href = "products.html";
    return;
  }

  renderProduct(product);
}

function renderProduct(p) {
  productContainerEl.innerHTML = `<div class="image-wrapper">
                                    <img src=${p.image} alt=${p.titel} />
                                  </div>
                                  <div class="product-details">
                                    <p class="name">${p.title}</p>
                                    <p class="description">Description: ${
                                      p.description
                                    }</p>
                                    <p class="price">Rating: 
                                      <span>
                                        ${getStarsFromRate(p.rating.rate)}
                                      </span>
                                      <span style="margin-left: 4px" >
                                        (${p.rating.rate})
                                      </span>
                                    </p>
                                    <p class="rating">Price: 
                                      <span>$${p.price}</span>
                                    </p>
                                    <p class="category">Category: 
                                      <span>${p.category}</span>
                                    </p>
                                    <button class="add-to-cart">Add to cart</button>
                                </div>`;
}

productContainerEl.addEventListener("click", (e) => {
  console.log(product);
  const cartBtnClick = e.target.closest(".add-to-cart");
  if (!cartBtnClick) return;

  !isUserLoggedIn && (location.href = "login.html");

  addToCart(product);
  saveCart();
  alert("add to cart successfully");
  renderCartItems(cartItemsCo, cartCountEl, subTotalEl);
});

init();
