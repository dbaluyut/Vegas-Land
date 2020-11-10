import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"

import {
  display,
  getRecommendations,
  addRecommendations,
  selectRecommendations,
  selectNewRecommendations,
} from "./recommendationsSlice.js"

import styles from "./Recommendations.module.css"

export default function Recommendations() {
  const history = useHistory();
  const dispatch = useDispatch()
  const recommendations = useSelector(selectRecommendations)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    dispatch(getRecommendations())
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addRecommendations({ text, name, email }))
    history.push("/formSubmissionFeedback");

    setName("")
    setEmail("")
    setText("")
  }


  // function handle(e) {
  //   e.preventDefault();
  //   login(userInput, passwordInput).then((resp) => {
      
  //   });
  // }


  // function handleUpdate(name, desc) {
  //   dispatch(updateRecommendations({ name, desc }));
  // }

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <form className={styles.contact} onSubmit={handleSubmit}>
          <h3 className={styles.formName}>Any Recommendations? Send suggestions here!</h3>

          <fieldset>
            <input
              input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your name"
              type="text"
              tabindex="1"
              required
              autofocus
            />
          </fieldset>
          <fieldset>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              type="email"
              tabindex="2"
              required
            />
          </fieldset>
          <fieldset>
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Type your message here...."
              tabindex="5"
              required
            ></textarea>
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              className={styles.contact_submit}
              data-submit="...Sending"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>

      <Footer />
    </div>
  )
}
