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
  const response = await axios.get(`${URL}/shop-products/${shopId}`);
  return response.data;
};

const productServices = {
  createProduct,
  shopProducts
};

export default productServices;