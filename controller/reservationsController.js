const Reservation = require('../modules/Reservation');
const Contact = require('../modules/contact');

const createReservation = async (req, res) => {
    const { email, eventDate, numberOfGuests } = req.body;

    try {
        // Find the contact by email
        const contact = await Contact.findOne({ email });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found for email provided.' });
        }

        // Create a new reservation with the found contact ID
        const newReservation = new Reservation({
            email: contact.email,
            eventDate,
            numberOfGuests
        });

        // Save the reservation to the database
        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);
    } catch (err) {
        console.error('Error creating reservation:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { createReservation };
