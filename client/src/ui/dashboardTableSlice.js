import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const dashboardTableSlice = createSlice({
  name: "dashboardTable",
  initialState: {
    dashboardTable: [],
  },
  reducers: {
    setDashboardTable: (state, action) => {
      state.dashboardTable = action.payload
    },
  },
})

export const { setDashboardTable } = dashboardTableSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getDashboardTable = () => (dispatch) => {
  axios
    .get("/api/venues")
    .then((r) => dispatch(setDashboardTable(r.data)))
}

export const removeTableItem = (id) => (dispatch) => {
  console.log(id)
  axios.delete("/api/venues/" + id).then((r) => {
    dispatch(getDashboardTable())
    
  }).catch((error) => {
    console.log('error')
  })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDashboardTable = (state) => state.dashboardTable.dashboardTable

export default dashboardTableSlice.reducer
