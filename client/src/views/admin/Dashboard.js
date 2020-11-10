import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardTable } from "../../ui/DashboardTable";
import styles from "./Dashboard.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../features/authentication/auth";
import { getVenue, selectDashboard } from "./dashboardSlice.js";

export default function Dashboard() {
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
        <button className={styles.logOutBtn} onClick={handleClick}>
          Log Out
        </button>
      </div>
      <div className={styles.dashTable}>
        <DashboardTable />
      </div>
    </div>
  );
}
