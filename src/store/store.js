import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const middleware = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

const persistConfig = {
  key: 'root',
  storage
  // blacklist:['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware
})

export const persistor = persistStore(store);