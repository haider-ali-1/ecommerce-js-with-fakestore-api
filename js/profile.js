import { createEl, qs, storage, isUserLoggedIn } from "./utils.js";

const profileEl = qs(".profile-section .profile");
const nameEl = qs(".profile .name");
const emailEl = qs(".profile .email");
const logoutBtn = qs(".profile .logout");

const tableProductsEl = qs(".orders .products");

let orders = storage.get("orders");

function init() {
  if (isUserLoggedIn) {
    renderProfile();
    renderOrders();
  } else {
    location.href = "login.html";
  }

  logoutBtn.addEventListener("click", () => {
    storage.remove("token");
    storage.remove("currentUser");
    storage.remove("orders");
    storage.remove("cart");
    location.href = "login.html";
  });
}

function renderProfile() {
  profileEl.style.display = "block";
  const user = storage.get("currentUser", {});
  nameEl.textContent = user.name;
  emailEl.textContent = user.email;
}

function summaryProducts(products) {
  return products
    .map(
      (p) =>
        `<div>${p.title} <span style="font-weight: bold"> 
            [ $${p.price} x ${p.quantity} = $${p.price * p.quantity} ] 
          </span> 
        </div>`
    )
    .join("");
}

function renderOrders() {
  if (!orders || orders.length === 0) {
    tableProductsEl.innerHTML = `<tr><td colspan="4" >No orders to show</td></tr>`;
    return;
  }

  tableProductsEl.innerHTML = orders
    .map((o) => {
      return `<tr>
                <td>${o.orderId}</td>
                <td>${summaryProducts(o.products)}</td>
                <td>$${o.subTotal}</td>
                <td>${new Date(o.placedAt).toLocaleString()}</td>
              </tr>`;
    })
    .join("");

  orders.forEach((o) => {
    const td = createEl("td");
    td.textContent = o.orderId;
  });
}

init();
