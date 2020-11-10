import React, { useState, useEffect } from "react";
import styles from "./RecommendationsTable.module.css";
import {
  selectRecommendationsTable,
  getRecommendationsTable,
} from "./recommendationsTableSlice";
import { useSelector, useDispatch } from "react-redux";

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

  return (
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
            {/* <td className={styles.tableType} data-column="Type">{item.type}</td>
      <td className={styles.tableLink} data-column="Link"><a href={item.link}>{item.link}</a></td>
      <td className={styles.tableRemove} data-column="Remove"><button onClick={() => handleDelete(item)}>x</button></td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
