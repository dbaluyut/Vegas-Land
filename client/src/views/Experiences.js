import React, { useEffect } from "react"
import styles from "./Experiences.module.css"
import { Navbar } from "../ui/Navbar"
import { selectExperiences, getExperiences } from "./experiencesSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Experiences() {
  const experiences = useSelector(selectExperiences)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExperiences())
  }, [])
  console.log(experiences)
  return (
    <div>
      <div className={styles.header}>
        <Navbar />
      </div>

      <div className={styles.container}>
        {experiences.map((item) => (
          <div className={styles.card}>
            <div className={styles.content}>
              <div className={styles.center}>
                <h3>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
