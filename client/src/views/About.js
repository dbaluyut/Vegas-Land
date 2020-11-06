import React from "react";

import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";
import styles from "./About.module.css";

export default function About() {
  return (
    <div>
      <Navbar />
      <h1>About page</h1>
      {/* <section className={styles.layoutContainer}>
        <div className={styles.description}>
          <p className={styles.name}>Name</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className={styles.image}></div>
      </section> */}
      <Footer />
    </div>
  );
}
