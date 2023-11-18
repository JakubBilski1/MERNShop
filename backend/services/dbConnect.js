const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DATABASE_URI;
const dbName = "ShopperDB"
let _db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function dbConnect() {
  if (_db) {
    return _db;
  }

  try {
    await client.connect();
    _db = client.db(dbName)
    return _db;
  } catch (error) {
    console.error('Błąd podczas łączenia z bazą danych:', error);
    throw error;
  }
}

module.exports = dbConnect;