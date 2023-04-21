import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../api/api";
import { getItem } from "../../utils/storage.utils";

const token = getItem("token");

export const createGame = createAsyncThunk(
  "games/create",
  async (name, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    // const token = getItem("token");
    const { status, result, error } = await postRequest(
      `/games/create`,
      { name },
      token,
    );
    return error
      ? rejectWithValue(`Cannot post game - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

export const getGame = createAsyncThunk(
  "games/getGame",
  async (_, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    //   const token = getItem("token");
    const { status, result, error } = await getRequest(`/games`, token);
    return error
      ? rejectWithValue(`Cannot get game - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

export const getOneGame = createAsyncThunk(
  "games/getOne",
  async (gameId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await getRequest(
      `/games/${gameId}`,
      token,
    );
    return error
      ? rejectWithValue(`Cannot get game - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

export const modifyGame = createAsyncThunk(
  "games/modifyGame",
  async (gameId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await putRequest(
      `/games/${gameId}`,
      token,
    );
    return error
      ? rejectWithValue(`Cannot get game - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

const gameSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    name: "",
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
    updateGame: (state, action) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
      // state[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGame.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(createGame.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(createGame.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getGame.fulfilled, (state, action) => {
        return { ...state, loading: false, games: [...action.payload.games] };
      })
      .addCase(getGame.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getGame.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getOneGame.fulfilled, (state, action) => {
        return { ...state, loading: false, games: [...action.payload.games] };
      })
      .addCase(getOneGame.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getOneGame.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(modifyGame.fulfilled, (state, action) => {
        return { ...state, loading: false, games: action.payload };
      })
      .addCase(modifyGame.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(modifyGame.pending, (state, action) => {
        return { ...state, loading: true };
      });
  },
});

export const { startLoading, stopLoading, updateGame } = gameSlice.actions;

export default gameSlice.reducer;
