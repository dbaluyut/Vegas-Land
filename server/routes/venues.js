const express = require("express")
const router = express.Router()

const conn = require("../db")

router.get("/venues", async (req, res) => {
  const venues = await conn.raw(`SELECT * FROM venues;`)
  res.json(venues.rows)
})

router.get("/venues/highlights", async (req, res) => {
  const venues = await conn.raw(`select galleries.image, venues.title from venues
  inner join galleries on galleries.venue_id=venues.id
  where venues.id in(1,21,14,2,7,3,42)
 `)
  res.json(venues.rows)
})

router.get("/venues/experiences", async (req, res) => {
  const venues = await conn.raw(`select galleries.image, venues.title from venues
  inner join galleries on galleries.venue_id=venues.id
    where type='experience'`)
  res.json(venues.rows)
})

router.get("/venues/restaurants", async (req, res) => {
  const venues = await conn.raw(`select galleries.image, venues.title, venues.id from venues
  inner join galleries on galleries.venue_id=venues.id
    where type='restaurant'`)
  res.json(venues.rows)
})

router.get("/venues/bars", async (req, res) => {
  const venues = await conn.raw(`select galleries.image, venues.title, venues.id from venues
  inner join galleries on galleries.venue_id=venues.id
    where type='bar'`)
  res.json(venues.rows)
})



// router.get("/happy_hr", async (req, res) => {
//   const happy_hr = await conn.raw(`select galleries.image, happy_hr.day, happy_hr.id, happy_hr.happy_hr_start, happy_hr.happy_hr_stop, venues.title from happy_hr 
//   inner join venues on happy_hr.venue_id=venues.id
//   inner join galleries on happy_hr.venue_id=galleries.venue_id
//   ;`)
//   res.json(happy_hr.rows)
// })

router.get("/venues/restaurants", async (req, res) => {
  const venues = await conn.raw(`select * from venues
    where type='restaurant'`)
  res.json(venues.rows)
})

module.exports = router
