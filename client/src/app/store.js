import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import authReducer from "../features/authentication/auth"
import highlightsReducer from "../features/highlights/highlightsSlice"
import happyHrListReducer from "../features/happyhour/happyHrListSlice"
export default configureStore({
  reducer: {
    counter: counterReducer,
    authState: authReducer,
    highlights: highlightsReducer,
    hhlist: happyHrListReducer,
  },
})
