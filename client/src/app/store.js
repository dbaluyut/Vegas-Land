import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import authReducer from "../features/authentication/auth"
import highlightsReducer from "../features/highlights/highlightsSlice"
import experiencesReducer from "../views/experiencesSlice"
import restaurantsReducer from "../views/restaurantsSlice"
export default configureStore({
  reducer: {
    counter: counterReducer,
    authState: authReducer,
    highlights: highlightsReducer,
    experiences: experiencesReducer,
    restaurants: restaurantsReducer,
  },
})
