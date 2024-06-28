import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceAxios from "../../../utils/instanceAxios";

//initialState
const initialState = {
  prouducts: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create  product  action

export const createProductAction = createAsyncThunk(
  "products/createProduct",
  async (payload, { rejectWithValue, getState, fulfillWithValue }) => {
    //Token - Authenticated
    const token = getState()?.users?.userAuth?.userInfo?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("brand", payload.brand);
    formData.append("category", payload.category);
    formData.append("price", payload.price);
    formData.append("totalQty", payload.totalQty);
    formData.append("price", payload.price);
    payload?.sizes?.map((size) => formData.append("sizes", size));
    payload?.colors?.map((color) => formData.append("colors", color));
    payload?.files?.map((file) => formData.append("files", file));
    try {
      const { name, description, sizes, brand, colors, price } = payload;
      const { data } = await instanceAxios.post(
        "/products/create",
        {
          name,
          description,
          sizes,
          brand,
          colors,
          price,
        },
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await instanceAxios.get("/products");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

//slices

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.isAdded = true;
      })
      .addCase(createProductAction.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.isAdded = false;
        state.error = action.payload;
      });
  },
});

const productsReducer = productSlice.reducer;
export const { clearMessage } = productSlice.actions;
export default productsReducer;
