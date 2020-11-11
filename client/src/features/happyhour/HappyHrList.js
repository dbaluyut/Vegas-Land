import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectHappyHrList, getHappyHrList } from "./happyHrListSlice"
import styles from "./HappyHrList.module.css"
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps"
import mapStyles from "./mapStyles"

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
  console.log(list)

  // MAP SECTION
  const [selectedVenue, setSelectedVenue] = useState(null)

  function Map() {
    return (
      <GoogleMap
        defaultZoom={15.1}
        defaultCenter={{ lat: 36.162329, lng: -115.142906 }}
        defaultOptions={{ styles: mapStyles }}
      >
        {filtered.map((item) => {
          return (
            <Marker
              position={{ lat: Number(item.lat), lng: Number(item.lng) }}
              icon={{
                url: "./assets/vmarker.svg",
                scaledSize: new window.google.maps.Size(70, 70),
                // size: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(20, 0),
                // anchor: new window.google.maps.Point(0, 70),
              }}
              onClick={() => {
                setSelectedVenue(item)
              }}
            />
          )
        })}
        {selectedVenue && (
          <InfoWindow
            position={{
              lat: Number(selectedVenue.lat),
              lng: Number(selectedVenue.lng),
            }}
            onCloseClick={() => setSelectedVenue(null)}
          >
            <div>
              <div className={styles.hhrBox} key={selectedVenue.id}>
                <div
                  className={styles.venueThumb}
                  style={{
                    backgroundImage: `url(${selectedVenue.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div>
                  <h3>{selectedVenue.title}</h3>
                  <li>{selectedVenue.street_1}</li>
                  <li>
                    {selectedVenue.happy_hr_start} to{" "}
                    {selectedVenue.happy_hr_stop}
                  </li>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map))

  return (
    <div>
      {/* <h1>
        current time {hr}:{min}
      </h1> */}
      <div className={styles.wrapper}>
        <div className={styles.listContainer}>
          <h3 className={styles.listTitle}>Active Happy Hour</h3>
          {filtered.map((item) => {
            return (
              <div
                className={styles.hhrBox}
                key={item.id}
                onClick={() => {
                  setSelectedVenue(item)
                }}
              >
                <div
                  className={styles.venueThumb}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className={styles.infoContainer}>
                  <h3>{item.title}</h3>
                  <li>{item.street_1}</li>
                  <li>
                    {item.happy_hr_start} to {item.happy_hr_stop}
                  </li>
                </div>
              </div>
            )
          })}
        </div>

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
      </div>
    </div>
  )
}
