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

        <div className={styles.section2}>
          <div className={styles.imageContainer2}>
            <img
              className={styles.profileImage2}
              src="./assets/photo1-01.png"
            />
          </div>
          <div className={styles.discription}>
            <p className={styles.name}>Will Stoddard</p>
            <p className={styles.title}>Web Developer</p>
            <p className={styles.bio}>
            Will is a web developer born and raised in Las Vegas, NV. He is a recent graduate of Punchcode, a full stack coding bootcamp. Through the program, he grew a love for all things Javascript, as well as how to build beautiful web applications using React, Redux, Node JS and Express. Before becoming a programmer, he worked in hospitality on the Las Vegas Strip for 7 years. When he's not coding, he enjoy reading and writing fiction, as well as studying film.
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
