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
    const { brandsChecked, sportsmanChecked, pricesData } = req.body;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

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

process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  } finally {
    process.exit(0);
  }
});