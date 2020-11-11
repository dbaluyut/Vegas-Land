import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./Dashboard.module.css"
import { useForm } from "../../hooks/form"
import {
  addVenue,
  addLocation,
  getVenue,
  selectUpdate,
  getLocations,
  selectLocation,
} from "./addVenueSlice.js"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../features/authentication/auth"

export default function AddVenue() {
  const dispatch = useDispatch()
  const venues = useSelector(selectUpdate)
  const locations = useSelector(selectLocation)
  const history = useHistory()
  const { logout } = useAuth()

  console.log(locations)
  useEffect(() => {
    dispatch(getVenue())
  }, [])

  useEffect(() => {
    dispatch(getLocations())
  }, [])

  const [venueForm, setVenueForm, resetForm, updateForm] = useForm({
    title: "",
    desc: "",
    type: "",
    link: "",
    location_id: venues.length + 1,
    street_1: "",
    street_2: "",
    city: "",
    state: "",
    zip: "",
    lat: "",
    lng: "",
  })

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addLocation(venueForm))
    dispatch(getLocations())
    console.log(locations)

    dispatch(addVenue(venueForm))
  }

  function handleClick() {
    logout().then((resp) => {
      console.log("test")
      history.push("/logout")
    })
  }
  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashSideBar}>
        <div className={styles.dashLogo}>
          <img src={"./assets/logo-062.svg"}></img>
        </div>
        <Link to="dashboard">
          <span>Venues</span>
        </Link>
        <Link to="/update">
          <span>Update</span>
        </Link>
        <Link to="RecommendationsTable">
          <span>Recommendations</span>
        </Link>
        <Link to="addVenue">
          <span>Add Venue Form</span>
        </Link>
        <Link to="logout" onClick={handleClick}>
          Log Out
        </Link>
      </div>
      <div className={styles.dashAddForm}>
        <h3>Add Venue Form</h3>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.dashFormItem}>
            <label>Title:</label>
            <br />
            <input
              type="text"
              name="title"
              // value={venueForm.title}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Description:</label>
            <br />
            <textarea
              name="desc"
              // value={venueForm.desc}
              onChange={setVenueForm}
            ></textarea>
          </div>
          <div className={styles.dashFormItem}>
            <label>Type:</label>
            <br />
            <select name="type" onChange={setVenueForm}>
              <option value="" selected>
                Select Type
              </option>
              <option value="bar">Bar</option>
              <option value="restaurant">Restaurant</option>
              <option value="experience">Experience</option>
            </select>
          </div>
          <div className={styles.dashFormItem}>
            <label>Link:</label>
            <br />
            <input
              type="text"
              name="link"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Street 1:</label>
            <br />
            <input
              type="text"
              name="street_1"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Street 2:</label>
            <br />
            <input
              type="text"
              name="street_2"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>City:</label>
            <br />
            <input
              type="text"
              name="city"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>State:</label>
            <br />
            <input
              type="text"
              name="state"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Zip:</label>
            <br />
            <input
              type="text"
              name="zip"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Longitude:</label>
            <br />
            <input
              type="text"
              name="lng"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Latitude:</label>
            <br />
            <input
              type="text"
              name="lat"
              // value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Location ID:</label>
            <br />
            <input type="text" name="location_id" value={venues.length + 1} />
          </div>
          <button type="submit" className={styles.formBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
