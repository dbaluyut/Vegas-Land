import React from "react";

import Bars from "../views/Bars";
import Restaurants from "../views/Restaurants";
import Experiences from "../views/Experiences";
import About from "../views/About";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div className={styles.footerContainer}>
      <hr></hr>
      <div className={styles.footerItem}>
        <ul className={styles.social_links}>
          <li>
            <i class="fa fa-facebook"></i>
          </li>
          <li>
            <i class="fa fa-twitter"></i>
          </li>
          <li>
            <i class="fa fa-instagram"></i>
          </li>
        </ul>
        <ul className={styles.navbar_links}>
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
        </ul>
        <div className={styles.agreements}>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
        <div className={styles.trademark}>
          <p>&#169; 2020 Warriors</p>
        </div>
      </div>

      {/* footer  */}

      <div className={styles.recommendation}>
        <p className={styles.form_title}>Anything we're missing?</p>
        <div className={styles.form_container}>
          <p className={styles.subtitle}>
            Have any recommendations? Fill and submit this form
          </p>

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
              <input className={styles.submit} type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// $(".js-expand").click(function() {
//     if ($('#email').val()) {
//       //validate form
//     } else {
//       $(".js-hiddenform").slideDown();
//     }
//   });
