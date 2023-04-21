import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../api/api";
import { getItem } from "../../utils/storage.utils";

const token = getItem("token");

export const getFriends = createAsyncThunk("/friends", async (_, thunkApi) => {
  const { fulfillWithValue, rejectWithValue } = thunkApi;
  //   const token = getItem("token");
  const { status, result, error } = await getRequest(`/friends`, token);
  console.log(result);
  return error
    ? rejectWithValue(`Cannot get game - Error status ${status} - ${error}`)
    : fulfillWithValue(result);
});

export const createFriend = createAsyncThunk(
  "/friends/create",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    // const token = getItem("token");
    const { status, result, error } = await postRequest(
      `/friends/create`,
      form,
      token,
    );
    console.log(result);
    return error
      ? rejectWithValue(
          `Cannot create game - Error status ${status} - ${error}`,
        )
      : fulfillWithValue(result);
  },
);

export const getOneFriend = createAsyncThunk(
  "friends/getOne",
  async (friendsId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await getRequest(
      `/friends/${friendsId}`,
      token,
    );
    return error
      ? rejectWithValue(`Cannot get friend - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

const friendSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    name: "",
    email: "",
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      return { ...state, loading: true };
    },
    stopLoading: (state) => {
      return { ...state, loading: false };
    },
    updateFriends: (state, action) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
      // state[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          friends: action.payload.friends,
        };
      })
      .addCase(getFriends.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getFriends.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(createFriend.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(createFriend.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(createFriend.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getOneFriend.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          friends: [...action.payload.friends],
        };
      })
      .addCase(getOneFriend.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getOneFriend.pending, (state, action) => {
        return { ...state, loading: true };
      });
  },
});

export const { startLoading, stopLoading, updateFriends } = friendSlice.actions;

export default friendSlice.reducer;
