const API_URL = `https://fakestoreapi.com`;
const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  } catch (error) {
    return error;
  }
};

const addProduct = async (product) => {
  const res = await axios.post(`${API_URL}/products`, product);
  return res.data;
};

const getProduct = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

const updateProduct = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/products/${id}`, updatedData);
  return res.data;
};

const getCategories = async () => {
  const res = await axios.get(`${API_URL}/products/categories`);
  return res.data;
};

const login = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);
    return res.data.token;
  } catch (error) {
    return error;
  }
};

export {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  getCategories,
  login,
};
