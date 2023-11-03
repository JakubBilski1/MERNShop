const { MongoClient, ServerApiVersion } = require('mongodb');
const EventEmitter = require('events');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const uri = "mongodb+srv://root:TVcs49iXd3e9PVU5@atlascluster.jdiefog.mongodb.net/"
const collectionName = "Products"
const dbName = "ShopperDB"
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect()

app.use(cors());
app.use(bodyParser.json());

const queryEmitter = new EventEmitter();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/products', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const products = await collection.find({}).toArray();
    return res.json(products);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/products/query', async (req, res) => {
  try {
    const receivedBrands = req.body.brandsChecked;
    const receivedSportsman = req.body.sportsmanChecked;
    const receivedPrices = req.body.pricesData;
    const errorMsg = { error: 'No products found' };
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    let query = {};

    if (receivedPrices.length === 0) {
      query = {
        $or: [
          { brand: { $in: receivedBrands } },
          { sportsman: { $in: receivedSportsman } },
        ]
      };
    } else if(receivedBrands.length === 0 && receivedSportsman.length === 0 && receivedPrices.length != 0){
      query = {
        price: {
          $gte: receivedPrices[0],
          $lte: receivedPrices[1]
        }
      };
    }else if (receivedPrices.length !== 0) {
      query = {
        $and: [
          {
            $or: [
              { brand: { $in: receivedBrands } },
              { sportsman: { $in: receivedSportsman } }
            ]
          },
          { price: { $gte: receivedPrices[0], $lte: receivedPrices[1] } }
        ]
      };
    }else if(receivedBrands.length === 0 && receivedSportsman.length != 0 && receivedPrices.length != 0){
      query = {
        $and: [
          { sportsman: { $in: receivedSportsman } },
          { price: { $gte: receivedPrices[0], $lte: receivedPrices[1] } }
        ]
      };
    }else if(receivedBrands.length != 0 && receivedSportsman.length === 0 && receivedPrices.length != 0){
      query = {
        $and: [
          { brand: { $in: receivedBrands } },
          { price: { $gte: receivedPrices[0], $lte: receivedPrices[1] } }
        ]
      };
    }
    queryEmitter.emit('queryChanged', query);
    const products = await collection.find(query).toArray();
    return res.json(products);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

const router = express.Router();

router.post('/id/:id', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const productId = parseInt(req.params.id);
    const query = { id: productId };
    const product = await collection.findOne(query);
    return res.json(product);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/p/:shortName', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const shortName = req.params.shortName;
    const query = { shortName: shortName };
    const product = await collection.findOne(query);
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/products', router);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

client.close();