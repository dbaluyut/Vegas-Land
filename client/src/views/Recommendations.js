import React from "react";

import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";

import styles from "./Recommendations.module.css";

export default function Recommendations() {
  return (
    <div>
      <Navbar />
      <h2>Bars</h2>
      <div className={styles.recommendation}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={`${styles.face} ${styles.face1}`}>
              <div className={styles.content}>
                <div className={styles.icon}>
                  <p className={styles.recommendation_title}>Recommendation?</p>
                </div>
              </div>
            </div>
            <div className={`${styles.face} ${styles.face2}`}>
              <div className={styles.content}>
                <form className={styles.form}>
                  <div className={styles.name_input}>
                    <label className={styles.label} for="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className={styles.form_field}
                      placeholder="Name"
                    />
                  </div>

                  {/* <!--      email input              --> */}
                  <div className={styles.email_input}>
                    <label className={styles.label} for="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className={styles.form_field}
                      placeholder="Email"
                    />
                  </div>

                  <div className={styles.textarea_input}>
                    <label className={styles.label} for="email">
                      Message
                    </label>
                    <textarea
                      className={styles.textarea}
                      name="comment"
                      form="usrform"
                    ></textarea>
                  </div>

                  <div className={styles.submitDiv}>
                    <input
                      className={styles.submit}
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
