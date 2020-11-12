import { React, useEffect } from "react"
import styles from "./DashboardTable.module.css"
import {
  selectDashboardTable,
  getDashboardTable,
  removeTableItem,
} from "./dashboardTableSlice"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

export function DashboardTable() {
  const dashboardTable = useSelector(selectDashboardTable)
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDashboardTable())
  }, [])
  console.log(dashboardTable)

  function handleDelete(item) {
    dispatch(removeTableItem(item.id))
  }

  function handleUpdate(venue) {
    history.push("/update/" + venue.id)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Location I.D.</th>
          <th>Type</th>
          <th>Link</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dashboardTable.map((item) => (
          <tr>
            <td className={styles.tableTitle} data-column="Title">
              {item.title}
            </td>
            <td className={styles.tableDesc} data-column="Description">
              {item.desc}
            </td>
            <td className={styles.tableLocation} data-column="Location I.D.">
              {item.location_id}
            </td>
            <td className={styles.tableType} data-column="Type">
              {item.type}
            </td>
            <td className={styles.tableLink} data-column="Link">
              <a href={item.link}>{item.link}</a>
            </td>
            <td className={styles.tableActions} data-column="Actions">
              <button
                classname={styles.removeBtn}
                onClick={() => handleDelete(item)}
              >
                <i class="fas fa-trash-alt"></i>
              </button>
              <button onClick={() => handleUpdate(item)}>
                <i class="fas fa-edit"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
