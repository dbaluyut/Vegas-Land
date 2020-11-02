import React, { useEffect, useState } from "react"
import styles from "./Experiences.module.css"
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer";
import { selectExperiences, getExperiences } from "./experiencesSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Experiences() {
  const experiences = useSelector(selectExperiences)
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    dispatch(getExperiences())
  }, [])
  console.log(experiences)
  return (
    <div>
      <div className={styles.header}>
        <Navbar />
      </div>
      {activeItem ? (
        <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <button onClick={() => setActiveItem(null)}>x</button>
          <h3 className={styles.modalLabel}>{activeItem.title}</h3>
          <img src={activeItem.desc}></img>
        </div>
        </div>
      ) : null}

      <div className={styles.container}>
        {experiences.map((item) => (
          <div className={styles.card} onClick={() => setActiveItem(item)}>
            <div className={styles.content}>
              <div className={styles.center}>
                <h3>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}
