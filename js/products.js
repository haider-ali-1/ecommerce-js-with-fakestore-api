import { createEl, getStarsFromRate, qs } from "./utils.js";
import { getCategories, getProducts } from "./api.js";
import { renderCartItems, addToCart, saveCart, cart } from "./cart-logic.js";

const loader = qs(".loader-root");
const productsEl = qs(".products");
const categorySelect = qs(".category-select");
const sortSelect = qs(".sort-select");
const searchInput = qs(".search-input");
const foundCountEl = qs(".found-count");
const cartItemsCo = qs(".cart-items");
const subTotalEl = qs(".cart .subtotal");
const cartCountEl = qs("header .cart span");

let products = [];

async function init() {
  products = await getProducts();
  await loadCategories();
  loader.classList.add("hidden");
  renderProducts(products);
}

function renderProducts(products) {
  foundCountEl.textContent = products.length;
  productsEl.innerHTML = products
    .map((p) => {
      return `<div class="product">
                        <a href="product.html?id=${p.id}">
                          <div class="img-wrapper">
                            <img src=${p.image} alt="" srcset="" />
                          </div>
                          <p>${p.title}</p>
                          <div class="rating">
                            <span>${getStarsFromRate(p.rating.rate)}</span>
                            <span>${p.rating.rate}</span>
                            <span>(${p.rating.count})</span>
                          </div>
                          <p class="price">$${p.price}</p>
                        </a>
                        <div class="controls">
                          <button class="btn add-cart" data-id=${p.id}>
                            Add to Cart
                          </button>
                          <button class="btn details" data-id=${p.id}>
                            View
                          </button>
                        </div>
                    </div>`;
    })
    .join("");
}

async function loadCategories() {
  try {
    const categories = await getCategories();
    categories.forEach((c) => {
      const opt = createEl("option");
      opt.value = c;
      opt.textContent = c;
      categorySelect.appendChild(opt);
    });
  } catch (error) {
    console.warn(error);
  }
}

productsEl.addEventListener("click", (e) => {
  const target = e.target;
  const add = target.closest(".add-cart");
  if (add) {
    const id = +add.dataset.id;
    const product = products.find((p) => p.id === id);
    addToCart(product);
    saveCart();
    alert("add to cart successfully");
    renderCartItems(cartItemsCo, cartCountEl, subTotalEl);
  }

  if (target.closest(".details")) {
    const id = +target.dataset.id;
    location.href = `product.html?id=${id}`;
  }

  if (target.closest(".close-cart")) {
    console.log("clicked");
    toggleCart();
  }
});

const applyFilters = (e) => {
  console.log("run");
  let list = [...products];

  const query = searchInput.value?.trim()?.toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  query !== "" &&
    (list = list.filter((p) => p.title.toLowerCase().includes(query)));

  category !== "all" && (list = list.filter((p) => p.category === category));

  sort === "price-asc" && list.sort((a, b) => a.price - b.price);
  sort === "price-desc" && list.sort((a, b) => b.price - a.price);
  sort === "rating-desc" && list.sort((a, b) => b.rating.rate - a.rating.rate);

  renderProducts(list);
};

categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

init();
