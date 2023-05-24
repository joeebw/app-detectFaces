import {combineReducers} from '@reduxjs/toolkit';
import { faceDetectorReducer } from './face-detector/faceDetector.reducer';
import { routesReducer } from './routes/routes.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
  faceDetector: faceDetectorReducer,
  routes: routesReducer,
  user: userReducer
});