const express = require("express")
const router = express.Router()

const conn = require("../db")

router.get("/happy_hr", async (req, res) => {
  const happy_hr = await conn.raw(`select happy_hr.day, happy_hr.id, happy_hr.happy_hr_start, happy_hr.happy_hr_stop, venues.title from happy_hr 
  inner join venues on happy_hr.venue_id=venues.id
  ;`)
  res.json(happy_hr.rows)
})

module.exports = router
