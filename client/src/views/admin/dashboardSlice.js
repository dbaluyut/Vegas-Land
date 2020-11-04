import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboard: [],
  },

  reducers: {
    display: (state, action) => {
      state.dashboard = action.payload;
    },
  },
});

const { display } = dashboardSlice.actions;

export const getVenue = () => (dispatch) => {
  axios.get("api/venues").then((r) => dispatch(display(r.data)));
};

export const addVenue = (title, desc, location_id, link) => (dispatch) => {
  axios
    .post("api/venues", {
      title: title,
      desc: desc,
      location_id: location_id,
    //   type: type,
      link: link,
    })
    .then((r) => {
        console.log(title)
      dispatch(getVenue());
    });
};

export const selectDashboard = (state) => state.form.dashboard;
// export const selectNewRecommendations = (state) => state.form.recommendations;

export default dashboardSlice.reducer;
