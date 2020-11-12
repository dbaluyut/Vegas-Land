import { React } from "react"
import { Link, useLocation } from 'react-router-dom'

import styles from "./Navbar.module.css"

export function Navbar() {
  

  const location = useLocation()
    
    
  console.log(window.location.pathname)
  return (
    <div
      className={styles.navWrapper}
      style={{
        backgroundImage: `url(${"./assets/assets-05.png"})`,
        backgroundPosition: "-30rem 42rem",
      }}
    >
      <nav>
        <Link to="/">
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
            <span className={window.location.pathname == '/experiences' ? styles.activeNav : ""}>Experiences</span>
            {/* {location.pathname} */}
            </Link>
          </li>
          <li>
            <Link to="/happyhour">
            <span className={window.location.pathname == '/happyhour' ? styles.activeNav : ""}>Happy Hours</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
            <span className={window.location.pathname == '/about' ? styles.activeNav : ""} >Our Team</span>
            </Link>
          </li>
          <li>
            <Link to="/recommendations">
            <span className={window.location.pathname == '/recommendations' ? styles.activeNav : ""}>Recommendations</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
