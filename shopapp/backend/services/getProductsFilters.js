const EventEmitter = require('events');
const dbConnect = require('./dbConnect');

const queryEmitter = new EventEmitter();

const getProductsFilters = async (req, res) => {
    const db = await dbConnect()
    const collection = await db.collection("Products")
    try {
      const { brandsChecked, sportsmanChecked, pricesData } = req.body;
  
      const queryConditions = [];
  
      if (brandsChecked.length > 0) {
        queryConditions.push({ brand: { $in: brandsChecked } });
      }
  
      if (sportsmanChecked.length > 0) {
        queryConditions.push({ sportsman: { $in: sportsmanChecked } });
      }
  
      if (pricesData.length > 0) {
        queryConditions.push({
          price: {
            $gte: pricesData[0],
            $lte: pricesData[1],
          },
        });
      }
  
      const query =
        queryConditions.length > 0
          ? { $and: queryConditions }
          : {};
  
      queryEmitter.emit('queryChanged', query);
      const products = await collection.find(query).toArray();
      return res.json(products);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).send('Internal Server Error');
}}

module.exports = getProductsFilters;