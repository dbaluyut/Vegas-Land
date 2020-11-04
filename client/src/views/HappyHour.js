import React from "react"

import { Navbar } from "../ui/Navbar"
import HappyHrList from "../features/happyhour/HappyHrList"

export default function HappyHour() {
  return (
    <div>
      <Navbar />

      <HappyHrList></HappyHrList>
    </div>
  )
}
