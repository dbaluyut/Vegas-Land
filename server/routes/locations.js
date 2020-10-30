const express = require('express')
const router =express.Router()

const conn = require('../db')

router.get('/locations', async (req, res) => {
    const locations = await conn.raw(`SELECT * FROM locations;`)
    res.json(locations.rows)
})

module.exports = router