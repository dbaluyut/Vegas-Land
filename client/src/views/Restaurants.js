import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";
import styles from "./Restaurants.module.css";
import { selectRestaurants, getRestaurants } from "./restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Restaurants() {
  const restaurants = useSelector(selectRestaurants);
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  function NameMe(acc, current) {
    acc[current.id] = React.createRef();
    return acc;
  }
  const refs = restaurants.reduce(NameMe, {});

  function scrollTo(id) {
    console.log(refs[id].current);
    refs[id].current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  useEffect(() => {
    if (restaurants.length && params.id) {
      scrollTo(params.id)
    }
  }, [restaurants]);
  console.log(restaurants);
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
          {restaurants.map((item) => (
            <li
              className={styles.sidebarItem}
              onClick={() => scrollTo(item.id)}
            >
              <div className={styles.sidebarItemTitle}>{item.title}</div>
            </li>
          ))}
        </ul>
        <main className={styles.wrapper}>
          {restaurants.map((item) => (
            <div id={item.id} ref={refs[item.id]}>
              <section
                className={`${styles.section} ${styles.parallax} ${styles.bg1}`}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundPosition: "center",
                }}
              >
                <h1 className={styles.imageTitle}>{item.title}</h1>
              </section>
              <section className={`${styles.section2} ${styles.static}`}>
                <div className={styles.descContainer}>
                  <h2>{item.title}</h2>
                  <p>
                    {item.street_1}, {item.city}, {item.state} {item.zip}
                  </p>
                  <a href={item.link}>{item.link}</a>
                  <p className={styles.itemDesc}>{item.desc}</p>
                  {/* </div> */}
                  <div className={styles.labelsContainer}>
                    {/* <h3>Services:</h3> */}
                    {item.labels.map((label) => (
                      <div className={styles.labels}>
                        <i className={label.icon}></i>
                        <p>-{label.desc}</p>
                        
                        {console.log(label)}
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className={styles.addressLinkContainer}>
                  <div className={styles.address}></div>
                  <div className={styles.link}></div>
                </div> */}
              </section>
            </div>
          ))}
        </main>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
