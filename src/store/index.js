import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';

export const store = configureStore({
  reducer: {
    emails: emailReducer,
  },
});
