import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSlice = createSlice({
  name: "update",
  initialState: {
    update: [],
  },

  reducers: {
    display: (state, action) => {
      state.update = action.payload;
    },
  },
});

const { display } = updateSlice.actions;

export const getVenue = () => (dispatch) => {
  axios.get("api/venues").then((r) => dispatch(display(r.data)));
};

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

export const updateVenue = (venue) => (dispatch) => {
  axios
    .patch("/api/venues/:id", {
      title: venue.title,
      desc: venue.desc,
      location_id: venue.location_id,
      type: venue.type,
      link: venue.link,
    })
    .then((r) => dispatch(getVenue()));
};

export const selectUpdate = (state) => state.update.update;
// export const selectNewRecommendations = (state) => state.form.recommendations;

export default updateSlice.reducer;
