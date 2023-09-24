import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  errorMessage: null,
};

export const getUsers = createAsyncThunk('users/getUsers', async (regdata, { rejectWithValue }) => {
  try {
    const dataUrl = `${process.env.REACT_APP_URL}/register`;
    const response = await axios.post(dataUrl, regdata);
    return response.data;
  } catch (error) {
    // Use rejectWithValue to pass the error message to the rejected action
    return rejectWithValue(error.response.data.message || 'Oops! Something goes wrong!');
  }
});

const userListSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.errorMessage = null; // Reset error message on pending
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = null// Store the error message
      });
  },
});

export default userListSlice.reducer;
