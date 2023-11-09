const { MongoClient, ServerApiVersion } = require('mongodb');

// Adres URL bazy danych MongoDB i opcje połączenia
const uri = 'mongodb+srv://root:TVcs49iXd3e9PVU5@atlascluster.jdiefog.mongodb.net/'; // Zmień na odpowiedni adres URL
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