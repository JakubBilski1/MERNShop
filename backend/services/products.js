const dbConnect = require('./dbConnect')
const colName = "Products"

const products = async (req, res) => {
    try {
        const db = await dbConnect()
        const collection = db.collection(colName);
        const products = await collection.find({}).toArray();
        return res.json(products);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = products;