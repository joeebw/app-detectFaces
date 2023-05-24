import { createSlice } from "@reduxjs/toolkit";

const ROUTES_INITIAL_STATE = {
  routes: 'signin'
}

const routesSlice = createSlice({
  name: 'routes',
  initialState: ROUTES_INITIAL_STATE,
  reducers: {
    setRoutes(state, action) {
      state.routes = action.payload;
    }
  }
});

export const {setRoutes} = routesSlice.actions;
export const routesReducer = routesSlice.reducer;