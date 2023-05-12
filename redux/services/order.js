import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/order`;

const placeOrder = async (data) => {
  const response = await axios.post(`${URL}/place-order`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getUserOrders = async (userId) => {
  const response = await axios.get(`${URL}/user-orders/${userId}`);
  return response.data;
};

const orderServices = {
  placeOrder,
  getUserOrders,
};

export default orderServices;
