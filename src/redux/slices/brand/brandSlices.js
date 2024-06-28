import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceAxios from "../../../utils/instanceAxios";

const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const createBrandAction = createAsyncThunk(
  "brands/createBrand",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await instanceAxios.post("/brands");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const getBrandsAction = createAsyncThunk(
  "brands/getBrands",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await instanceAxios.get("/brands");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

const brandSlices = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrandAction.pending, (state) => {
        state.loading = true;
        state.isAdded = false;
        state.isUpdated = false;
        state.isDelete = false;
      })
      .addCase(createBrandAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.brand = action.payload;
      })
      .addCase(createBrandAction.rejected, (state, action) => {
        state.loading = false;
        state.isAdded = false;
        state.brand = null;
        state.error = action.payload;
      })
      .addCase(getBrandsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrandsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getBrandsAction.rejected, (state, action) => {
        state.loading = false;
        state.brands = [];
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = brandSlices.actions;
export default brandSlices.reducer;
