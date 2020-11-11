import React, { useState, useEffect } from "react";
import styles from "./RecommendationsTable.module.css";
import {
  selectRecommendationsTable,
  getRecommendationsTable,
} from "./recommendationsTableSlice";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../features/authentication/auth";

// export default function RecommendationsTable(){
//     return <h1>Recommend</h1>
// }

export default function RecommendationsTable() {
  const recommendationsTable = useSelector(selectRecommendationsTable);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecommendationsTable());
  }, []);
  console.log(recommendationsTable);

  //   function handleDelete(item) {
  //     dispatch(removeTableItem(item.id))
  //   }

  const history = useHistory();
  const { logout } = useAuth();

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
        <Link to="logout" onClick={handleClick}>
          Log Out
        </Link>
      </div>
      <div className={styles.dashTable}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Desc</th>
            </tr>
          </thead>
          <tbody>
            {recommendationsTable.map((item) => (
              <tr>
                <td className={styles.tableName} data-column="Name">
                  {item.name}
                </td>
                <td className={styles.tableEmail} data-column="Email">
                  {item.email}
                </td>
                <td className={styles.tableDesc} data-column="Desc">
                  {item.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
