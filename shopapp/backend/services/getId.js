const dbConnect = require('./dbConnect')

const getRandProductId = async (req, res) => {
    try {
      const db = await dbConnect()
      const collection = db.collection("Products");
      const productId = parseInt(req.params.id);
      const query = { id: productId };
      const product = await collection.findOne(query);
      return res.json(product);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  }

module.exports = getRandProductId;