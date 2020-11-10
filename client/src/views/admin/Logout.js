import { useHistory } from "react-router-dom";
import { useAuth } from "../../features/authentication/auth";
import { useState } from "react";
// import api from "../../utils/request"
import styles from "./Logout.module.css";
export default function Logout() {
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const history = useHistory();
  const { login } = useAuth();
  function handle(e) {
    e.preventDefault();
    login(userInput, passwordInput).then((resp) => {
      history.push("/dashboard");
    });
  }
  return (
    <div>
      <p className={styles.logoutTitle}>You Have Been Logged Out</p>
      <div className={styles.container}>
        <div className={styles.card}>
          <div>
            <h2>Please Log-In Again</h2>
          </div>

          <form onSubmit={handle}>
            <div className={styles.input_border}>
              <input
                type="text"
                onChange={(e) => setUserInput(e.target.value)}
                className={styles.text}
                required
              />
              <label>username</label>
              <div className={styles.border}></div>
            </div>

            <div className={styles.input_border}>
              <input
                type="password"
                onChange={(e) => setPasswordInput(e.target.value)}
                className={styles.text}
                required
              />
              <label>password</label>
              <div className={styles.border}></div>
            </div>

            <button href="#" type="submit" className={styles.btn}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
