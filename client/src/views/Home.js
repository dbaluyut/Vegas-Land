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
        <div className={styles.homeBanner}>
          <h1>Welcome to VegasLand</h1>
          <img className={styles.bannerImg1} src="./assets/hoverMarker-01.svg"></img>
          <img className={styles.bannerImg4} src="./assets/hoverMarker-01.svg"></img>
          <img className={styles.bannerImg2} src="./assets/hoverMarker-02.svg"></img>
          {/* <img className={styles.bannerImg5} src="./assets/hoverMarker-02.svg"></img> */}
          <img className={styles.bannerImg3} src="./assets/hoverMarker-03.svg"></img>
          <img className={styles.bannerImg6} src="./assets/hoverMarker-03.svg"></img>
        </div>
        {/* <h3>Highlights of the Week</h3> */}
        <Highlights></Highlights>
        <Footer />
      </div>
    </div>
  )
}
