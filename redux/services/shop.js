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

const shopServices = {
  createShop,
  getShop
};

export default shopServices;
