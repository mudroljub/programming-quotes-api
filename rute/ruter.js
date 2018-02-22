'use strict';

const express = require('express');
const router = express.Router();

const filmRuter = require('./filmovi/filmRuter');
const citatRuter = require('./citati/citatRuter');

// endpoints
router.use('/filmovi', filmRuter);

router.use('/citati', citatRuter);

module.exports = router;
