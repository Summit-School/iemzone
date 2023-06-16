import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/shipping`;

const getShippingFee = async (userId) => {
  const response = await axios.get(`${URL}/get-shipping-fee`);
  return response.data;
};

const shippingServices = {
  getShippingFee,
};

export default shippingServices;
