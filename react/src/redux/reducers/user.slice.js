import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../utils/storage.utils";

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
    setItem("userId", result.user.id);
    redirect();
  }
  dispatch(stopLoading());
};

export const modifyUser = createAsyncThunk(
  "user/modifyUser",
  async ({ userId, name, firstname, email, number }, thunkApi) => {
    const token = getItem("token");
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await putRequest(
      `/users/update/${userId}`,
      { name, firstname, email, number },
      token,
    );
    return error
      ? rejectWithValue(`Cannot get user - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

export const getOneUser = createAsyncThunk(
  "users/getOne",
  async (userId, thunkApi) => {
    const token = getItem("token");
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

export const deleteUser = createAsyncThunk(
  "users/deleteGame",
  async (userId, thunkApi) => {
    const token = getItem("token");
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await deleteRequest(
      `/users/delete/${userId}`,
      token,
    );
    return error
      ? rejectWithValue(`Cannot get user - Error status ${status} - ${error}`)
      : fulfillWithValue({ result });
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
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
        return { ...state, loading: false, user: action.payload.user };
      })
      .addCase(getOneUser.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getOneUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(modifyUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        const updatedUsers = Array.isArray(state.user)
          ? state.user.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          : [];
        return {
          ...state,
          loading: false,
          user: updatedUsers,
        };
      })

      .addCase(modifyUser.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(modifyUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { id } = action.payload;
        return {
          ...state,
          loading: false,
          user: state.user.filter((user) => user.id !== id),
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(deleteUser.pending, (state, action) => {
        return { ...state, loading: true };
      });
  },
});

export const { startLoading, stopLoading, updateUser } = userSlice.actions;
export default userSlice.reducer;
