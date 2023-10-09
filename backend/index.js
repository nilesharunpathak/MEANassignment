const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const PORT = 5000;

app.get('', (req, res)=>{
    res.send('Hello Noida');
});

mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schema for storing exchange data in the database
const exchangeSchema = new mongoose.Schema({
    exchange_id: String,
    name: String,
    // volume_1hrs_usd: Number,
    volume_1day_usd: Number
    // volume_1mth_usd: Number,
  // Add other necessary fields if needed!
});

const exchangeIconSchema = new mongoose.Schema({
    exchange_id: String,
    url: String
  });

const Exchange = mongoose.model('ExchangesList', exchangeSchema);
const ExchangeIcon = mongoose.model('ExchangeIcon', exchangeIconSchema);

app.use(cors());

// Exchnage data
app.get('/insert-exchanges', async (req, res) => {
  try {
    const response = await axios.get(
      'https://rest.coinapi.io/v1/exchanges/apikey-FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9'
    );

    // Store the fetched data in the database
    const exchanges = response.data;
    await Exchange.insertMany(exchanges);

    res.json({ message: 'Exchange data fetched and stored successfully in db' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching and storing data' });
  }
});

// exchange icon
app.get('/insert-exchange-icon', async (req, res) => {
    try {
      const response = await axios.get(
        'https://rest.coinapi.io/v1/exchanges/icons/32/apikey-FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9'
      );

      const exchangeIcon = response.data;
    //   console.log("exchangeIcon", exchangeIcon);
      await ExchangeIcon.insertMany(exchangeIcon);
  
      res.json({ message: 'Exchange icon fetched and stored successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching and storing data' });
    }
  });

app.get('/exchange-list', async (req, res) => {
    try {
      // Fetch exchange data from database
      const exchanges = await Exchange.find({}, 'exchange_id name volume_1day_usd'); 
  
      res.json(exchanges);
    //   console.log(exchanges);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching exchange data' });
    }
  });

  app.get('/exchange-icon-list', async (req, res) => {
    try {
      const exchanges = await ExchangeIcon.find({}, 'exchange_id url'); 
      res.json(exchanges);
    //   console.log(exchanges)

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching exchange data' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running this port ${PORT}`);
  });