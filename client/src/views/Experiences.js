import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./Experiences.module.css"
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"
import { Card } from "../ui/Card"
import { selectExperiences, getExperiences } from "./experiencesSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Experiences() {
  const experiences = useSelector(selectExperiences)
  const dispatch = useDispatch()
  const params = useParams()
  const [activeItem, setActiveItem] = useState(null)
  console.log(activeItem)
  useEffect(() => {
    dispatch(getExperiences())
  }, [])

  useEffect(() => {
    if (experiences.length && params.id) {
      const found = experiences.find((experience) => experience.id == params.id)
      setActiveItem(found)
    }
  }, [experiences]);

  return (
    <div>
      <div className={styles.header}>
        <Navbar />
      </div>
      {activeItem ? (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <button onClick={() => setActiveItem(null)}>&times;</button>

            <h3 className={styles.modalLabel}>{activeItem.title}</h3>

            <p className={styles.modalDesc}>{activeItem.desc}</p>
            <p className={styles.address}>
              {activeItem.street_1} {activeItem.city}, {activeItem.state}
              {activeItem.zip}
            </p>
            <span className={styles.readMore}>Read more here:</span>
            <a className={styles.modalLink} href={activeItem.link}>
              {activeItem.link}
            </a>
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
//


{/* <div backgroundImage={activeItem.image} > */}