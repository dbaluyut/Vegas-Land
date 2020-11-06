import React, { useEffect } from "react"
import { Navbar } from "../ui/Navbar"
import { Footer } from "../ui/Footer"
import styles from "./Restaurants.module.css"
import { selectBars, getBars, getBarImages } from "./barsSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Bars() {
  const bars = useSelector(selectBars)
  const dispatch = useDispatch()

  function NameMe(acc, current) {
    acc[current.id] = React.createRef()
    return acc
  }
  const refs = bars.reduce(NameMe, {})

  function scrollTo(id) {
    console.log(refs[id].current)
    refs[id].current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    dispatch(getBars())
    dispatch(getBarImages())
  }, [])
  console.log(bars)
  return (
    <div className={styles.fullContainer}>
      <div className={styles.header}>
        <Navbar />
      </div>
      <div className={styles.contentContainer}>
        <ul
          style={{
            backgroundImage: `url(${"./assets/assets-04.png"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className={styles.sidebar}
        >
          {bars.map((item) => (
            <li className={styles.sidebarItem} onClick={() => scrollTo(item.id)}>
             <div className={styles.sidebarItemTitle}>{item.title}</div>
            </li>
          ))}
        </ul>
        <main className={styles.wrapper}>
          {bars.map((item) => (
            <div id={item.id} ref={refs[item.id]}>
              {console.log(item.id)}
              <section
                className={`${styles.section} ${styles.parallax} ${styles.bg1}`}
                style={{
                  backgroundImage: `url(${item.image})`,

                }}
              >
                <h1>{item.title}</h1>
              </section>
              <section className={`${styles.section2} ${styles.static}`}>
                <p>{item.desc}</p>
                {item.labels.map((label) => (
                  <p>{label.desc}</p>
                ))}
              </section>
            </div>
          ))}
        </main>
        {/* <div className={styles.footer}>
          <Footer />
        </div> */}
      </div>
    </div>
  )
}

