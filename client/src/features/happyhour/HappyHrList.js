import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectHappyHrList, getHappyHrList } from "./happyHrListSlice"
import styles from "./HappyHrList.module.css"
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps"

export default function HappyHrList() {
  const list = useSelector(selectHappyHrList)
  const dispatch = useDispatch()
  let currentDate = new Date()
  let hr = currentDate.getHours().toString()
  let min = currentDate.getMinutes()
  let minStr = min < 10 ? "0" + min.toString() : min.toString()
  let day = currentDate.getDay()
  let currentTime = Number(hr + minStr)

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
  console.log(list[0])

  function Map() {
    return (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 36.165459, lng: -115.143837 }}
      >
        {filtered.map((item) => {
          return (
            <Marker
              position={{ lat: Number(item.lat), lng: Number(item.lng) }}
              label={item.title}
            />
          )
        })}
      </GoogleMap>
    )
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map))

  return (
    <div>
      <h1>
        current time {hr}:{min}
      </h1>
      <div className={styles.wrapper}>
        <div className={styles.mapContainer}>
          <WrappedMap
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDuSYxMht_3bQ95VKJVdKQTgYl3r3XWXqQ"
            }
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
        <div className={styles.listContainer}>
          {filtered.map((item) => {
            return (
              <div className={styles.hhrBox} key={item.id}>
                <div
                  className={styles.venueThumb}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <h1>{item.venue_id}</h1>
                <h1>{item.title}</h1>
                <h1>{item.happy_hr_start}</h1>
                <h1>{item.happy_hr_stop}</h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
