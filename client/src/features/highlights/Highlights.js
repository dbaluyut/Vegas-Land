import React, { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import styles from "./Highlights.module.css"
import axios from "axios"
import { selectHighlights, getHighlights } from "./highlightsSlice"

export default function Highlights() {
  const venues = useSelector(selectHighlights)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHighlights())
  }, [])
  // console.log(venues[0].image)
  return (
    <div>
      {venues.length > 0 ? (
        <div className={styles.hlContainer}>
          <div
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
