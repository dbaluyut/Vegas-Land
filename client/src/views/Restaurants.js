import React from "react"
import { Navbar } from "../ui/Navbar"
import styles from "./Restaurants.module.css"

export default function Restaurants() {
  return (
    <div className={styles.fullContainer}>
      <div className={styles.header}>
      <Navbar />
      </div>
      <main className={styles.wrapper}>
      <section className={`${styles.section} ${styles.parallax} ${styles.bg1}`}>
        <h1>Restaurant 1</h1>
      </section>
      <section className={`${styles.section2} ${styles.static}`}>
        <h1>Restaurant 1 Description</h1>
      </section>
      <section className={`${styles.section} ${styles.parallax} ${styles.bg2}`}>
        <h1>Restaurant 2</h1>
      </section>
      </main>
      </div>
  )
}
