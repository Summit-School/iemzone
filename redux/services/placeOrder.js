import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/order`;

const placeOrder = async (data) => {
  const response = await axios.post(`${URL}//place-order`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const orderServices = {
  placeOrder,
};

export default orderServices;
