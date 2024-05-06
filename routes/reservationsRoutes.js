const express = require('express');
const router = express.Router();
const { createReservation } = require('../controller/reservationsController');


router.post('/', createReservation);

module.exports = router;
