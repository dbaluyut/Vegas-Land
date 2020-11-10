import { React } from "react"

import styles from "./Navbar.module.css"

export function Navbar() {
  return (
    <div
      className={styles.navWrapper}
      style={{
        backgroundImage: `url(${"./assets/assets-05.png"})`,
        backgroundPosition: "-30rem 42rem",
      }}
    >
      <nav>
        <a className={styles.logo} href="http://localhost:3000/home">
          <img className={styles.logoImage} src={"./assets/logo-062.svg"}></img>
        </a>
        <ul className={styles.nav_links}>
          <li>
            <a href="http://localhost:3000/bars">Bars</a>
          </li>
          <li>
            <a href="http://localhost:3000/restaurants">Restaurants</a>
          </li>
          <li>
            <a href="http://localhost:3000/experiences">Experiences</a>
          </li>
          <li>
            <a href="http://localhost:3000/about">Our Team</a>
          </li>
          <li>
            <a href="http://localhost:3000/recommendations">Recommendations</a>
          </li>
        </ul>
        {/* <div className={styles.burger}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div> */}
      </nav>
    </div>
  )
}
