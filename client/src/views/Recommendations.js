import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";

import {
  display,
  getRecommendations,
  addRecommendations,
  selectRecommendations,
  selectNewRecommendations,
} from "./recommendationsSlice.js";

import styles from "./Recommendations.module.css";

export default function Recommendations() {
  const dispatch = useDispatch();
  const recommendations = useSelector(selectRecommendations);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getRecommendations());
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addRecommendations(text, name, email));

    setName("");
    setEmail("");
    setText("");
  }

  // function handleUpdate(name, desc) {
  //   dispatch(updateRecommendations({ name, desc }));
  // }

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
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.name_input}>
                    <label className={styles.label} for="name">
                      Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
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
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                      className={styles.textarea}
                      name="comment"
                      form="usrform"
                    ></textarea>
                  </div>

                  <div className={styles.submitDiv}>
                    <button
                      className={styles.submit}
                      type="submit"
                      value="Submit"
                    >
                      Submit
                    </button>
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
