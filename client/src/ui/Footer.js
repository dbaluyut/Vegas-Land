import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div>
      <div className={styles.footerContainer}>
        <div className={styles.footerItem}>
          <ul className={styles.social_links}>
            <li>
              <i
                style={{ padding: "16px 21px" }}
                id="facebook"
                className={`${styles.footerIcon} ${styles.facebookIcon}`}
                class="fa fa-facebook"
              ></i>
            </li>
            <li>
              <i
                style={{ padding: "16px 18px" }}
                className={`${styles.footerIcon} ${styles.twitterIcon}`}
                class="fa fa-twitter"
              ></i>
            </li>
            <li>
              <i
              style={{ padding: "16px 19px" }}
                className={`${styles.footerIcon} ${styles.instaIcon}`}
                class="fa fa-instagram"
              ></i>
            </li>
          </ul>
          <ul className={styles.navbar_links}>
            <li>
              <Link to="bars">
                <span>Bars</span>
              </Link>
            </li>
            <li>
            <Link to="restaurants">
                <span>Restaurants</span>
              </Link>
            </li>
            <li>
            <Link to="experiences">
                <span>Experiences</span>
              </Link>
            </li>
            <li>
            <Link to="about">
                <span>Our Team</span>
              </Link>
            </li>
          </ul>
          <div className={styles.agreements}>
            <p>Terms of Use</p>
            <p>Privacy Policy</p> 
            <p >&#169; 2020 Warriors</p>
          </div>
          <div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

//  ;
