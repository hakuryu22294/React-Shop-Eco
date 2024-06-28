import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceAxios from "../../../utils/instanceAxios";
//initialState
const initialState = {
  loading: false,
  error: null,
  success: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    success: null,
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

export const registerAction = createAsyncThunk(
  "users/register",
  async (
    { name, email, password, passwordConfirm },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await instanceAxios.post("/auth/register", {
        name,
        email,
        password,
        passwordConfirm,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data.msg);
    }
  }
);

export const loginAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await instanceAxios.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.accessToken,
          user: data.user,
        })
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error?.response?.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.userAuth.success = null;
      state.userAuth.error = null;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.userAuth.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userAuth.loading = false;
        state.userAuth.success = action.payload?.message;
        state.userAuth.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.userAuth.loading = false;
        state.userAuth.error = action.payload;
      })
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = action.payload?.message;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const userReducer = userSlice.reducer;

export const { clearMessage } = userSlice.actions;

export default userReducer;
