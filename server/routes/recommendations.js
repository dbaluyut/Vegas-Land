const express = require('express')
const router =express.Router()

const conn = require('../db')

router.get('/recommendations', async (req, res) => {
    const recommendations = await conn.raw(`SELECT * FROM recommendations;`)
    res.json(recommendations.rows)
})

module.exports = router


