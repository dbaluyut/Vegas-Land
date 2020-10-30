import React from "react"
import Highlights from "../features/highlights/Highlights"

import { Navbar } from "../ui/Navbar"

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Homepage</h1>
      <Highlights></Highlights>
    </div>
  )
}
