import React from "react"
import Highlights from "../features/highlights/Highlights"

import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"
import styles from "./Home.module.css"

export default function Home() {
  return (
    <div>
      <div className={styles.splashContainer}>
        <div classNAme={styles.splash}>
          {/* <div className={styles.overlay}></div> */}

          <div className={styles.welcome}></div>

          <img className={styles.wlogo} src={"./assets/logo-062.svg"}></img>
        </div>
        <div className={styles.chevron}><i class="fas fa-chevron-down fa-7x"></i></div>
      </div>
      <div className={styles.contentWrapper}>
        <Navbar />
        <Highlights></Highlights>
        <Footer />
      </div>
    </div>
  )
}
