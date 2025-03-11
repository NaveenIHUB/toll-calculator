import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';  // Import dotenv to read .env files

dotenv.config();  // Initialize dotenv to load variables from .env file




const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    // origin: 'http://localhost:3000',
    origin: '*',  // Allow requests from all domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);


app.get('/', (req, res) => {
  res.send('Welcome to the TollGuru API server!');
});



app.post('/api', async (req, res) => {
  const { from, to } = req.body; // Receive data from frontend

  const options = {
    method: 'POST',
    url: 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.TOLL_GURU_API_KEY,  // Use the API key from the .env file
    },
    data: {
      from,
      to,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log('API Response:', JSON.stringify(data, null, 2));

    // Extract max and min toll costs
    const routesData = data.routes.map(route => {
      const { costs, summary } = route || {};  //Extract cost
      const mapUrl = summary?.url || '';         //Extract map URL
    
      return {
        maxTollCost: costs?.maximumTollCost || 'N/A',
        minTollCost: costs?.minimumTollCost || 'N/A',
        distance: summary?.distance?.metric || 'N/A',  // Include distance
        estimatedTime: summary?.duration?.text || 'N/A', 
        mapUrl,                  // Response sending
      };
    });

    res.json({ routes: routesData }); // Send both max and min toll costs
  }  catch (error) {
    console.error('Error occurred:', error);
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      res.status(500).json({ error: 'API request failed', details: error.response.data });
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ error: 'No response from API' });
    } else {
      console.error('Error message:', error.message);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
});

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});