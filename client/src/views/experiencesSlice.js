import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const experiencesSlice = createSlice({
  name: "experiences",
  initialState: {
    experiences: [],
  },
  reducers: {
    setExperiences: (state, action) => {
      state.experiences = action.payload
    },
  },
})

export const { setExperiences } = experiencesSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getExperiences = () => (dispatch) => {
  axios
    .get("/api/venues/experiences")
    .then((r) => dispatch(setExperiences(r.data)))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectExperiences = (state) => state.experiences.experiences

export default experiencesSlice.reducer
