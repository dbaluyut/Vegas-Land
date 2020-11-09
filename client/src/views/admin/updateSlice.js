import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboard: [],
  },

  reducers: {
    display: (state, action) => {
      state.dashboard = action.payload
    },
  },
})

const { display } = dashboardSlice.actions

export const getVenue = () => (dispatch) => {
  axios.get("api/venues").then((r) => dispatch(display(r.data)))
}

// export const addVenue = (venue) => (dispatch) => {
//   console.log(venue)
//   axios
//     .post("api/venues", {
//       title: venue.title,
//       desc: venue.desc,
//       location_id: venue.location_id,
//       type: venue.type,
//       link: venue.link,
//     })
//     .then((r) => {
//       dispatch(getVenue())
//     })
// }

export const selectDashboard = (state) => state.form.dashboard
// export const selectNewRecommendations = (state) => state.form.recommendations;

export default dashboardSlice.reducer
