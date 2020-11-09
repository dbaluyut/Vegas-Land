import { React, useEffect } from 'react'
import styles from "./DashboardTable.module.css"
import { selectDashboardTable,
         getDashboardTable,
         removeTableItem, } from "./dashboardTableSlice"
import { useSelector, useDispatch } from "react-redux"





export function DashboardTable() {

  const dashboardTable = useSelector(selectDashboardTable)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDashboardTable())
  }, [])
  console.log(dashboardTable)

  function handleDelete(item) {
    dispatch(removeTableItem(item.id))
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
      <th>Remove</th>
    </tr>
  </thead>
  <tbody>
    {dashboardTable.map((item) => (
      <tr>
      <td className={styles.tableTitle} data-column="Title">{item.title}</td>
      <td className={styles.tableDesc} data-column="Description">{item.desc}</td>
      <td className={styles.tableLocation} data-column="Location I.D.">{item.location_id}</td>
      <td className={styles.tableType} data-column="Type">{item.type}</td>
      <td className={styles.tableLink} data-column="Link"><a href={item.link}>{item.link}</a></td>
      <td className={styles.tableRemove} data-column="Remove"><button onClick={() => handleDelete(item)}>x</button></td>
    </tr>
    ))}
  </tbody>
</table>
  )
}