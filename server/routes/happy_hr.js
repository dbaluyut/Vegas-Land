const express = require('express')
const router =express.Router()

const conn = require('../db')

router.get('/happy_hr', async (req, res) => {
    const happy_hr = await conn.raw(`SELECT * FROM happy_hr;`)
    res.json(happy_hr.rows)
})

module.exports = router