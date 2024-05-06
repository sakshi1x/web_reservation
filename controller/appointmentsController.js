const Contact = require('../modules/contact');
const Appointment = require('../modules/Appointment');

const bookAppointment = async (req, res) => {
    const { email, date, time } = req.body;

    try {
        if (!date || !time) {
            return res.status(400).json({ error: 'Date and time fields are required.' });
        }

        const isValidDate = new Date(date) > new Date();
        if (!isValidDate) {
            return res.status(400).json({ error: 'Date must be a future date.' });
        }

        if (time === '15:00') {
            return res.status(400).json({ error: 'Requested time slot is unavailable.' });
        }

        // Find the contact by email
        const contact = await Contact.findOne({ email });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.' });
        }

        // Create new appointment with reservationEmail set to contact's email
        const newAppointment = new Appointment({ date, time, reservationEmail: contact.email });
        await newAppointment.save();

        // Ensure contact has appointments array and push the new appointment
        if (!contact.appointments) {
            contact.appointments = [];
        }
        contact.appointments.push(newAppointment);
        await contact.save();

        res.status(201).json({ message: 'Appointment booked successfully.', appointment: newAppointment });
    } catch (err) {
        console.error('Error booking appointment:', err.message);
        res.status(500).json({ error: 'Server error.' });
    }
};

module.exports = { bookAppointment };
