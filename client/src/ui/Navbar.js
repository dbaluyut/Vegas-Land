import { React } from "react"
import { Link } from 'react-router-dom'

import styles from "./Navbar.module.css"

export function Navbar() {
  return (
    <div
      className={styles.navWrapper}
      style={{
        backgroundImage: `url(${"./assets/assets-05.png"})`,
        backgroundPosition: "-30rem 42rem",
      }}
    >
      <nav>
        <Link to="/home">
        <div className={styles.logo}>
          <img className={styles.logoImage} src={"./assets/logo-062.svg"}></img>
        </div>
        </Link>
        <ul className={styles.nav_links}>
          <li>
            <span>Food {`&`} Drink</span>
              <ul>
                <li className={styles.barsDropdown}><Link to="/bars"><span>Bars</span></Link></li>
                <li className={styles.restaurantDropdown}><Link to="/restaurants"><span>Restaurants</span></Link></li>
              </ul>
          </li>
          <li>
            <Link to="/experiences">
            <span>Experiences</span>
            </Link>
          </li>
          <li>
            <Link to="/happyhour">
            <span>Happy Hours</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
            <span>Our Team</span>
            </Link>
          </li>
          <li>
            <Link to="/recommendations">
            <span>Recommendations</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
