import React from 'react'
import styles from "./Card.module.css"
import { useState } from 'react'







export function Card(props) {
  const [activeItem, setActiveItem] = useState(null)

  return (
    <div onClick={props.test} 
         className={styles.card}
         style={{
          backgroundImage:
            `url(${props.backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
            <div className={styles.content}>
              <div className={styles.center}>
                <h3>{props.title}</h3>
              </div>
            </div>
          </div>
  )
}