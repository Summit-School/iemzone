import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${process.env.NEXT_PUBLIC_API_VERSION}/review`;

const createReview = async (data) => {
  const response = await axios.post(`${URL}/create-review`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getProductReviews = async (prodId) => {
  const response = await axios.get(`${URL}/product-reviews/${prodId}`);
  return response.data;
};

const productReviewServices = {
  createReview,
  getProductReviews,
};

export default productReviewServices;
