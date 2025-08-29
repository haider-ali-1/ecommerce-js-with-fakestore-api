import { qs, storage } from "./utils.js";

const signUpForm = qs(".form");

function init() {
  attachEvent();
}

function attachEvent() {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // const formData = new FormData(signUpForm);
    // const user = Object.fromEntries(formData.entries(formData));

    const name = signUpForm["name"].value.trim();
    const email = signUpForm["email"].value.trim();
    const password = signUpForm["password"].value.trim();

    // check email availability
    const users = storage.get("users", []);
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      alert(`email ${email} already exist`);
      return;
    }

    // User Object
    const user = {
      id: users.length + 1,
      name,
      email,
      password,
    };

    users.push(user);
    storage.set("users", users);
    alert("account created successfully!");
    location.href = "login.html";
  });
}

init();
