import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/authentication/auth';
export default configureStore({
  reducer: {
    counter: counterReducer,
    authState: authReducer,
  },
});
