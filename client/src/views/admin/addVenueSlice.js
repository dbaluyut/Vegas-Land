import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const addVenueSlice = createSlice({
  name: "update",
  initialState: {
    venues: [],
  },

  reducers: {
    display: (state, action) => {
      state.venues = action.payload
    },
  },
})

const { display } = addVenueSlice.actions

export const getVenue = () => (dispatch) => {
  axios.get("api/venues").then((r) => dispatch(display(r.data)))
}

export const addVenue = (venue) => (dispatch) => {
  // console.log(venue)
  axios
    .post("api/venues", {
      title: venue.title,
      desc: venue.desc,
      type: venue.type,
      link: venue.link,
    })
    .then((r) => {
      dispatch(getVenue())
    })

  axios
    .post("api/locations", {
      street_1: venue.street_1,
      street_2: venue.street_2,
      city: venue.city,
      state: venue.state,
      zip: venue.zip,
      lat: venue.lat,
      lng: venue.lng,
    })
    .then((r) => {
      dispatch(getVenue())
    })
}

export const selectUpdate = (state) => state.addvenue.venues

export default addVenueSlice.reducer
