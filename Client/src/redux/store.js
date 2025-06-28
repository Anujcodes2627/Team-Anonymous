import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store; // ✅ default export