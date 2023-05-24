import { createSlice } from "@reduxjs/toolkit";

const FACEDETECTOR_INITIAL_STATE = { 
  imgUrl: '',
  box: []
}

const faceDetectorSlice = createSlice({
  name:'faceDetector',
  initialState: FACEDETECTOR_INITIAL_STATE,
  reducers: {
    setImgUrl(state, action) {
      state.imgUrl = action.payload;
    },
    setBox(state, action) {
      state.box = action.payload;
    }
  }
})

export const {setBox, setImgUrl} = faceDetectorSlice.actions;
export const faceDetectorReducer = faceDetectorSlice.reducer;