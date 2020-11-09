import React, { useEffect, useState } from "react"
import styles from "./Experiences.module.css"
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"
import { Card } from "../ui/Card"
import { selectExperiences, getExperiences } from "./experiencesSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Experiences() {
  const experiences = useSelector(selectExperiences)
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    dispatch(getExperiences())
  }, [])

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
            <p>{activeItem.desc}</p>
          </div>
        </div>
      ) : null}

      <div className={styles.container}>
        {experiences.map((item) => (
          <Card
            backgroundImage={item.image}
            test={() => setActiveItem(item)}
            title={item.title}
          />

          // <div className={styles.card} onClick={() => setActiveItem(item)}>
          //   <div className={styles.content}>
          //     <div className={styles.center}>
          //       <h3>{item.title}</h3>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}
