const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    reservationEmails: [{ type: String, ref: 'Reservation' }],
    appointmentEmails: [{ type: String, ref: 'Appointment' }]
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
