import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/category`;

const createCategory = async (data) => {
  const response = await axios.post(`${URL}/create-category`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const categoryServices = {
  createCategory,
};

export default categoryServices;
