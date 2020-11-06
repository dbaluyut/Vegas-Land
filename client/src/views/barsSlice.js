import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const barsSlice = createSlice({
  name: "bars",
  initialState: {
    bars: [],
  },
  reducers: {
    setBars: (state, action) => {
      state.bars = action.payload
    },
  },
})

export const { setBars } = barsSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getBarImages = () => (dispatch) => {
  axios
    .get("/api/venues/bar-images")
    .then((r) => dispatch(getBars(r.data)))
}

export const getBars = () => (dispatch) => {
  axios
    .get("/api/venues/bars")
    .then((r) => dispatch(setBars(r.data)))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBars = (state) => state.bars.bars

export default barsSlice.reducer
