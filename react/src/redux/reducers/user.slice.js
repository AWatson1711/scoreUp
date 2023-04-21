import { getRequest, postRequest } from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../utils/storage.utils";

const token = getItem("token");

export const signUp = (redirect, form) => async (dispatch, getState) => {
  const loading = getState().user.loading;
  if (loading) return;
  dispatch(startLoading());
  const { status, result, error } = await postRequest(`/users/sign-up`, form);
  if (error) {
    const message = `Erreur: ${error}`;
    return message;
  }
  if (status >= 200 && status < 300) {
    setItem("token", result.token);
    redirect();
  }
  dispatch(stopLoading());
};

export const signIn = (redirect, form) => async (dispatch, getState) => {
  const loading = getState().user.loading;
  if (loading) return;
  dispatch(startLoading());
  const { status, result, error } = await postRequest(`/users/sign-in`, form);
  if (error) {
    const message = `Erreur: ${error}`;
    return message;
  }
  if (status >= 200 && status < 300) {
    setItem("token", result.token);
    redirect();
  }
  dispatch(stopLoading());
};

export const getOneUser = createAsyncThunk(
  "users/getOne",
  async (_, userId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await getRequest(
      `/users/${userId}`,
      token,
    );
    return error
      ? rejectWithValue(`Cannot get user - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    firstname: "",
    email: "",
    number: 0,
    password: "",
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      return { ...state, loading: true };
    },
    stopLoading: (state) => {
      return { ...state, loading: false };
    },
    updateUser: (state, action) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
      // state[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneUser.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(getOneUser.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getOneUser.pending, (state, action) => {
        return { ...state, loading: true };
      });
  },
});

export const { startLoading, stopLoading, updateUser } = userSlice.actions;
export default userSlice.reducer;
