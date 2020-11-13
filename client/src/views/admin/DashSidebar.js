import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import styles from "./Dashboard.module.css"
import { useAuth } from "../../features/authentication/auth"

export default function DashSidebar() {
  const location = useLocation()
  const history = useHistory()
  const { logout } = useAuth()
  function handleClick() {
    logout().then((resp) => {
      history.push("/logout")
    })
  }
  return (
    <div className={styles.dashSideBar}>
      <Link to="/">
        <div className={styles.dashLogo}>
          <img src={"./assets/logo-062.svg"}></img>
        </div>
      </Link>
      <Link to="/dashboard">
        <span
          className={location.pathname == "/dashboard" ? styles.activeNav : ""}
        >
          Venues
        </span>
      </Link>
      <Link to="/addVenue">
        <span
          className={location.pathname == "/addVenue" ? styles.activeNav : ""}
        >
          Add Venue
        </span>
      </Link>
      <Link to="/update">
        <span
          className={
            location.pathname.includes("/update") ? styles.activeNav : ""
          }
        >
          Update Venue
        </span>
      </Link>

      <Link to="/RecommendationsTable">
        <span
          className={
            location.pathname == "/RecommendationsTable" ? styles.activeNav : ""
          }
        >
          Recommendations
        </span>
      </Link>
      <Link to="/logout" onClick={handleClick}>
        Log Out
      </Link>
    </div>
  )
}
