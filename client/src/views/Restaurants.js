import React from "react"
import { Navbar } from "../ui/Navbar"
import styles from "./Restaurants.module.css"

export default function Restaurants() {
  return (
    <div className={styles.fullContainer}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.box1}>
          <h1>Restaurant Title</h1>
        </div>
        <div className={styles.box2}>
          <h1>Restaurant Description</h1>
        </div>
        <div className={styles.box3}>
          <h1>Parallax Effect 3</h1>
        </div>
      </div>
    </div>
  )
}
