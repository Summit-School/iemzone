import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/subscribe`;

const subscribe = async (data) => {
  console.log(data);
  const response = await axios.post(`${URL}/subscribe`, data, {
    headers: {
      Accept: "application/json",
    },
  });
  return response.data;
};

const emailServices = {
  subscribe,
};

export default emailServices;
