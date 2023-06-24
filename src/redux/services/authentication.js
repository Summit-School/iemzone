import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/auth`;

const register = async (data) => {
  const response = await axios.post(`${URL}/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(`${URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data) {
    localStorage.setItem("temzone-user", JSON.stringify(response.data.token));
  }

  return response.data;
};

const fetchUserData = async (userId) => {
  const response = await axios.get(`${URL}/user/${userId}`);
  return response.data;
};

const updateUser = async (data) => {
  const response = await axios.put(
    `${URL}/update-user/${data.userId}`,
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

const addToWishlist = async (data) => {
  const response = await axios.put(
    `${URL}/add-to-wishlist/${data.userId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const removeFromWishlist = async (data) => {
  const response = await axios.put(
    `${URL}/remove-item-from-wishlist/${data.userId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const getWishlist = async (userId) => {
  const response = await axios.get(`${URL}/wishlist/${userId}`);
  return response.data;
};

const authenticationServices = {
  register,
  login,
  fetchUserData,
  updateUser,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};

export default authenticationServices;

// router.put("/add-to-wishlist/:id", authentication.addToWishlist);
// router.put("/remove-item-from-wishlist/:id", authentication.removeFromWishlist);
// router.get("/wishlist/:id", authentication.getWishlist);
