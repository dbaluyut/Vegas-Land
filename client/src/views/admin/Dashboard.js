import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DashboardTable } from "../../ui/DashboardTable"
import styles from "./Dashboard.module.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { getVenue, selectDashboard } from "./dashboardSlice.js"

export default function Dashboard() {
  const dispatch = useDispatch()
  const venues = useSelector(selectDashboard)
  console.log(venues)

  useEffect(() => {
    dispatch(getVenue())
  }, [])

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
      <div className={styles.dashTable}>
        <DashboardTable />
      </div>
    </div>
  )
}
