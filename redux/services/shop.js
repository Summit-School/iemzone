import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/shop`;

const createShop = async (data) => {
  console.log(data);
  const response = await axios.post(`${URL}/create`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const shopServices = {
  createShop,
};

export default shopServices;
