import React from "react"

import styles from "./Footer.module.css"

export function Footer() {
  return (
    <div>
      <div className={styles.footerContainer}>
        <div className={styles.footerItem}>
          <ul className={styles.social_links}>
            <li>
              <i className={styles.footerIcon} class="fa fa-facebook"></i>
            </li>
            <li>
              <i className={styles.footerIcon} class="fa fa-twitter"></i>
            </li>
            <li>
              <i  className={styles.footerIcon} class="fa fa-instagram"></i>
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
          <div>
            <p className={styles.trademark}>&#169; 2020 Warriors</p>
          </div>
        </div>

        {/* recommendation form  */}
      </div>
    </div>
  )
}

// text-align: center; */
//     /* padding: 5px 30%; */
//     padding: 0px 31%;
//     font-size: 12px;

// $(".js-expand").click(function() {
//     if ($('#email').val()) {
//       //validate form
//     } else {
//       $(".js-hiddenform").slideDown();
//     }
//   });
