import { configureStore } from "@reduxjs/toolkit";
import authentication from "./reducers/authentication";
import shop from "./reducers/shop";
import categories from "./reducers/admin/category";
import brands from "./reducers/admin/brand";
import products from "./reducers/admin/product";
import productReviews from "./reducers/admin/productReview";
import orders from "./reducers/order";
import stripePayment from "./reducers/stripe";
import subscription from "./reducers/emailSubscription";
import shipping from "./reducers/shipping";

export const store = configureStore({
  reducer: {
    authentication,
    subscription,
    shop,
    categories,
    brands,
    products,
    productReviews,
    stripePayment,
    orders,
    shipping,
  },
});
