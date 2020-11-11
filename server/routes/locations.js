const express = require("express")
const router = express.Router()

const conn = require("../db")

router.get("/locations", async (req, res) => {
  const locations = await conn.raw(`SELECT * FROM locations;`)
  res.json(locations.rows)
})

router.post("/locations", async (req, res) => {
  const location = await conn("locations").insert({
    street_1: req.body.street_1,
    street_2: req.body.street_2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    lat: req.body.lat,
    lng: req.body.lng,
  })
  res.json({ message: "location added" })
})

router.post("/venues", async (req, res) => {
  const venue = await conn("venues").insert({
    title: req.body.title,
    desc: req.body.desc,
    // location_id: req.body.location_id,
    type: req.body.type,
    link: req.body.link,
  })
  res.json({ message: "venue added" })
})

module.exports = router
