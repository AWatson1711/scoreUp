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

export const getStats = createAsyncThunk("stats/getStat", async (thunkApi) => {
  const { fulfillWithValue, rejectWithValue } = thunkApi;
  const { status, result, error } = await getRequest(`/stats/`, token);
  return error
    ? rejectWithValue(`Cannot get Stat - Error status ${status} - ${error}`)
    : fulfillWithValue(result);
});

export const getOneStat = createAsyncThunk(
  "stats/getOne",
  async (statId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, result, error } = await getRequest(
      `/stats/${statId}`,
      token,
    );
    return error
      ? rejectWithValue(`Cannot get stat - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

export const createStat = createAsyncThunk(
  "stats/create",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    // const token = getItem("token");
    const { status, result, error } = await postRequest(
      `/games/create`,
      { form },
      token,
    );
    return error
      ? rejectWithValue(`Cannot post game - Error status ${status} - ${error}`)
      : fulfillWithValue(result);
  },
);

const statSlice = createSlice({
  name: "stats",
  initialState: {
    stats: [],
    loading: false,
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
      .addCase(getOneStat.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          stats: [action.payload.stats],
        };
      })
      .addCase(getOneStat.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getOneStat.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getStats.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          stats: [...action.payload.stats],
        };
      })
      .addCase(getStats.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(getStats.pending, (state, action) => {
        return { ...state, loading: true };
      });
  },
});

export const { startLoading, stopLoading } = statSlice.actions;

export default statSlice.reducer;
