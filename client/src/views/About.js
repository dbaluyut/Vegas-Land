import React from "react";

import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";
import styles from "./About.module.css";

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
              Bereket Girma is a Web Developer based in Las Vegas. She's built
              web applications using Node.js and React and has a solid
              foundation in web design and development. She recently completed
              PunchCode’s web development bootcamp. Before moving into
              development, she worked in the Health sector, where she managed
              and converted voice recordings that physicians and other
              healthcare workers make into written reports. When she is not
              coding, she enjoys spending time with family and learning
              different cultures and their languages. Right now she is looking
              for a suitable position with a company where outstanding
              performance is recognised and where she can work on a variety of
              projects.
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
              src="./assets/will-photo.png"
            />
          </div>
          <div className={styles.discription}>
            <p className={styles.name}>Will Stoddard</p>
            <p className={styles.title}>Web Developer</p>
            <p className={styles.bio}>
              Will is a web developer born and raised in Las Vegas, NV. He is a
              recent graduate of Punchcode, a full stack coding bootcamp.
              Through the program, he grew a love for all things Javascript, as
              well as how to build beautiful web applications using React,
              Redux, Node JS and Express. Before becoming a programmer, he
              worked in hospitality on the Las Vegas Strip for 7 years. When
              he's not coding, he enjoy reading and writing fiction, as well as
              studying film.
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
            <p className={styles.name}>Derrique Baluyut</p>
            <p className={styles.title}>Web Developer</p>
            <p className={styles.bio}>
              Though not a Las Vegas native, Derrique has come to love the city
              after moving from Anchorage, Alaska back in 2014. Derrique is a
              Jack of all trades. His experiences vary from the Tradeshow
              industry to working for a Civil Engineering firm, Retail and F&B.
              All of which helped in bringing everything together for Vegaland.
              He is both design literate and detail oriented. His dedication to
              any project proves himself to be a great asset to whatever team he
              finds himself in. Outside of work, he enjoys everything from
              snowboarding to gaming to listening to Jazz and Lofi music to
              admiring Woodwork, Architecture, Design, History and Technology
              just like the jack of all trades that he is.
            </p>

            <section className={styles.aboutIcons}>
              <a
                href="https://www.linkedin.com/in/derrique-baluyut-5ba14545/"
                target="_blank"
              >
                <i class="fa fa-linkedin-square" aria-hidden="true"></i>
              </a>

              <a href="https://dbaluyut.github.io/" target="_blank">
                <i class="fa fa-github-square" aria-hidden="true"></i>
              </a>
            </section>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.profileImage}
              src="./assets/db-photo-01.png"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
