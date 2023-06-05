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

const categories = async () => {
  const response = await axios.get(`${URL}/categories`);
  return response.data;
};

const singleCategory = async (slug) => {
  const response = await axios.get(`${URL}/category/${slug}`);
  return response.data;
};

const updateCategory = async (data) => {
  const response = await axios.put(
    `${URL}/update-category/${data.categoryId}`,
    data.form,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const deleteCategory = async (catId) => {
  const response = await axios.delete(`${URL}/delete-category/${catId}`);
  return response.data;
};

const changeFeaturedCategory = async (catId) => {
  const response = await axios.put(`${URL}/change-category-featured/${catId}`);
  return response.data;
};

const categoryServices = {
  createCategory,
  categories,
  singleCategory,
  updateCategory,
  deleteCategory,
  changeFeaturedCategory,
};

export default categoryServices;
