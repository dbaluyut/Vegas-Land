import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DashboardTable } from "../../ui/DashboardTable"
import styles from "./Dashboard.module.css"

import {
  display,
  getVenue,
  addVenue,
  selectDashboard,
} from "./dashboardSlice.js"

export default function Dashboard() {
  const dispatch = useDispatch()
  const venues = useSelector(selectDashboard)
  console.log(venues)

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [location_id, setLocation_id] = useState("")
  const [type, setType] = useState("")
  const [link, setLink] = useState("")

  useEffect(() => {
    dispatch(getVenue())
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addVenue({ title, desc, location_id, type, link }))

    setTitle("")
    setDesc("")
    setLocation_id("")
    setType("")
    setLink("")
  }

  // function handleUpdate(name, desc) {
  //   dispatch(updateRecommendations({ name, desc }));
  // }

  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashSideBar}>
        <div className={styles.dashLogo}>
          {/* <img src={"./assets/logo-062.svg"}></img> */}
        </div>
        <a href="http://localhost:3000/dashboard">Venues</a>
        <a href="http://localhost:3000/update">Update</a>
        <a href="http://localhost:3000/RecommendationsTables">RecommendationsTables</a>
      </div>
      <div className={styles.dashTable}>
        <DashboardTable />
      </div>
    </div>
  )
}
