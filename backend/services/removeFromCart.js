const dbConnect = require('./dbConnect');
const WebSocket = require('ws');

const removeFromCart = async (req, res) => {
    const db = await dbConnect();
    const collection = db.collection('Users');
    const query = { email: req.userData.email };
    const markedForDeletion = req.body.markedForDeletion;

    const result = await collection.updateOne(query, { $pull: { cart: { cartProductId: markedForDeletion } } });

    res.json(result);
}

module.exports = removeFromCart;
