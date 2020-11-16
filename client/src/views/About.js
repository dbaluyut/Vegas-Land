import React from "react"

import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"
import styles from "./About.module.css"

export default function About() {
  return (
    <div>
      <Navbar />
      {/* <h1>About page</h1> */}
      <div className={styles.aboutContainer}>
        <div className={styles.section1}>
          <div className={styles.discription}>
            <p className={styles.name}>Name</p>
            <p className={styles.title}>Web Developer</p>
            <p className={styles.bio}>
            Bereket Girma is a Web Developer based in Las Vegas. She's built web applications using Node.js and React and has a solid foundation in web design and development. She recently completed PunchCode’s web development bootcamp.
Before moving into development,  she worked in the Health sector, where she  managed and converted voice recordings that physicians and other healthcare workers make into written reports.
When she is not coding, she enjoys spending time with family and learning different cultures and their languages. 
Right now  she is  looking for a suitable position with a company where outstanding performance is recognised and where she can work on a variety of projects.

            </p>
            
            <section className={styles.aboutIcons}>
              <a href="#">
                <i class="fa fa-linkedin-square" aria-hidden="true"></i>
              </a>

              <a href="#">
                <i class="fa fa-github-square" aria-hidden="true"></i>
              </a>
            </section>
          </div>
          <div className={styles.imageContainer}>
            <img className={styles.profileImage} src="./assets/photo1-01.png" />
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.imageContainer2}>
            <img
              className={styles.profileImage2}
              src="./assets/photo1-01.png"
            />
          </div>
          <div className={styles.discription}>
            <p className={styles.name}>Name</p>
            <p className={styles.title}>Web Developer</p>
            <p className={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <section className={styles.aboutIcons}>
              <a href="#">
                <i class="fa fa-linkedin-square" aria-hidden="true"></i>
              </a>

              <a href="#">
                <i class="fa fa-github-square" aria-hidden="true"></i>
              </a>
            </section>
          </div>
        </div>

        <div className={styles.section3}>
          <div className={styles.discription}>
            <p className={styles.name}>Name</p>
            <p className={styles.title}>Web Developer</p>
            <p className={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <section className={styles.aboutIcons}>
              <a href="#">
                <i class="fa fa-linkedin-square" aria-hidden="true"></i>
              </a>

              <a href="#">
                <i class="fa fa-github-square" aria-hidden="true"></i>
              </a>
            </section>
          </div>
          <div className={styles.imageContainer}>
            <img className={styles.profileImage} src="./assets/photo1-01.png" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
