import React, { useState, useEffect } from "react"
import { useForm } from "./hooks/form"

export default (props) => {
  const [exampleForm, setExampleForm, resetForm, updateForm] = useForm({
    first: "",
    last: "",
  })
  const [formVisible, setFormVisible] = useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    props.sendForm(exampleForm)
    resetForm()
  }
  useEffect(() => {
    updateForm({ first: "a", last: "s" })
  }, [])
  return (
    <div>
      <button
        style={{ marginTop: "20px" }}
        onClick={() => setFormVisible(!formVisible)}
      >
        toggle visible
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first"
            value={exampleForm.first}
            onChange={setExampleForm}
          />
          <br />
          <input
            type="text"
            name="last"
            value={exampleForm.last}
            onChange={setExampleForm}
          />
          <br />
          <button type="submit">submit</button>
        </form>
      )}
    </div>
  )
}
