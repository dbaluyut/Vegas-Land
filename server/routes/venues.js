const express = require('express')
const router =express.Router()

const conn = require('../db')

router.get('/venues', async (req, res) => {
    const venues = await conn.raw(`SELECT * FROM venues;`)
    res.json(venues.rows)
})

module.exports = router