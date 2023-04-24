import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../api/api";
import { getItem } from "../../utils/storage.utils";

const token = getItem("token");

// export const getGamePlayed = (token) => async (dispatch, getState) => {
//   const loading = getState().gamesPlayed.loading;
//   if (loading) return;
//   dispatch(startLoading());
//   const { status, result, error } = await getRequest(`/gamesplayed`, token);
//   if (error) {
//     return console.log(status, error);
//   }
//   dispatch(setGamePlayed(result));
// };

export const getGamePlayed = createAsyncThunk(
  "gamePlayed/getGamesPlayed",
  async (_, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await getRequest(`/gamesplayed/`, token);

    return error
      ? rejectWithValue(
          `Cannot get GamesPlayed - Error status ${status} - ${error}`,
        )
      : fulfillWithValue(result);
  },
);

export const getOneGamePlayed = createAsyncThunk(
  "gamePlayed/getOne",
  async (gameplayedId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await getRequest(
      `/gamesplayed/${gameplayedId}`,
      token,
    );
    return error
      ? rejectWithValue(`Cannot get friend - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

export const createGamePlayed = createAsyncThunk(
  "gamesPlayed/create",
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

const gamePlayedSlice = createSlice({
  name: "gamesPlayed",
  initialState: {
    gamesPlayed: [],
    loading: false,
    stat: [],
  },
  reducers: {
    startLoading: (state) => {
      return { ...state, loading: true };
    },
    stopLoading: (state) => {
      return { ...state, loading: false };
    },
    // setGamePlayed: (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     gamesPlayed: [...action.payload.gamesPlayed],
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneGamePlayed.fulfilled, (state, action) => {
        console.log(action.payload.gamePlayed);
        return {
          ...state,
          loading: false,
          gamesPlayed: [...action.payload.gamePlayed.Stats],
        };
      })
      .addCase(getOneGamePlayed.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getOneGamePlayed.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getGamePlayed.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          gamesPlayed: [...action.payload.gamesPlayed],
        };
      })
      .addCase(getGamePlayed.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getGamePlayed.pending, (state, action) => {
        return { ...state, loading: true };
      });
  },
});

export const { startLoading, stopLoading, setGamePlayed } =
  gamePlayedSlice.actions;

export default gamePlayedSlice.reducer;
