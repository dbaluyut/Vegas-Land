import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DashboardTable } from "../../ui/DashboardTable"
import DashSidebar from "./DashSidebar"
import styles from "./Dashboard.module.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../features/authentication/auth"
import { getVenue, selectDashboard } from "./dashboardSlice.js"

export default function Dashboard() {
  const location = useLocation()
  const dispatch = useDispatch()
  const venues = useSelector(selectDashboard)
  console.log(venues)

  useEffect(() => {
    dispatch(getVenue())
  }, [])

  const history = useHistory()
  const { logout } = useAuth()
  // function handle(e) {
  //   e.preventDefault();
  //   history.push("/login");
  // }

  function handleClick() {
    logout().then((resp) => {
      console.log("test")
      history.push("/logout")
    })
  }

  return (
    <div className={styles.dashContainer}>
      <DashSidebar />
      <div className={styles.dashTable}>
        <h1 className={styles.adminHeader}>Venues</h1>
        <DashboardTable />
      </div>
    </div>
  )
}

{
  /* <span className={window.location.pathname == '/recommendations' ? styles.activeNav : ""}>Recommendations</span> */
}
