import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/shop`;

const createShop = async (data) => {
  const response = await axios.post(`${URL}/create`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getShop = async (userId) => {
  const response = await axios.get(`${URL}/shop/${userId}`);
  return response.data;
};

const getShopDetails = async (id) => {
  const response = await axios.get(`${URL}/shop-details/${id}`);
  return response.data;
};

const getAllShops = async () => {
  const response = await axios.get(`${URL}/shops`);
  return response.data;
};

const shopServices = {
  createShop,
  getAllShops,
  getShop,
  getShopDetails,
};

export default shopServices;
