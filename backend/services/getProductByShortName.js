const dbConnect = require('../services/dbConnect')

const getProduct = async (req, res) => {
    try {
      const db = await dbConnect();
      const collection = db.collection("Products");
      const shortName = req.params.shortName;
      const query = { shortName: shortName };
      const product = await collection.findOne(query);
      const response = {
        ...product,
      }
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(response);
      }
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  }

module.exports = getProduct;