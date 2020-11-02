import React from "react";

import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";
import styles from "./About.module.css";

export default function About() {
  return (
    <div>
      <Navbar />
      <h1>About page</h1>
      <div>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={`${styles.face} ${styles.face1}`}>
              <div className={styles.content}>
                <div className={styles.icon}>
                  <img
                    src="https://images.unsplash.com/photo-1571772805064-207c8435df79?ixlib=rb-1.2.1&auto=format&fit=crop&w=977&q=80"
                    className={styles.img}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.face} ${styles.face2}`}>
              <div className={styles.content}>
                <h3>
                  <a href="#" target="_blank">
                    Our Name
                  </a>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <i  class="fa fa-linkedin-square" aria-hidden="true"></i>
                <i  class="fa fa-github-square" aria-hidden="true"></i>
                 <i  class="fa fa-twitter-square" aria-hidden="true"></i>
                 <i class="fa fa-instagram" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={`${styles.face} ${styles.face1}`}>
              <div className={styles.content}>
                <div className={styles.icon}>
                  <img
                    src="https://images.unsplash.com/photo-1571772805064-207c8435df79?ixlib=rb-1.2.1&auto=format&fit=crop&w=977&q=80"
                    className={styles.img}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.face} ${styles.face2}`}>
              <div className={styles.content}>
                <h3>
                  <a href="#" target="_blank">
                    Our Name
                  </a>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <i  class="fa fa-linkedin-square" aria-hidden="true"></i>
                <i  class="fa fa-github-square" aria-hidden="true"></i>
                 <i  class="fa fa-twitter-square" aria-hidden="true"></i>
                 <i class="fa fa-instagram" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={`${styles.face} ${styles.face1}`}>
              <div className={styles.content}>
                <div className={styles.icon}>
                
                  <img
                    src="https://images.unsplash.com/photo-1571772805064-207c8435df79?ixlib=rb-1.2.1&auto=format&fit=crop&w=977&q=80"
                    className={styles.img}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.face} ${styles.face2}`}>
              <div className={styles.content}>
                <h3>
                  <a href="#" target="_blank">
                    Our Name
                  </a>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <i class="fa fa-linkedin-square social_media_icons" aria-hidden="true"></i>
                <i  class="fa fa-github-square" aria-hidden="true"></i>
                 <i  class="fa fa-twitter-square" aria-hidden="true"></i>
                 <i class="fa fa-instagram" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
