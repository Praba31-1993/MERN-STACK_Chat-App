import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  login_users: [],
  errorMessage: null,
};

export const LoginUsers = createAsyncThunk('users/loginUsers', async (logdata, { rejectWithValue }) => {
  try {
    const dataUrl = `${process.env.REACT_APP_URL}/login`;
    const response = await axios.post(dataUrl, logdata);
    return response.data;
  } catch (error) {
    // Use rejectWithValue to pass the error message to the rejected action
    return rejectWithValue(error.response.data.message || 'Oops! Something goes wrong!');
  }
});

const userListSlice = createSlice({
  name: 'loginusers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUsers.pending, (state) => {
        state.loading = true;
        state.errorMessage = null; // Reset error message on pending
      })
      .addCase(LoginUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.login_users = action.payload;
      })
      .addCase(LoginUsers.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = null// Store the error message
      });
  },
});

export default userListSlice.reducer;
