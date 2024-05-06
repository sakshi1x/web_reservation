const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');
const contactRoutes = require('./routes/contact');
const reservationsRoutes = require('./routes/reservationsRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
  
  // Use CORS middleware with options
app.use(cors(corsOptions));
app.use(bodyParser.json());


// Routes
app.use('/api/users', contactRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/book-appointment', appointmentsRoutes);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
