const express = require('express');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/crypto.routes');
const fetchCryptoData = require('./autoChange/fetchDataAutomatically');

require('dotenv').config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', cryptoRoutes);

// Start the background job
fetchCryptoData();  // Immediately fetch the data on server start

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
