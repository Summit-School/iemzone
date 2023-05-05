import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/product`;

const createProduct = async (data) => {
  const response = await axios.post(`${URL}/create-product`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const shopProducts = async (shopId) => {
  const products = await axios.get(`${URL}/shop-products/${shopId}`);
  return products.data
};

const singleProduct = async (prodId) => {
  const product = await axios.get(`${URL}/product/${prodId}`);
  return product.data
};

const setPublishedProducts = async (prodId) => {
  const response = await axios.put(`${URL}/change-product-published/${prodId}`);
  return response.data;
};

const updateProduct = async (data) => {
  const response = await axios.put(`${URL}/update-product/${data.prodId}`, data.form, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updateImageArray = async (data) => {
  const response = await axios.put(`${URL}/update-images/${data.prodId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const deleteProduct = async (prodId) => {
  const response = await axios.delete(`${URL}/delete-product/${prodId}`);
  return response.data;
};

const productServices = {
  createProduct,
  shopProducts,
  setPublishedProducts,
  deleteProduct,
  singleProduct,
  updateProduct,
  updateImageArray
};

export default productServices;