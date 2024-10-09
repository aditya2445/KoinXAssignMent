const Crypto = require('../models/crypto.model');

// API for getting the latest stats
exports.getStats = async (req, res) => {
  try {
    const coin = req.query.coin;
    const latestData = await Crypto.findOne({ coinId: coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ message: 'Coin data not found' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.cap,
      '24hChange': latestData.change,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// API for calculating the standard deviation
exports.getDeviation = async (req, res) => {
  try {
    const coin = req.query.coin;
    const records = await Crypto.find({ coinId: coin }).sort({ timestamp: -1 }).limit(100);

    if (records.length < 2) {
      return res.status(400).json({ message: 'Not enough data for deviation calculation' });
    }

    const prices = records.map(record => record.price);
    const mean = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;
    const variance = prices.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);
    //since sigma = sqrt(variance) and variance is equal to summation of (x-mean)^2 / number of elements

    res.json({ deviation: standardDeviation });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
