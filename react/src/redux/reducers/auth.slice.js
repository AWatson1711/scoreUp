import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    getToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    },
    clearToken: (state) => {
      return { ...state, token: null, isAuthenticated: false };
    },
  },
});

export const { getToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
