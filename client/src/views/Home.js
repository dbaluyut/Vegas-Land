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
          <div className={styles.welcome}></div>

          <img className={styles.wlogo} src={"./assets/logo-062.svg"}></img>
        </div>
        <div className={styles.chevron}>
          <i class="fas fa-chevron-down fa-7x"></i>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${"./assets/footer-bg1.svg"})`,
          backgroundPosition: "center bottom",
          width: "100vw",
          backgroundRepeat: "no-repeat",
        }}
        className={styles.contentWrapper}
      >
        <Navbar />
        <div className={styles.homeBanner}></div>
        <Highlights></Highlights>
        <Footer />
      </div>
    </div>
  )
}
