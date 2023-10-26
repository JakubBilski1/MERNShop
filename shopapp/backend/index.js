const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

const uri = "mongodb+srv://root:TVcs49iXd3e9PVU5@atlascluster.jdiefog.mongodb.net/"
const collectionName = "Products"
const dbName = "Shopper"

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (req, res) => {
  await client.connect();
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const produkty = await collection.find({}).toArray();
    console.log(res.json(produkty))
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }finally{
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
