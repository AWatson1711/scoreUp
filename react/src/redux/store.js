import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user.slice";
import auth from "./reducers/auth.slice";
import gamesPlayed from "./reducers/gamePlayed.slice";
import games from "./reducers/game.slice";
import friends from "./reducers/friends.slice";

export const store = configureStore({
  reducer: {
    user,
    auth,
    gamesPlayed,
    games,
    friends,
  },
});
