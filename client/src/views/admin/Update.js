import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { DashboardTable } from "../../ui/DashboardTable"
import styles from "./Update.module.css"
import { useForm } from "../../hooks/form"

import {
  display,
  getVenue,
  // addVenue,
  updateVenue,
  selectUpdate,
} from "./updateSlice.js"

export default function Update() {
  const dispatch = useDispatch()
  const venues = useSelector(selectUpdate)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [location_id, setLocation_id] = useState("")
  const [type, setType] = useState("")
  const [link, setLink] = useState("")

  const [activeVenue, setActiveVenue] = useState("")

  useEffect(() => {
    dispatch(getVenue())
  }, [])

  function handleUpdateVenue(venue) {
    dispatch(updateVenue(venue))
  }

  const [venueForm, setVenueForm, resetForm, updateForm] = useForm({
    title: "",
    location_id: "",
    desc: "",
    type: "",
    link: "",
    id: null,
  })

  function handleSubmit(e) {
    e.preventDefault()
    console.log(venueForm)
    updateVenue(venueForm)
    // handleUpdateVenue(venueForm)
    // resetForm()
  }
  useEffect(() => {
    if (venues.length) {
      updateForm(venues[0])
    }
  }, [venues])

  function handleVenueChange(index) {
    updateForm(venues[index])
  }

  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashboardSidebar}>
        <h1>update page view</h1>
        <form onSubmit={handleSubmit}>
          <select name="id" onChange={(e) => handleVenueChange(e.target.value)}>
            {venues.map((venue, index) => (
              <option key={"venue-" + venue.id} value={index}>
                {venue.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="title"
            value={venueForm.title}
            onChange={setVenueForm}
          />
          <textarea
            name="desc"
            value={venueForm.desc}
            onChange={setVenueForm}
          ></textarea>
          <select name="type" value={venueForm.type}>
            <option value="bar">Bar</option>
            <option value="restaurant">Restaurant</option>
            <option value="experience">Experience</option>
          </select>
        </form>
      </div>
    </div>
  )
}
