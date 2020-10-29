import { useHistory } from "react-router-dom"
import { useAuth } from "../../features/authentication/auth"
import { useState } from "react"
// import api from "../../utils/request"

export default function Login() {
  const history = useHistory()
  const { login } = useAuth()
  function handle(e) {
    e.preventDefault()
    login(userInput, passwordInput).then((resp) => {
      history.push("/dashboard")
    })
  }

  const [userInput, setUserInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  return (
    <form onSubmit={handle}>
      <input type="text" onChange={(e) => setUserInput(e.target.value)} />
      <input
        type="password"
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  )
}
