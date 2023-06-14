import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/mobile-money`;

const campayPayment = async (data) => {
  const response = await axios.post(`${URL}/mobile-money-payment`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const campayServices = {
  campayPayment,
};

export default campayServices;
