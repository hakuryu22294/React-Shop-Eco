import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceAxios from "../../../utils/instanceAxios";

const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

export const createColorAction = createAsyncThunk(
  "colors/createColor",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await instanceAxios.post("/colors");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

export const getColors = createAsyncThunk(
  "colors/getColors",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await instanceAxios.get("/colors");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg);
    }
  }
);

const colorSlices = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createColorAction.pending, (state) => {
        state.loading = true;
        state.isAdded = false;
        state.isUpdated = false;
        state.isDelete = false;
      })
      .addCase(createColorAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.color = action.payload;
      })
      .addCase(createColorAction.rejected, (state, action) => {
        state.loading = false;
        state.isAdded = false;
        state.color = null;
        state.error = action.payload;
      })
      .addCase(getColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.loading = false;
        state.colors = [];
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = colorSlices.actions;
export default colorSlices.reducer;
