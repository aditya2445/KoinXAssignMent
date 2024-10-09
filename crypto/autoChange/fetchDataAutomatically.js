const axios = require('axios');
const Crypto = require('../models/crypto.model');
const cron = require('node-cron');

const fetchCryptoData = async() => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    const response = await axios.get(url);
    const data = response.data;

    // Store each coin data in the database
    coins.forEach(async (coinId) => {
      const cryptoData = new Crypto({
        coinId,
        price: data[coinId].usd,
        cap: data[coinId].usd_market_cap,
        change: data[coinId].usd_24h_change,
      });
      await cryptoData.save();
    });

    console.log('Crypto data saved successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

// Run the job every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);
module.exports = fetchCryptoData;
