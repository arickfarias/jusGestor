require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with retry logic
const connectWithRetry = () => {
    const mongoURI = process.env.MONGO_URI;
    const options = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: false,
        tlsAllowInvalidHostnames: false,
        retryWrites: true,
        w: 'majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        minPoolSize: 5
    };

    mongoose.connect(mongoURI, options)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas.');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Error handling middleware
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    connectWithRetry();
});

// Use company routes with /api prefix
app.use('/api', companyRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});