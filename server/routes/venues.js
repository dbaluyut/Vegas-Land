const express = require("express")
const router = express.Router()

const conn = require("../db")

router.get("/venues", async (req, res) => {
  const venues = await conn.raw(`SELECT * FROM venues;`)
  res.json(venues.rows)
})

router.get("/venues/highlights", async (req, res) => {
  const venues = await conn.raw(`select * from venues
    where id in(1,21,14,2,7,3,11)`)
  res.json(venues.rows)
})

module.exports = router
