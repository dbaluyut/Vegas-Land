import { useHistory } from "react-router-dom"
import { useAuth } from "../authentication/auth"
// import api from "../../utils/request"

export default function Login() {
  const history = useHistory()
  const { login } = useAuth()
  function handle(e) {
    e.preventDefault()
    login("authTest", "password").then((resp) => {
      history.push("/dashboard")
    })
  }
  return (
    <form onSubmit={handle}>
      <input type="text" value="authTest" />
      <input type="password" value="password" />
      <button type="submit">submit</button>
    </form>
  )
}
