import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinSlice'; 
export const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

