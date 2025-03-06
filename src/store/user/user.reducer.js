import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../../utils/firebase/firebase.utils";

const USER_INTIAL_STATE = {
  user: null,
};

const increaseRankingHandler = (user) => {
  const increasedRanking = { ranking: user.ranking + 1 };
  updateUser(user, increasedRanking);
  return { ...user, ...increasedRanking };
};

const userSlice = createSlice({
  name: "user",
  initialState: USER_INTIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    increaseRanking(state) {
      state.user = increaseRankingHandler(state.user);
    },
    resetUser(state) {
      return USER_INTIAL_STATE;
    },
  },
});

export const { setUser, increaseRanking, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
