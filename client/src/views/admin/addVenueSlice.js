import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const addVenueSlice = createSlice({
  name: "update",
  initialState: {
    venues: [],
    locations: [],
  },

  reducers: {
    display: (state, action) => {
      state.venues = action.payload
    },
    displayLocations: (state, action) => {
      state.locations = action.payload
    },
  },
})

const { display, displayLocations } = addVenueSlice.actions

export const getVenue = () => (dispatch) => {
  axios.get("api/venues").then((r) => dispatch(display(r.data)))
}

export const getLocations = () => (dispatch) => {
  axios.get("api/locations").then((r) => dispatch(displayLocations(r.data)))
}

export const addVenue = (venue) => (dispatch) => {
  // console.log(venue)
  axios
    .post("api/venues", {
      title: venue.title,
      desc: venue.desc,
      type: venue.type,
      link: venue.link,
      location_id: venue.location_id,
    })
    .then((r) => {
      dispatch(getVenue())
    })
}

export const addLocation = (venue) => (dispatch) => {
  // console.log(venue)

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
      dispatch(getLocations())
    })
}

export const selectUpdate = (state) => state.addvenue.venues
export const selectLocation = (state) => state.addvenue.locations

export default addVenueSlice.reducer
