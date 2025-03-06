import { createSlice } from "@reduxjs/toolkit";

const FACEDETECTOR_INITIAL_STATE = {
  imgUrl:
    "https://images.unsplash.com/photo-1672719699796-ef70ba746ca8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  box: [],
};

const faceDetectorSlice = createSlice({
  name: "faceDetector",
  initialState: FACEDETECTOR_INITIAL_STATE,
  reducers: {
    setImgUrl(state, action) {
      state.imgUrl = action.payload;
    },
    setBox(state, action) {
      state.box = action.payload;
    },
    resetFaceDetector(state) {
      return FACEDETECTOR_INITIAL_STATE;
    },
  },
});

export const { setBox, setImgUrl, resetFaceDetector } =
  faceDetectorSlice.actions;
export const faceDetectorReducer = faceDetectorSlice.reducer;
