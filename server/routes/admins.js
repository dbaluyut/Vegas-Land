const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/admins", async (req, res) => {
  const admins = await conn.raw(`SELECT * FROM admins;`)
  res.json(admins.rows)
})
module.exports = router
