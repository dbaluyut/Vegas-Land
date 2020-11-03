import React, { useEffect } from "react"
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"
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
      <div className={styles.contentContainer}>
        <ul
          style={{
            backgroundImage: `url(${"./assets/assets-04.png"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className={styles.sidebar}
        >
          {restaurants.map((item) => (
            <li className={styles.sidebarItem}>
              <div className={styles.sidebarItemTitle}>{item.title}</div>
            </li>
          ))}
        </ul>
        <main className={styles.wrapper}>
          {restaurants.map((item) => (
            <div>
            <section
            className={`${styles.section} ${styles.parallax} ${styles.bg1}`}
            // style={{
            //   backgroundImage: `url(${item.image})`,
              
            // }}
          >
            <h1>{item.title}</h1>
          </section>
          <section className={`${styles.section2} ${styles.static}`}>
            <h1>{item.desc}</h1>
          </section>
          
          </div>
          ))}
          
        </main>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
