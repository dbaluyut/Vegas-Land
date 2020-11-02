import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: [],
  },
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload
    },
  },
})

export const { setRestaurants } = restaurantsSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getRestaurants = () => (dispatch) => {
  axios
    .get("/api/venues/restaurants")
    .then((r) => dispatch(setRestaurants(r.data)))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectRestaurants = (state) => state.restaurants.restaurants

export default restaurantsSlice.reducer
