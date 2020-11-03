import React from "react"

import { Navbar } from "../ui/Navbar"
import HappyHrList from "../features/happyhour/HappyHrList"

export default function HappyHour() {
  return (
    <div>
      <Navbar />
      <h1>Happy Hour</h1>
      <HappyHrList></HappyHrList>
    </div>
  )
}
