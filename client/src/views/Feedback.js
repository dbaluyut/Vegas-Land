import React, { useEffect, useState } from "react";
import styles from "./Feedback.module.css";
import { Navbar } from "../ui/Navbar";
export default function Feedback() {
  return (
    <div>
      <Navbar />
      <div className={styles.feedbackContainer}>
        <p className={styles.feedbackTitle}>Thank You for Your Submission! </p>
      </div>
    </div>
  );
}
