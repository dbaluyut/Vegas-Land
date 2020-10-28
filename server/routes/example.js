const express = require('express')
const router =express.Router()
router.get('/users', async (req, res) => {
    const users = await req.
    res.json({users})
})
module.exports = router