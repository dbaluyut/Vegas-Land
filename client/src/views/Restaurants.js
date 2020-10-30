import React from "react"
import styles from './Restaurants.module.css';

export default function Restaurants() {
  return (
    <div className={styles.backgroundContainer}>
    <div className={styles.container}>
      <div className={styles.backgroundContainer2}>
      <div className={styles.box1}>
        <h1>Parallax Effect 1</h1>
      </div>
      </div>
      <div className={styles.box2}>
        <h1>Parallax Effect 2</h1>
      </div>
      <div className={styles.box3}>
        <h1>Parallax Effect 3</h1>
      </div>
    </div>
    </div>
  )
}
