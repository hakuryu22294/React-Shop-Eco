import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlice";
import productsReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categorySlices";
import brandReducer from "../slices/brand/brandSlices";
import colorReducer from "../slices/colors/colorSlices";
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productsReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});

export default store;
