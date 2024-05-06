const Contact = require('../modules/contact');

// Function to add a new contact
const addContact = async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        // Check if a contact with the same email already exists
        const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(400).json({ error: 'Contact with this email already exists.' });
        }

        // Create a new contact
        const contact = new Contact({ name, phone, email });
        await contact.save();
        res.status(201).json({ message: 'Contact added successfully.', contact });
    } catch (err) {
        console.error('Error adding contact:', err.message);
        res.status(500).json({ error: 'Server error.' });
    }
};

// Function to fetch a contact by email
const getContactByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const contact = await Contact.findOne({ email });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        res.status(200).json({ contact });
    } catch (err) {
        console.error('Error fetching contact:', err.message);
        res.status(500).json({ error: 'Server error.' });
    }
};

// Export the controller functions
module.exports = { addContact, getContactByEmail };
