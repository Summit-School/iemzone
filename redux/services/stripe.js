import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/stripe`;

const stripePayment = async (data) => {
  const response = await axios.post(`${URL}/create-checkout-session`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const stripeServices = {
  stripePayment,
};

export default stripeServices;
