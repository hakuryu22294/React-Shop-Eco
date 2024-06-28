import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceAxios from "../../../utils/instanceAxios";

const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const createCategoryAction = createAsyncThunk(
  "categories/createCategory",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const { name, file } = payload;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      console.log(formData);
      const { data } = await instanceAxios.post(
        "/categories",
        formData,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const getCategoryAction = createAsyncThunk(
  "categories/getCategory",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await instanceAxios.get("/categories");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAction.pending, (state) => {
        state.loading = true;
        state.isAdded = false;
        state.isUpdated = false;
        state.isDelete = false;
      })
      .addCase(createCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.category = action.payload;
      })
      .addCase(createCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.isAdded = false;
        state.category = null;
        state.error = action.payload;
      })
      .addCase(getCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.categories = [];
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = categorySlice.actions;
export default categorySlice.reducer;
