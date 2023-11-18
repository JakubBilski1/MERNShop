const dbConnect = require('./dbConnect');
const addToGuestCart = async (cartData) => {
    const db = await dbConnect();
    const cart = db.collection('CartForGuests');
    const result = await cart.insertOne(cartData);
    return result;
}

module.exports = addToGuestCart;