import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styles from "./Dashboard.module.css"
import { useForm } from "../../hooks/form"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { getVenue, updateVenue, selectUpdate } from "./updateSlice.js"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../features/authentication/auth"

export default function Update() {
  const dispatch = useDispatch()
  const venues = useSelector(selectUpdate)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getVenue())
  }, [])

  const [venueForm, setVenueForm, resetForm, updateForm] = useForm({
    title: "",
    desc: "",
    type: "",
    link: "",
    id: null,
  })

  function handleSubmit(e) {
    e.preventDefault()
    // console.log(venueForm)
    dispatch(updateVenue(venueForm))
    history.push("/dashboard")
  }
  useEffect(() => {
    if (venues.length) {
      const index = id ? venues.findIndex((venue) => venue.id == id) : 0
      updateForm(venues[index])
    }
  }, [venues])

  function handleVenueChange(index) {
    updateForm(venues[index])
  }

  const history = useHistory()
  const { logout } = useAuth()

  function handleClick() {
    logout().then((resp) => {
      history.push("/logout")
    })
  }

  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashSideBar}>
        <Link to="/">
          <div className={styles.dashLogo}>
            <img src={"./assets/logo-062.svg"}></img>
          </div>
        </Link>
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

      <div className={styles.dashUpdateForm}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.dashFormItem}>
            <h1 className={styles.adminHeader2}>Update Venue Form</h1>
            <label>Venue:</label>
            <br />
            <select
              name="id"
              onChange={(e) => handleVenueChange(e.target.value)}
            >
              {venues.map((venue, index) => (
                <option
                  key={"venue-" + venue.id}
                  value={index}
                  selected={venueForm.id == venue.id}
                >
                  {venue.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.dashFormItem}>
            <label>Title:</label>
            <br />
            <input
              type="text"
              name="title"
              value={venueForm.title}
              onChange={setVenueForm}
            />
          </div>
          <div className={styles.dashFormItem}>
            <label>Description:</label>
            <br />
            <textarea
              name="desc"
              value={venueForm.desc}
              onChange={setVenueForm}
            ></textarea>
          </div>
          <div className={styles.dashFormItem}>
            <label>Type:</label>
            <br />
            <select name="type" value={venueForm.type} onChange={setVenueForm}>
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
              value={venueForm.link}
              onChange={setVenueForm}
            />
          </div>

          <button type="submit" className={styles.formBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
