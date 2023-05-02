import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/brand`;

const createBrand = async (data) => {
  const response = await axios.post(`${URL}/create-brand`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const userBrands = async (userId) => {
  const response = await axios.get(`${URL}/user-brands/${userId}`);
  return response.data;
};

const singleBrand = async (slug) => {
  const response = await axios.get(`${URL}/brand/${slug}`);
  return response.data;
};


const deleteBrand = async (brandId) => {
  const response = await axios.delete(`${URL}/delete-brand/${brandId}`);
  return response.data;
};

const changeFeaturedBrand = async (brandId) => {
  const response = await axios.put(`${URL}/change-brand-featured/${brandId}`);
  return response.data;
};

const brandServices = {
  createBrand,
  userBrands,
  singleBrand,
  deleteBrand,
  changeFeaturedBrand
};

export default brandServices;


 