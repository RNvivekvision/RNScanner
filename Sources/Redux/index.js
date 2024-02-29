import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './Reducers';

export const Store = configureStore({
  reducer: { UserReducer },
});
