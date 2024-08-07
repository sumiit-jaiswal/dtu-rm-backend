const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Route to fetch data from the external API
app.get('/api/jobdata', async (req, res) => {
    try {
        const apiUrl = 'https://rm.dtu.ac.in/api/company/jobPost?page=1';
        const token = process.env.API_TOKEN;
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/jobnotification', async (req, res) => {
    try {
        const apiUrl = 'https://rm.dtu.ac.in/api/student/notifications?page=1';
        const token = process.env.API_TOKEN;
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
