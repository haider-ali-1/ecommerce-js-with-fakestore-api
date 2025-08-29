const qs = (selector) => {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`missing element ${selector}`);
  return el;
};

const createEl = (el) => {
  return document.createElement(el);
};

const storage = {
  get(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (_) {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

const getStarsFromRate = (rate) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars + (hasHalfStar ? -1 : 0);

  let stars = "";
  for (let i = 1; i <= fullStars; i++) {
    stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
  }

  if (hasHalfStar) {
    stars += `<i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i>`;
  }

  for (let i = 1; i <= emptyStars; i++) {
    stars += `<i class="far fa-star" style="color: #ccc;"></i>`;
  }

  return stars;
};

const isUserLoggedIn = storage.get("token");

export { qs, createEl, storage, getStarsFromRate, isUserLoggedIn };
