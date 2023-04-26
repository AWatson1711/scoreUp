import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../api/api";
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

export const modifyFriend = createAsyncThunk(
  "friends/modifyFriend",
  async ({ friendId, name, email }, thunkApi) => {
    console.log(friendId);
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await putRequest(
      `/friends/update/${friendId}`,
      { name, email },
      token,
    );
    return error
      ? rejectWithValue(
          `Cannot get friends - Error status ${status} - ${error}`,
        )
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
        console.log(action.payload.friends);
        return {
          ...state,
          loading: false,
          friends: [...action.payload.friends],
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
          friends: action.payload.friends,
        };
      })
      .addCase(getOneFriend.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getOneFriend.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(modifyFriend.fulfilled, (state, action) => {
        const updatedFriend = action.payload.friend;
        const updatedFriends = Array.isArray(state.friends)
          ? state.friends.map((f) =>
              f.id === updatedFriend.id ? updatedFriend : f,
            )
          : [];
        return {
          ...state,
          loading: false,
          friends: updatedFriends,
        };
      })

      .addCase(modifyFriend.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(modifyFriend.pending, (state, action) => {
        return { ...state, loading: true };
      });
  },
});

export const { startLoading, stopLoading, updateFriends } = friendSlice.actions;

export default friendSlice.reducer;
