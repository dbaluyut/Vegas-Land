import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import DashSidebar from "./DashSidebar"
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
import { Link, useHistory, useLocation } from "react-router-dom"
import { useAuth } from "../../features/authentication/auth"

export default function AddVenue() {
  const location = useLocation()
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
    location_id: "",
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
    dispatch(addVenue(venueForm))
    dispatch(getVenue())

    dispatch(addLocation(venueForm))
    console.log(locations)
    alert("venue has been added")
    history.push("/dashboard")
  }

  return (
    <div className={styles.dashContainer}>
      <DashSidebar />
      <div className={styles.dashAddForm}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.dashFormItem}>
            <h1 className={styles.adminHeader3}>Add Venue Form</h1>
            <label>Title:</label>
            <br />
            <input
              type="text"
              name="title"
              // value={venueForm.title}
              onChange={setVenueForm}
              // onChange={(e) => setName(e.target.value)}
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
            <select name="state" onChange={setVenueForm}>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
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
            <input
              type="text"
              name="location_id"
              placeholder={venues.length + 1}
              onChange={setVenueForm}
            />
          </div>
          <button type="submit" className={styles.formBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
