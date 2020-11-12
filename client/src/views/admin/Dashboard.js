import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardTable } from "../../ui/DashboardTable";
import styles from "./Dashboard.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../features/authentication/auth";
import { getVenue, selectDashboard } from "./dashboardSlice.js";

export default function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const venues = useSelector(selectDashboard);
  console.log(venues);

  useEffect(() => {
    dispatch(getVenue());
  }, []);

  const history = useHistory();
  const { logout } = useAuth();
  // function handle(e) {
  //   e.preventDefault();
  //   history.push("/login");
  // }

  function handleClick() {
    logout().then((resp) => {
      console.log("test");
      history.push("/logout");
    });
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
          <span
            className={
              window.location.pathname == "/dashboard" ? styles.activeNav : ""
            }
          >
            Venues
          </span>
        </Link>
        <Link to="addVenue">
          <span
            className={
              window.location.pathname == "/addVenue" ? styles.activeNav : ""
            }
          >
            Add Venue
          </span>
        </Link>
        <Link to="/update">
          <span
            className={
              window.location.pathname == "/update" ? styles.activeNav : ""
            }
          >
            Update Venue
          </span>
        </Link>

        <Link to="RecommendationsTable">
          <span
            className={
              window.location.pathname == "/RecommendationsTable"
                ? styles.activeNav
                : ""
            }
          >
            Recommendations
          </span>
        </Link>
        <Link to="logout" onClick={handleClick}>
          Log Out
        </Link>
      </div>
      <div className={styles.dashTable}>
        <h1 className={styles.adminHeader}>Venues</h1>
        <DashboardTable />
      </div>
    </div>
  );
}

{
  /* <span className={window.location.pathname == '/recommendations' ? styles.activeNav : ""}>Recommendations</span> */
}
