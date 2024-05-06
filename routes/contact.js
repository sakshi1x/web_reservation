const express = require('express');
const router = express.Router();

const { addContact, getContactByEmail } = require('../controller/contactController');

// POST /api/users - Add a new contact
router.post('/', addContact);

// GET /api/users/:contactId - Fetch a contact by ID
router.get('/:email', getContactByEmail);

module.exports = router;
