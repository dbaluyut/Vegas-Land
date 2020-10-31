import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectHappyHrList, getHappyHrList } from "./happyHrListSlice"
import styles from "./HappyHrList.module.css"
import { current } from "@reduxjs/toolkit"

export default function HappyHrList() {
  const list = useSelector(selectHappyHrList)
  const dispatch = useDispatch()
  let currentDate = new Date()
  let hr = currentDate.getHours().toString()
  let min = currentDate.getMinutes().toString()
  let day = currentDate.getDay()
  let currentTime = Number(hr + min)

  //IF CURRENT TIME IS BETWEEN VHSTART AND STOP RETURN VENUE
  let filtered = list.filter(
    (venue) =>
      currentTime > venue.happy_hr_start &&
      currentTime < venue.happy_hr_stop &&
      venue.day === day
  )

  useEffect(() => {
    dispatch(getHappyHrList())
  }, [])
  console.log(currentTime)
  console.log(filtered)
  return (
    <div>
      <h1>
        current time {hr}:{min}
      </h1>
      {filtered.map((item) => {
        return (
          <div className={styles.hhrBox} key={item.id}>
            <img className={styles.venueThumb} src={item.image}></img>
            <h1>{item.venue_id}</h1>
            <h1>{item.title}</h1>
            <h1>{item.happy_hr_start}</h1>
            <h1>{item.happy_hr_stop}</h1>
          </div>
        )
      })}
    </div>
  )
}
