import React, { useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styles from "./Highlights.module.css"
import axios from "axios"
import { selectHighlights, getHighlights } from "./highlightsSlice"

export default function Highlights() {
  const venues = useSelector(selectHighlights)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(getHighlights())
  }, [])

  function handle(venue) {
    if (venue.type == "restaurant") {
      history.push("/restaurants/" + venue.id)
    } else if (venue.type == "bar") {
      history.push("/bars/" + venue.id)
    } else {
      history.push("/experiences/" + venue.id)
    }
  }
  // console.log(venues[0].image)
  return (
    <div>
      {venues.length > 0 ? (
        <div className={styles.hlContainer}>
          <div
            onClick={() => handle(venues[0])}
            className={styles.gridItem1}
            style={{
              backgroundImage: `url(${venues[0].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className={styles.venueTitle}>{venues[0].title}</h2>
          </div>
          <div
            onClick={() => handle(venues[1])}
            className={styles.gridItem2}
            style={{
              backgroundImage: `url(${venues[1].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className={styles.venueTitle}>{venues[1].title}</h2>
          </div>

          <div
            onClick={() => handle(venues[2])}
            className={styles.gridItem3}
            style={{
              backgroundImage: `url(${venues[2].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className={styles.venueTitle}>{venues[2].title}</h2>
          </div>
          <div
            onClick={() => handle(venues[3])}
            className={styles.gridItem4}
            style={{
              backgroundImage: `url(${venues[3].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className={styles.venueTitle}>{venues[3].title}</h2>
          </div>
          <div
            onClick={() => handle(venues[4])}
            className={styles.gridItem5}
            style={{
              backgroundImage: `url(${venues[4].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className={styles.venueTitle}>{venues[4].title}</h2>
          </div>
          <div
            onClick={() => handle(venues[5])}
            className={styles.gridItem6}
            style={{
              backgroundImage: `url(${venues[5].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className={styles.venueTitle}>{venues[5].title}</h2>
          </div>
          <div
            onClick={() => handle(venues[6])}
            className={styles.gridItem7}
            style={{
              backgroundImage: `url(${venues[6].image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className={styles.venueTitle}>{venues[6].title}</h2>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
