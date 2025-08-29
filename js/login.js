import { login } from "./api.js";
import { qs, storage, isUserLoggedIn } from "./utils.js";

const signInForm = qs(".form");
const formContainerEl = qs("main .form-container");
const loginMsgEl = qs("main .container > p");

function init() {
  if (isUserLoggedIn) {
    loginMsgEl.style.display = "block";
    formContainerEl.style.display = "none";
    return;
  }
}

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["email"].value.trim();
  const password = signInForm["password"].value;

  const users = storage.get("users", []);

  // check is user found
  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    alert("Incorrect email or password");
    return;
  }

  const token = await login({ username: "johnd", password: "m38rmF$" });

  storage.set("currentUser", {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
  });

  // set token
  storage.set("token", token);

  location.href = "products.html";
});

// function checkAuth() {
//   const token = storage.get("token");
//   if (token) return;
//   location.href = "lo";
// }

// function isUserLoggedIn() {
//   checkAuth();

// }

init();
