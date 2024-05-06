const express = require('express');
const router = express.Router();
const { bookAppointment } = require('../controller/appointmentsController');

// POST /api/book-appointment
router.post('/', bookAppointment);

module.exports = router;
