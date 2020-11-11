import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./Dashboard.module.css"
import { useForm } from "../../hooks/form"
import { addVenue } from "./addVenueSlice.js"

export default function AddVenue() {
  const dispatch = useDispatch()

  const [venueForm, setVenueForm, resetForm, updateForm] = useForm({
    title: "",
    desc: "",
    type: "",
    link: "",

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
    console.log(venueForm)
    dispatch(addVenue(venueForm))
  }

  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashSideBar}>
        <div className={styles.dashLogo}>
          <img src={"./assets/logo-062.svg"}></img>
        </div>
        <a href="http://localhost:3000/dashboard">Venues</a>
        <a href="http://localhost:3000/update">Update</a>
        <a href="http://localhost:3000/RecommendationsTable">Recommendations</a>
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
          <button type="submit" className={styles.formBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
