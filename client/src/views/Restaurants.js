import React, { useEffect } from "react"
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer";
import styles from "./Restaurants.module.css"
import { selectRestaurants, getRestaurants } from "./restaurantsSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Restaurants() {
  const restaurants = useSelector(selectRestaurants)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRestaurants())
  }, [])
  console.log(restaurants)
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
      <div className={styles.footer}>
      <Footer />
      </div>
      </div>
  )
}
