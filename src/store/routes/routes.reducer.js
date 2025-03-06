import { createSlice } from "@reduxjs/toolkit";

const ROUTES_INITIAL_STATE = {
  routes: "signin",
};

const routesSlice = createSlice({
  name: "routes",
  initialState: ROUTES_INITIAL_STATE,
  reducers: {
    setRoutes(state, action) {
      state.routes = action.payload;
    },
    resetRoutes(state) {
      return ROUTES_INITIAL_STATE;
    },
  },
});

export const { setRoutes, resetRoutes } = routesSlice.actions;
export const routesReducer = routesSlice.reducer;
