const router = require('express').Router()

router.post('/update-votes', require('./update-votes'))

module.exports = router
